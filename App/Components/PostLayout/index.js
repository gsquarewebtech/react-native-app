/** @format */

import React from 'react'
import { Dimensions } from 'react-native'
import Constants from '@common/Constants'
import Column from './Column'
import List from './List'
import ListRight from './List/Right'
import CardLayout from './Card'

const { width } = Dimensions.get('window')

const PostLayout = ({ onViewPost, config, post, layout }) => {
  switch (layout) {
    case Constants.Layout.list:
      return <List viewPost={onViewPost} post={post} />

    case Constants.Layout.listRight:
      return <ListRight viewPost={onViewPost} post={post} />

    case Constants.Layout.card:
      return <CardLayout viewPost={onViewPost} post={post} />

    case Constants.Layout.banner:
      return <CardLayout viewPost={onViewPost} hideTitle post={post} />

    case Constants.Layout.column:
      return (
        <Column viewPost={onViewPost} post={post} width={300} heigth={80} />
      )

    case Constants.Layout.twoColumn:
      return (
        <Column
          viewPost={onViewPost}
          post={post}
          width={width / 2 - 16}
          heigth={100}
        />
      )

    case Constants.Layout.flexColumn:
      return (
        <Column
          viewPost={onViewPost}
          post={post}
          width={config.width}
          heigth={config.height}
        />
      )

    case Constants.Layout.threeColumn:
      return (
        <Column
          viewPost={onViewPost}
          post={post}
          width={width / 3 - 15}
          heigth={100}
        />
      )

    default:
      return <List viewPost={onViewPost} post={post} />
  }
}

export default PostLayout
