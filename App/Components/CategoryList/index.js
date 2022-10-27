/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Animated, View } from 'react-native'
import { fetchPosts } from '@redux/actions'
import { Constants, Layout } from '@common'
import { connect } from 'react-redux'
import {
  PostLayout,
  CategoryBanner,
  HeaderFilter,
  Toolbar,
  FlatButton,
  Spinkit,
} from '@components'
import styles from './styles'

const HEADER_MIN_HEIGHT = 40
const HEADER_SCROLL_DISTANCE = Constants.Window.headerHeight - HEADER_MIN_HEIGHT

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

class PostList extends Component {
  static propTypes = {
    onViewPost: PropTypes.func,
    list: PropTypes.any,
    parentLayout: PropTypes.any,
    fetchPosts: PropTypes.func,
    postFinish: PropTypes.bool,
    showBanner: PropTypes.bool,
    isFetching: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false

    const scrollY = new Animated.Value(0)
    const offsetAnimate = new Animated.Value(0)

    this.state = {
      scrollY,
      offsetAnimate,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnimate
        ),
        0,
        HEADER_MIN_HEIGHT
      ),
    }
  }

  _clampedScrollValue = 0
  _offsetValue = 0
  _scrollValue = 0

  componentDidMount() {
    this.page === 1 && this.fetchPost()
  }

  onViewPost = (item, index) => {
    const { list: parentPosts } = this.props

    this.props.onViewPost(item, index, parentPosts)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.layout !== nextProps.layout ||
      this.props.selectedTag !== nextProps.selectedTag ||
      this.props.selectedCategory !== nextProps.selectedCategory
    ) {
      this.fetchPost(true)
    }
  }

  renderItem = ({ item, index }) => {
    if (item == null) return <View />

    let layout = this.props.parentLayout

    if (typeof this.props.layout !== 'undefined') {
      layout = this.props.layout
    }

    // update layout for advance mod
    if (layout === Constants.Layout.advance || layout == null) {
      const total = Layout.length
      layout = Layout[index % total]
    }

    return (
      <PostLayout
        post={item}
        onViewPost={() => this.onViewPost(item, index)}
        layout={layout}
      />
    )
  }

  fetchPost = (reload) => {
    if (reload) {
      this.page = 1
    }
    const { selectedTag, selectedCategory, fetchPosts } = this.props
    fetchPosts(this.page, selectedTag, selectedCategory)
  }

  nextPosts = () => {
    if (!this.props.postFinish) {
      this.isNextPost = true
      this.page += 1
      this.fetchPost()
    }
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250)
  }

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer)
  }

  _onMomentumScrollEnd = () => {
    const toValue =
      this._scrollValue > HEADER_MIN_HEIGHT &&
      this._clampedScrollValue > HEADER_MIN_HEIGHT / 2
        ? this._offsetValue + HEADER_MIN_HEIGHT
        : this._offsetValue - HEADER_MIN_HEIGHT

    Animated.timing(this.state.offsetAnimate, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start()
  }

  renderHeader = () => {
    const { showBanner, onViewPost } = this.props

    const headerTransform = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE - 100, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 100],
      extrapolate: 'clamp',
    })

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50, -100],
      extrapolate: 'clamp',
    })
    return (
      <View>
        {showBanner && (
          <CategoryBanner
            onViewPost={onViewPost}
            animateOpacity={animateOpacity}
            headerTransform={headerTransform}
            animate={titleTranslate}
          />
        )}
        {showBanner && <HeaderFilter />}
      </View>
    )
  }

  renderFooter = () => {
    const { isFetching, postFinish } = this.props

    if (isFetching) return <Spinkit />
    return (
      !postFinish && (
        <View style={styles.more}>
          <FlatButton
            name="arrow-down"
            text={isFetching ? 'LOADING...' : 'MORE'}
            load={this.nextPosts}
          />
        </View>
      )
    )
  }

  render() {
    const { list, showBanner } = this.props
    const { clampedScroll } = this.state

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    return (
      <View style={{ flex: 1 }}>
        <AnimatedListView
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `postList-${item.id} || ${index}`}
          renderItem={this.renderItem}
          scrollEventThrottle={1}
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={1}
          onEndReached={(distance) => {
            distance.distanceFromEnd < 700 && this.nextPosts()
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />

        {showBanner && (
          <Animated.View
            style={[
              styles.navbar,
              { transform: [{ translateY: navbarTranslate }] },
            ]}
          >
            <Animated.View style={[styles.title, { opacity: navbarOpacity }]}>
              <Toolbar />
            </Animated.View>
          </Animated.View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ posts, tags, categories }, ownProps) => {
  return {
    list: posts.list,
    postFinish: posts.postFinish,
    isFetching: posts.isFetching,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
    layout: posts.layout,
    parentLayout: ownProps.layout,
  }
}
export default connect(mapStateToProps, { fetchPosts })(PostList)
