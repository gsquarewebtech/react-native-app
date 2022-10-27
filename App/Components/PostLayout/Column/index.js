/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { CommentIcons, ImageCache } from '@components'
import { Tools, Constants } from '@common'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import css from './styles'

const ColumnLayout = ({ viewPost, post, width, height }) => {
  const title =
    typeof post !== 'undefined' ? Tools.formatText(post.title.rendered) : ''
  const imageURL = Tools.getImage(post, Constants.PostImage.medium)
  
  const date = typeof post.date === 'undefined' ? '' : post.date
  let videoUrl = ''
  if (typeof post !== 'undefined') {
    videoUrl =
      post.content
        ? Tools.getLinkVideo(post.content.rendered)
        : ''
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[css.panel, width && { width: width + 15 }]}
      onPress={viewPost}>
      <ImageCache
        source={{ uri: imageURL }}
        style={[css.image, width && { width }, height && { height }]}
      />

      {videoUrl.length > 0 && (
        <View
          style={[
            css.iconVideo,
            width && { left: width / 2 - 15 },
            height && { top: height / 3 - 10 },
          ]}>
          <Icon name="control-play" size={25} style={css.iconPlay} />
        </View>
      )}

      <Text numberOfLines={2} style={[css.name, width && { width: width - 4 }]}>
        {title}
      </Text>

      <Text style={css.time}>
        <TimeAgo time={date} />
      </Text>

      <CommentIcons
        post={post}
        size={16}
        style={css.heart}
        activeBackground="rgba(255, 255, 255, .3)"
        hideShareIcon
        hideOpenIcon
        hideCommentIcon
      />
    </TouchableOpacity>
  )
}

ColumnLayout.propTypes = {
  viewPost: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  post: PropTypes.object,
}

export default ColumnLayout
