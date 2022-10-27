/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TimeAgo from 'react-native-timeago'
import Swipeout from 'react-native-swipeout'
import User from '@services/User'
import { Tools } from '@common'
import css from './styles'

export default class PostReadLater extends PureComponent {
  static propTypes = {
    post: PropTypes.object,
    onViewPost: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { isRemove: false }
  }

  removePost = (post) => {
    User.removePost(post)
    this.setState({ isRemove: true })
  }

  onOpen = () => {}

  render() {
    if (this.state.isRemove) {
      return null
    }

    const swipeBtns = [
      {
        text: 'Delete',
        backgroundColor: '#E3222C',
        borderColor: '#fff',
        borderWidth: '2',
        onPress: () => {
          this.removePost(this.props.post)
        },
      },
    ]
    const { onViewPost, post } = this.props
    const imageURL = Tools.getImage(post)
    const postTitle =
      typeof post.title.rendered !== 'undefined' ? post.title.rendered : ''

    return (
      <Swipeout
        onOpen={this.onOpen}
        style={{ backgroundColor: '#fff' }}
        right={swipeBtns}
      >
        <TouchableOpacity style={css.panel} onPress={onViewPost}>
          <TouchableOpacity onPress={onViewPost}>
            <Image source={{ uri: imageURL }} style={css.image} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onViewPost} >
            <View style={css.title}>
              <Text style={css.name}>{Tools.formatText(postTitle, 150)}</Text>
              <Text style={css.time}>
                <TimeAgo time={post.date} hideAgo />
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Swipeout>
    )
  }
}
