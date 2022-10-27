/** @format */

import { AsyncStorage } from 'react-native'
import { Constants, Config } from '@common'
import firebaseApp from '@services/Firebase'
import * as firebase from 'firebase'
import { remove, findIndex } from 'lodash'
import Api from './Api'

function UserModal() {
  if (!(this instanceof UserModal)) {
    return new UserModal()
  }
}

/**
 * Check the user login data is existing on the app
 * @returns {boolean}
 */
UserModal.prototype.isLogedIn = async function () {
  try {
    const value = await AsyncStorage.getItem(Constants.Key.user)

    return value
  } catch (error) {

  }
}

/**
 * create account with firebase
 * @param email
 * @param password
 * @param callBackFunc
 * @param onError
 */
UserModal.prototype.createWithFirebase = async function (
  email,
  password,
  callBackFunc,
  onError
) {
  try {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        if (typeof callBackFunc === 'function') {
          callBackFunc()
        }
        return this.saveUser(userData, email)
      })
      .catch((error) => {
        if (typeof onError === 'function') {
          onError(error)
        }
      })
  } catch (error) {

  }
}

/**
 * Create the user login
 * @param email
 * @param password
 * @param callBackFunc
 * @param onError
 * @param isExisted
 */
// #1
UserModal.prototype.create = async function (
  email,
  password,
  name,
  callBackFunc,
  onError,
  isExisted
) {
  try {
    // existed on wordpress create with firebase
    if (isExisted) {
      this.createWithFirebase(email, password, callBackFunc, onError)
    }
    // register on Wordpress site
    const wordpressRegisterd = await Api.register(email, password, name)
    if (
      typeof wordpressRegisterd.status !== 'undefined' &&
      wordpressRegisterd.status === 'ok'
    ) {
      if (Constants.firebaseEnable) {
        this.createWithFirebase(email, password, callBackFunc, onError)
      } else {
        this.saveUser(null, email)
        if (typeof callBackFunc === 'function') {
          callBackFunc()
        }
      }
    } else {
      callBackFunc()
    }
  } catch (error) {
    console.log(error)
  }
}
/**
 * login on both Wordpress and Firebase
 * @param email
 * @param password
 * @param callBackFunc
 */
// #2
UserModal.prototype.login = async function (
  email,
  password,
  callBackFunc,
  onError
) {
  try {
    const wordpressLoggined = await Api.getJWTToken(email, password)
    if (wordpressLoggined.data.token) {
		
      const userInfo = await Api.getUserInfoByToken(wordpressLoggined.data.token)
      var user = {
        userId: userInfo.id,
        roles: userInfo.roles,
        jwtToken: wordpressLoggined.data.token,
        displayName: wordpressLoggined.data.displayName,
        email: wordpressLoggined.data.email,
        photoURL: ""
      }
      
      //~ alert(JSON.stringify(userInfo));
      
      var self = this

      // if enable user also save to Firebase
      if (Constants.firebaseEnable) {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            user.uid = response.user.uid
            self.saveUser(user, email, () => {
              if (typeof callBackFunc === 'function') {
                callBackFunc()
              }
            })
          })
          .catch((error) => {
            // if use not found on firebase, just create it for saving app data
            if (error.code === 'auth/user-not-found' || error.code == 'auth/wrong-password') {
              return this.create(
                email,
                password,
                null,
                callBackFunc,
                onError,
                true
              )
            }
            if (typeof onError === 'function') {
              onError(error)
            }
          })

          
      } else if (typeof callBackFunc === 'function') {
        this.saveUser(user, email, () => {
          if (typeof callBackFunc === 'function') {
            callBackFunc()
          }
        })
      }
    } else if (typeof onError === 'function') {
      onError({ message: "Invalid email or password." })
    }
  } catch (error) {
    console.log(error)
  }
}

UserModal.prototype.loginFacebook = async function (accessToken) {
  try {
    const auth = firebaseApp.auth()
    const credential = firebase.auth.FacebookAuthProvider.credential(
      accessToken
    )

    const data = await auth.signInAndRetrieveDataWithCredential(credential)

    let userEmail = data.email
    if (userEmail == null) {
      userEmail = `${data.uid}@facebook.com`
    }

    return this.saveUser(data, userEmail)
  } catch (error) {
    console.log(error)
  }
}

