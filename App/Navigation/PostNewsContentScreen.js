/** @format */

import React, { Component } from 'react'
import { Style } from '@common'
import { PostNewsContent } from '@container'
import Icons from './Icons'

export default class PostNewsContentScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const { navigation } = this.props
    const { navigate } = navigation

    return (
      <PostNewsContent
        navigation={navigation}
        onBack={()=>navigation.goBack()}
        onClose={()=>navigate("mine")}/>
    )
  }
}
