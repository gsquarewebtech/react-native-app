/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, TouchableOpacity } from 'react-native'
import TimeAgo from 'react-native-timeago'
import { Constants, Tools, warn } from '@common'
import { CommentIcons, ImageCache } from '@components'
import css from './styles'

const List = ({ viewPost, category, post }) => {
  const imageURL = Tools.getImage(post, Constants.PostImage.small)

  const date = post.date
  const title =
    typeof post.title !== 'undefined'
      ? Tools.formatText(post.title.rendered, 300)
      : ''
  const description =
    typeof post.excerpt !== 'undefined'
      ? Tools.formatContent(post.excerpt.rendered, 300)
      : ''

  return (
    <TouchableOpacity style={css.panelList} onPress={viewPost}>
      <TouchableOpacity activeOpacity={0.9} onPress={viewPost}>
        <ImageCache source={{ uri: imageURL }} style={css.imageList} />
        <CommentIcons
          post={post}
          size={16}
          style={[css.heart, { right: Constants.RTL ? 10 : 0, top: 10 }]}
          hideShareIcon
          hideOpenIcon
          hideCommentIcon
        />
      </TouchableOpacity>

      <View style={css.titleList} >
        <TouchableOpacity activeOpacity={0.9} >
          <Text numberOfLines={1} style={css.nameList}>
            {title}
          </Text>
        </TouchableOpacity>

        {description !== '' && (
          <Text numberOfLines={2} style={css.descriptionList}>
            {description}
          </Text>
        )}

        <View style={{ flexDirection: 'row' }}>
          <TimeAgo style={css.timeList} time={date} />

          {category && (
            <TouchableOpacity>
              <Text style={css.category}>- {category}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

List.propTypes = {
  viewPost: PropTypes.func,
  category: PropTypes.any,
  post: PropTypes.object,
}

export default List
