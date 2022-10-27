/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Linking, Share, Clipboard, Alert} from 'react-native'
import { Images, Languages, Tools, Events } from '@common'
import styles from './style'
import Item from './Item'
import { WebBrowser } from '@expo'
import {connect} from "react-redux";
import User from '@services/User'
import { fetchPostsBookmark } from '@redux/actions'

class ActionsModal extends PureComponent {
  // state = {
  //   isVisible: false
  // }

  hide = ()=>{
    //this.setState({isVisible: false})
    this.props.onClose()
  }

  // show = ()=>{
  //   this.setState({isVisible: true})
  // }

  render() {
    let {isVisible, onClose} = this.props

    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onRequestClose={this.hide}>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.backgroundColor}>
                <View style={styles.content}>
                  <View style={styles.wrapper}>
                    <Item icon={Images.OpenIcon} text={Languages.openInSafari} onPress={this.openInSafari}/>
                    <Item icon={Images.ShareIcon} text={Languages.sharing} onPress={this.share}/>
                    <Item icon={Images.FavoriteIcon} text={Languages.saveToWishlist} onPress={this.saveToWishlist}/>
                    <Item icon={Images.CopyIcon} text={Languages.copyLink} onPress={this.copyLink}/>
                    <Item icon={Images.AddCommentIcon} text={Languages.addComment} onPress={this.addComment}/>
                  </View>
                  <TouchableOpacity style={styles.btnCancel} activeOpacity={0.85} onPress={this.hide}>
                    <Text style={styles.text}>{Languages.cancel}</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    )
  }

  openInSafari = ()=>{
    this.hide()
    const url = this.props.post.link ? this.props.post.link : ''

    if (typeof WebBrowser !== 'undefined') {
      WebBrowser.openBrowserAsync(url)
    } else {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {

          } else {
            return Linking.openURL(url)
          }
        })
        .catch((err) => console.error('An error occurred', err))
    }
  }

  share = ()=>{
    const post = this.props.post ? this.props.post : ''
    const url = post.link
    const title =
      typeof post.title.rendered !== 'undefined'
        ? Tools.formatText(post.title.rendered, 300)
        : ''

    Share.share(
      {
        message: title,
        url,
        title,
      },
      {
        dialogTitle: `${title} ${url}`,
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
        tintColor: 'blue',
      }
    ).catch((error) => this.setState({ result: `error: ${error.message}` }))
  }

  saveToWishlist = ()=>{
    const postid = this.props.post && this.props.post.id;
    const {posts} = this.props;
    let clicked = (posts.filter(item => postid == item.id)) != ""
    if (!clicked) {
      User.savePost(this.props.post, this.props.fetchPostsBookmark);
    }

    var self = this
    setTimeout(()=>{
      self.props.onClose()
    },500)
  }

  copyLink = ()=>{
    const url = this.props.post.link ? this.props.post.link : ''
    Clipboard.setString(url)
    this.props.onClose()
  }

  addComment = ()=>{
    if (this.props.data == null || this.props.data == undefined) {
        Alert.alert(
          Languages.loginRequired,
          Languages.loginRequiredMsg,
          [
            {text: Languages.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: Languages.ok, onPress: this.showLogin},
          ],
          { cancelable: false }
        )
      }else{
        this.props.onPostComment()
        this.props.onClose()
      }
  }

  showLogin = ()=>{
    Events.openUserModal()
    this.props.onClose()
  }
}

ActionsModal.defaultProps = {
  posts: []
}

const mapStateToProps = ({ user, bookmark }, ownProps) => {
  return { posts: bookmark.posts, data: user.data, }
}
export default connect(mapStateToProps, {fetchPostsBookmark})(ActionsModal)
