/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Style } from '@common'
import { Home } from '@container'

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    headerStyle: Style.toolbar,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate } = this.props.navigation
    return (
        <Home
          onShowAll={({ index, config }) =>
            navigate('HorizontalScreen', { config, index })
          }
          onViewPost={(item, index, parentPosts) =>
            navigate('postDetail', { post: item, index, parentPosts, backToRoute: 'home' })
          }
        />
    )
  }
}
