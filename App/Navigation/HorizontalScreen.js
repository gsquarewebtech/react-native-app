/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { HorizonList } from '@components'

export default class PostListScreen extends PureComponent {
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
    const index = params.index

    return (
      <HorizonList
        horizontal={false}
        key={`hlist-${index}`}
        config={params.config}
        index={index}
        goBack={() => goBack()}
        onViewPost={(item, index, parentPosts) => {
          navigate('postDetail', { post: item, index, parentPosts })
        }}
      />
    )
  }
}