UserModal.prototype.loginGoogle = async function (input) {
  const auth = firebaseApp.auth()
  const credential = firebase.auth.GoogleAuthProvider.credential(input.idToken)
  const data = await auth
    .signInAndRetrieveDataWithCredential(credential)
    .catch((err) => console.log(err))
  return this.saveUser(data, input.user.email)
}

/**
 * Save user data to offline
 * @param userData
 * @param email
 */
UserModal.prototype.saveUser = async function (userData = {}, email, callback) {
  try {
    await AsyncStorage.removeItem(Constants.Key.user)
    await AsyncStorage.setItem(Constants.Key.user, JSON.stringify(userData))
    await AsyncStorage.setItem(Constants.Key.email, email)
    callback()
  } catch (error) {
    console.log(error);

  }
}

/**
 * get read later user
 */
UserModal.prototype.getUser = async function () {
  try {
    const userData = await AsyncStorage.getItem(Constants.Key.user)
    if (userData != null) {
      return JSON.parse(userData)
    }
  } catch (error) { }
}

UserModal.prototype.getPosts = async function () {
  const userPosts = await AsyncStorage.getItem(Constants.Key.posts)

  let postData = []
  if (userPosts != null) {
    postData = JSON.parse(userPosts)
  }

  // if the offline data is null let check the online and sync back to the app
  if (postData.length == 0) {
    postData = await this.getFirebasePost()
    AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(postData))
  }

  return postData
}

/**
 * Get the data from firebase
 * @returns {*|string|string}
 */
UserModal.prototype.getFirebasePost = async function () {
  const userData = await this.getUser()
  let postData = []

  if (typeof userData !== 'undefined' && typeof userData.uid !== 'undefined') {
    const data = await firebaseApp
      .database()
      .ref(`/${Config.Firebase.readlaterTable}/${userData.uid}`)
      .once('value')

    if (data.val() != null) {
      postData = data.val().post
    }
  } else {

  }

  return postData
}

/**
 * Add the post to firebase
 * @param post
 */
UserModal.prototype.firebaseSync = async function (postData) {
  const userData = await this.getUser()

  if (typeof userData !== 'undefined' && typeof userData.uid !== 'undefined') {
    firebaseApp
      .database()
      .ref(Config.Firebase.readlaterTable)
      .child(`${userData.uid}/post`)
      .set(postData)
  }
}

/**
 * Save read later post and sync to firebase
 * @param post
 */
UserModal.prototype.savePost = async function (post, fnc) {
  if (typeof post === 'undefined' || post == null) {
    return
  }

  const userPosts = await AsyncStorage.getItem(Constants.Key.posts)
  let postData = []
  if (userPosts != null) {
    postData = JSON.parse(userPosts)
  }

  const indexPost = findIndex(postData, (data) => {
    return data.id == post.id
  })

  // not in the read later array yet
  if (indexPost == -1) {
    postData.push(post)

    // save to storage local
    await AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(postData))

    if (typeof fnc === 'function') {
      fnc()
    }

    // sync to firebase
    this.firebaseSync(postData)
  }
}

/**
 * remove read later post
 * @param post
 */
UserModal.prototype.removePost = async function (post) {
  const userPosts = await AsyncStorage.getItem(Constants.Key.posts)
  let postData = []
  if (userPosts != null) {
    postData = JSON.parse(userPosts)
  }
  const newPostData = remove(postData, (data) => {
    return data.id != post.id
  })

  AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(newPostData))

  // sync to firebase
  this.firebaseSync(newPostData)
}

/**
 * Remove all read later post
 */
UserModal.prototype.clearPosts = function (isSync) {
  // should remove online also
  if (typeof isSync !== 'undefined') {
    this.firebaseSync(null)
  }
  AsyncStorage.getItem(Constants.Key.posts).then((data) => {
    if (data != null) {
      return AsyncStorage.multiRemove([Constants.Key.posts], (err) => { })
    }
  })
}

/**
 * Logout and delete all offline data
 */
UserModal.prototype.logOut = function () {
  AsyncStorage.getItem(Constants.Key.user).then((data) => {
    if (data != null) {
      return AsyncStorage.multiRemove([Constants.Key.user], (err) => { })
    }
  })
}

export default UserModal
