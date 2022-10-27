/** @format */

import * as firebase from 'firebase'
import Config from '@common/Config'

const firebaseApp = firebase.initializeApp(Config.Firebase)
firebaseApp.getCurrentUser = function() {
  return firebaseApp.auth().currentUser
}

export default firebaseApp
