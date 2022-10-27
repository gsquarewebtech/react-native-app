/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { Constants, Tools } from '@common'
import { CommentIcons } from '@components'
import css from './styles'

const ListRight = ({ viewPost, category, post }) => {
  const imageURL = Tools.getImage(post, Constants.PostImage.medium)
  const date = post.date
  const title = Tools.formatText(post.title.rendered, 100)
  const description = Tools.formatContent(post.excerpt.rendered, 300)

  return (
    <TouchableOpacity style={css.panel} onPress={viewPost}>
      <View style={css.content}>
        <TouchableOpacity activeOpacity={0.9} >
          <Text numberOfLines={2} style={css.title}>
            {title}
          </Text>
        </TouchableOpacity>

        {description !== '' && (
          <Text numberOfLines={3} style={css.description}>
            {description}
          </Text>
        )}

        <View style={{ flexDirection: 'row' }}>
          <TimeAgo style={css.time} time={date} hideAgo />

          {category !== '' && (
            <TouchableOpacity>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
        <Image source={{ uri: imageURL }} style={css.image} />
      </TouchableOpacity>

      <CommentIcons
        post={post}
        size={16}
        style={[css.heart, { right: 0, top: 10 }]}
        hideShareIcon
        hideOpenIcon
        hideCommentIcon
      />
    </TouchableOpacity>
  )
}

ListRight.propTypes = {
  viewPost: PropTypes.func,
  category: PropTypes.any,
  post: PropTypes.object,
}

export default ListRight
