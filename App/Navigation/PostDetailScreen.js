/** @format */

import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Tools, warn } from '@common'
import { PostDetail } from '@container'

const PAGE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    elevation: 0,
    paddingTop: 0,
    width: PAGE_WIDTH / 2,
  },
  container: {
    flex: 1,
  },
})

export default class PostDetailScreen extends Component {
  static navigationOptions = () => ({
    headerTintColor: '#333',
    // tabBarVisible: false,
    // headerLeft: Icons.Back( () => navigation.goBack() ),
    // headerRight: Icons.Next()
    headerStyle: styles.toolbar,
    header: null,
    tabBarVisible: false,
  })

  _goBack = (backToRoute) => {
    const { goBack, navigate } = this.props.navigation
    if (typeof backToRoute != 'undefined') {
      navigate(backToRoute)
    } else {
      goBack()
    }
  }


  render() {
    const { state, navigate, goBack } = this.props.navigation

    if (typeof state.params == 'undefined') return <View />

    const post =
      typeof state.params !== 'undefined' ? state.params.post : this.props.post
    const postIndex =
      typeof state.params !== 'undefined'
        ? state.params.index
        : this.props.index
    const parentPosts =
      typeof state.params !== 'undefined'
        ? state.params.parentPosts
        : this.props.parentPosts
    const fromSearch =
      typeof state.params !== 'undefined' && state.params.fromSearch == true
    const routeName = fromSearch ? 'searchPostDetail' : 'postDetail'

    const backToRoute =
      state.params !== 'undefined' ? state.params.backToRoute : undefined

    return (
      <PostDetail
        navigation={this.props.navigation}
        post={post}
        parentPosts={parentPosts}
        onBack={() => this._goBack(backToRoute)}
        index={postIndex}
        onViewPost={(item, index, parentPosts) => {
          navigate(routeName, { post: item, index, parentPosts, fromSearch })
        }}
      />
    )
  }
}
