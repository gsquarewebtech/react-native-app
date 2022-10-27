/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, View } from 'react-native'
import { fetchPosts } from '@redux/actions'
import { Tools, Config, Images } from '@common'
import { connect } from 'react-redux'
import MasonryList from '@appandflow/masonry-list'
import Icons from '@navigation/Icons'
import { AnimatedHeader } from '@components'
import MansoryRow from './MansoryRow'
import styles from './styles'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const AnimatedListView = Animated.createAnimatedComponent(MasonryList)

class Mansory extends Component {
  static propTypes = {
    list: PropTypes.any,
    onViewPost: PropTypes.func,
    layout: PropTypes.any,
    selectedTag: PropTypes.any,
    selectedCategory: PropTypes.any,
    fetchPosts: PropTypes.func,
    postFinish: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.isNextPost = false

    const scrollY = new Animated.Value(0)
    this.state = { scrollY }
  }

  componentDidMount() {
    this.fetchPost()
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

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index)
  }

  renderItem = ({ item, index }) => {
    if (item === null) return <View />

    return (
      <MansoryRow post={item} viewPost={() => this.onViewPost(item, index)} />
    )
  }

  fetchPost = (reload = false) => {
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

  render() {
    const { list, isFetching } = this.props

    return (
      <View style={styles.body}>
        <AnimatedHeader
          image={Images.logo}
          right={Config.showLayoutButton && Icons.Layer()}
          scrollY={this.state.scrollY}
        />

        <AnimatedListView
          contentContainerStyle={styles.listView}
          onRefresh={() => this.fetchPost(true)}
          refreshing={isFetching}
          data={list}
          renderItem={this.renderItem}
          getHeightForItem={({ item }) =>
            Tools.getImageSize(item, SCREEN_WIDTH / 2).height
          }
          numColumns={2}
          onEndReachedThreshold={1}
          onEndReached={(distance) => {
            distance.distanceFromEnd < 700 && this.nextPosts()
          }}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />
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
export default connect(mapStateToProps, { fetchPosts })(Mansory)
