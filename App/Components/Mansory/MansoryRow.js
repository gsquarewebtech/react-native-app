/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import { CommentIcons } from '@components'
import { Tools } from '@common'
import css from './styles'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const TwoColumn = ({ post, viewPost }) => {
  const imageURL = Tools.getImage(post)
  const title = typeof post.title === 'undefined' ? '' : post.title.rendered

  const imageSize = Tools.getImageSize(post, SCREEN_WIDTH / 2)

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={css.viewMansory}
      onPress={viewPost}
    >
      <View style={css.cardView}>
        <Image
          style={[css.imageMansory, { height: imageSize.height }]}
          source={{ uri: imageURL }}
        />
        <View style={css.smDescription}>
          <Text style={css.smTitle}>{Tools.formatText(title)}</Text>
        </View>
      </View>
      <CommentIcons
        post={post}
        size={16}
        style={css.fixHeart}
        hideShareIcon
        hideOpenIcon
        hideCommentIcon
      />
    </TouchableOpacity>
  )
}

TwoColumn.propTypes = {
  post: PropTypes.object,
  viewPost: PropTypes.func,
}

export default TwoColumn
