/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Videos } from '@container'

export default class VideoScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    const { navigate, onBack } = this.props.navigation
    return (
      <Videos
        onBack={() => onBack()}
        onViewPost={(item, index, parentPosts) =>
          navigate('postDetail', { post: item, index, parentPosts, backToRoute: 'video' })
        }
      />
    )
  }
}
