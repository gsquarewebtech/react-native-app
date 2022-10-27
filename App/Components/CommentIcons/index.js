/** @format */

import React, { Component } from 'react'
import { View, Text, Share, Linking } from 'react-native'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import IconHeart from '@expo/vector-icons/Ionicons'
import User from '@services/User'
import { warn, Tools } from '@common'
import { fetchPostsBookmark } from '@redux/actions'
import { connect } from 'react-redux'
import Icons from '@navigation/Icons'
import { WebBrowser } from '@expo'
import css from './style'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ColorHeart:
        typeof this.props.color === 'undefined' ? '#FFF' : this.props.color,
      clicked: false,
    }
  }

  componentWillMount() {
    this.checkClicked()
  }

  checkClicked() {
    const postid = this.props.post && this.props.post.id
    const { posts } = this.props
    const clicked = posts.filter((item) => postid == item.id) == ''
    if (clicked) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true, ColorHeart: '#e74c3c' })
    }
  }

  readLater = () => {
    if (this.state.clicked) {
      this.setState({
        ColorHeart: '#fff',
        clicked: false,
      })
      User.removePost(this.props.post, this.props.fetchPostsBookmark)
      return
    }

    this.setState({
      ColorHeart: '#e74c3c',
      clicked: true,
    })
    User.savePost(this.props.post, this.props.fetchPostsBookmark)
  }

  shareText() {
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

  externalLink() {
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

  render() {
    const {
      onBack,
      style,
      hideLoveIcon,
      hideCommentIcon,
      hideOpenIcon,
      size,
      hideShareIcon,
      activeBackground,
      iconIconHeart,
      color,
    } = this.props
    const { clicked } = this.state

    const textColor = typeof color === 'undefined' ? '#333' : color
    return (
      <View
        style={
          typeof style === 'undefined' || style == null ? css.shareIcon : style
        }
      >
        {typeof onBack !== 'undefined' && (
          <View style={css.backButton}>{Icons.Back(onBack)}</View>
        )}

        {typeof hideLoveIcon === 'undefined' ? (
          <IconHeart.Button
            style={!clicked ? css.newsIconsOpacity : css.newsIcons}
            //~ name={!clicked  ? 'ios-heart-empty': 'ios-heart'}
            name='ios-heart'
            size={this.props.size ? this.props.size + 4 : 18}
            color={!clicked ? iconIconHeart || '#FFF' : this.state.ColorHeart}
            onPress={this.readLater}
            backgroundColor="transparent"
          />
        ) : null}

        {typeof hideShareIcon === 'undefined' ? (
          <Icon.Button
            style={css.newsIcons}
            onPress={this.shareText.bind(this)}
            name="share"
            size={size || 16}
            color={textColor}
            backgroundColor="transparent"
          />
        ) : null}

        {typeof hideOpenIcon === 'undefined' ? (
          <Icon.Button
            style={css.newsIcons}
            name="share-alt"
            size={size || 16}
            color={textColor}
            onPress={this.externalLink.bind(this)}
            backgroundColor="transparent"
          />
        ) : null}

        {typeof hideCommentIcon === 'undefined' ? (
          <Icon.Button
            style={css.newsIcons}
            name="speech"
            size={size || 16}
            color={textColor}
            backgroundColor="transparent"
          >
            <Text style={[css.iconText, { color: textColor }]}>
              {this.props.comment}
            </Text>
          </Icon.Button>
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = ({ bookmark }) => ({ posts: bookmark.posts })
module.exports = connect(
  mapStateToProps,
  { fetchPostsBookmark }
)(Index)
