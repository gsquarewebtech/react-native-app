/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Dimensions, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { Constants, Tools } from '@common'
import { CommentIcons, ImageCache } from '@components'
import { LinearGradient } from '@expo'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import css from './styles'
const { width : screenWidth } = Dimensions.get('window')


const CardLayout = ({ viewPost, hideTitle, post }) => {
  const imageURL = Tools.getImage(post, Constants.PostImage.large)
  const title =
    typeof post !== 'undefined' ? Tools.formatText(post.title.rendered) : ''
  const date = post.date
  let videoUrl = ''
  if (typeof post !== 'undefined' && post.content) {
    videoUrl = Tools.getLinkVideo(post.content.rendered)
  }
  
  const dynamicHeight = true;
  const width = screenWidth - 24;
  const mediaDetailRatio =  typeof post.better_featured_image != 'undefined' ? post.better_featured_image.media_details.height / post.better_featured_image.media_details.width : 1
  const height = mediaDetailRatio * width;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.panelOne}
      onPress={viewPost}
    >
      <ImageCache source={{ uri: imageURL }} style={[css.imagePanelOne, dynamicHeight && {height} ]} />

      {videoUrl.length > 0 && (
        <View style={css.iconVideo}>
          <Icon name="control-play" size={25} style={css.iconPlay} />
        </View>
      )}

      {hideTitle && (
        <LinearGradient
          style={css.linearGradient}
          colors={['rgba(0,0,0, 0)', 'rgba(0, 0, 0, 0.8)']}
        />
      )}

      <Text style={[css.nameOne, hideTitle && css.floatTitle]}>{title}</Text>
      {!hideTitle && (
        <Text style={css.timeOne}>
          <TimeAgo time={date} />
        </Text>
      )}
      <CommentIcons
        post={post}
        size={20}
        style={css.heart}
        hideShareIcon
        activeBackground="rgba(255, 255, 255, .3)"
        hideOpenIcon
        hideCommentIcon
      />
    </TouchableOpacity>
  )
}

CardLayout.propTypes = {
  viewPost: PropTypes.func,
  hideTitle: PropTypes.bool,
  post: PropTypes.object,
}

export default CardLayout
