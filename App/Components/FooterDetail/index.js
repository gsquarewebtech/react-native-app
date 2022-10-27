import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image, Platform, Alert, Share } from 'react-native'
import { Constants, Config, Images, Languages, Tools, Events } from '@common'
import styles from './style'
import { connect } from "react-redux";
import { flatten } from 'lodash'
import User from '@services/User'
import { fetchPostsBookmark } from '@redux/actions'

class Footer extends PureComponent {
  state = {
    clicked: false
  }

  render() {
    let { style, onShowComments, onNext, comments } = this.props
    return (
      <View style={[styles.container, style]}>
        <TouchableOpacity onPress={this.onPostComment}>
          <Text style={styles.comment}>{Languages.addComment}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onShowComments}>
          <Image source={Images.CommentIcon} style={styles.icon} />
          {comments.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{comments.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.shareText}>
          <Image source={Images.ShareIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.readLater}>
          <Image source={this.state.clicked ? Images.FavoritedIcon : Images.FavoriteIcon} style={[styles.icon, !this.state.clicked && { tintColor: 'black' }]} />
        </TouchableOpacity>

        {Platform.OS == "ios" && (
          <TouchableOpacity onPress={onNext} style={styles.btnNext}>
            <Text style={styles.next}>{Languages.next}</Text>
            <Image source={Images.SmallNextIcon} style={styles.nextIcon} />
          </TouchableOpacity>
        )}
      </View>
    )
  }

  componentWillMount() {
    this.checkClicked(this.props.posts);
  }

  shareText = () => {
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

  checkClicked(posts) {
    const postid = this.props.post && this.props.post.id;
    let clicked = (posts.filter(item => postid == item.id)) == ""
    this.setState({ clicked: !clicked });
  }

  readLater = () => {
    if (this.state.clicked) {
      this.setState({ clicked: false });
      User.removePost(this.props.post, this.props.fetchPostsBookmark)
      return;
    }

    this.setState({ clicked: true })
    User.savePost(this.props.post, this.props.fetchPostsBookmark);
  }

  onPostComment = () => {
    if (this.props.data == null || this.props.data == undefined) {
      Alert.alert(
        Languages.loginRequired,
        Languages.loginRequiredMsg,
        [
          { text: Languages.cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: Languages.ok, onPress: this.showLogin },
        ],
        { cancelable: false }
      )
    } else {
      this.props.onPostComment()
    }
  }

  showLogin = () => {
    Events.openUserModal()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts != undefined && nextProps.posts != undefined && nextProps.posts.length != this.props.posts.length) {
      this.checkClicked(nextProps.posts);
    }
  }

}

Footer.defaultProps = {
  comments: [],
  posts: []
}

const mapStateToProps = ({ comments, bookmark, user }, ownProps) => {
  const postId = ownProps.post.id
  let postComments = []

  if (comments.list.length > 0) {
    comments.list.map((comment) => {
      if (typeof comment[postId] != 'undefined') {
        postComments = flatten(comment[postId])
      }
    })
  }
  return { comments: postComments, posts: bookmark.posts, data: user.data }
}
export default connect(mapStateToProps, { fetchPostsBookmark })(Footer)
