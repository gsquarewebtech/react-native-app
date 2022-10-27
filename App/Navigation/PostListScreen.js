/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Constants } from '@common'
import { PostList } from '@components'

export default class PostListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    header: null,
  })

  static propTypes = {
    navigation: PropTypes.object,
  }

  render() {
    const { navigate, goBack, state } = this.props.navigation
    const params = state.params

    return (
      <PostList
        config={params.config && params.config}
        goBack={() => goBack()}
        layout={Constants.Layout.twoColumn}
        onViewPost={(item, index, parentPosts) =>
          navigate('postDetail', {
            post: item,
            index,
            parentPosts,
            backToRoute: 'category'
          })
        }
      />
    )
  }
}
