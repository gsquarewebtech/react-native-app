/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, RefreshControl, Animated, View, Text } from 'react-native'
import { fetchPosts } from '@redux/actions'
import { Constants, Config, Images, Layout, warn } from '@common'
import { connect } from 'react-redux'
import Icons from '@navigation/Icons'
import {
  PostLayout,
  PostBanner,
  AnimatedHeader,
  HeaderFilter,
  FlatButton,
  Spinkit,
} from '@components'
import styles from './styles'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)
 
class PostList extends Component {
	
  constructor(props) {
    super(props);
    
     this.childRef = React.createRef();
}
	
  state = { scrollY: new Animated.Value(0) }

  static propTypes = {
    list: PropTypes.array,
    layout: PropTypes.number,
    selectedTag: PropTypes.string,
    selectedCategory: PropTypes.number,
    onViewPost: PropTypes.func,
    fetchPosts: PropTypes.func,
    postFinish: PropTypes.bool,
    showBanner: PropTypes.bool,
    isFetching: PropTypes.bool,
    parentLayout: PropTypes.any,
    config: PropTypes.object,
    goBack: PropTypes.func,
  }

  componentDidMount() {
    this.page = 1
    this.fetchPost()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.list !== this.props.list
  }

  onViewPost = (item, index) => {
    const { list : parentPosts } = this.props
    this.props.onViewPost(item, index, parentPosts)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.layout !== nextProps.layout 
      //~ ||
      //~ this.props.selectedTag !== nextProps.selectedTag ||
      //~ this.props.selectedCategory !== nextProps.selectedCategory
    ) {
      this.fetchPost(true)
    }
  }

  renderItem = ({ item, index }) => {
  
    if (item === null) return <View />

    let layout = this.props.parentLayout

    if (
      typeof layout === 'undefined' &&
      typeof this.props.layout !== 'undefined'
    ) {
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

  fetchPost = (reload = false) => {
    if (reload) {
      this.page = 1
    }
    const { selectedTag, selectedCategory, fetchPosts } = this.props
    fetchPosts(this.page, selectedTag, selectedCategory)
  }

  nextPosts = () => {
    if (!this.props.postFinish) {
      this.page += 1
      this.fetchPost()
    }
  }

  renderHeader = () => {
    const { showBanner, onViewPost } = this.props

    if (!Config.Banner.visible) {
      return <HeaderFilter showCategory />
    }

    if (showBanner) {
      return (
        <View style={{ flex: 1 }}>
          <PostBanner childRef={ref=>this.PostBanner=ref} onViewPost={onViewPost} scrollY={this.state.scrollY} />
          <HeaderFilter showCategory />
        </View>
      )
    }
    return <View style={{ width: 200, marginTop: 20 }} />
  }

  ListEmpty = () => {
	  return (<View style={styles.noPost}><Text style={styles.noPostText}>No post found...</Text></View>)
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
    const { list, config, goBack, isFetching } = this.props

    return (
      <View style={styles.body}>
        {typeof goBack !== 'undefined' ? (
          <AnimatedHeader
            goBack={goBack}
            label={config.name}
            scrollY={this.state.scrollY}
          />
        ) : (
          <AnimatedHeader
            image={Images.logo}
            right={Config.showLayoutButton && Icons.Layer()}
            scrollY={this.state.scrollY}
          />
        )}

        <AnimatedListView
          contentContainerStyle={styles.flatlist}
          data={list}
          keyExtractor={(item, index) => `postList-${item.id} || ${index}`}
          renderItem={this.renderItem}
          refreshing={isFetching}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {this.fetchPost(true)
				  console.log(this.PostBanner.refreshPosts());
				  }}
            />
          }
          onMomentumScrollBegin={this._onMomentumScrollBegin}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollEndDrag={this._onScrollEndDrag}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.ListEmpty}
          onEndReachedThreshold={1}
          onEndReached={(distance) => {
            distance.distanceFromEnd < 700 && this.nextPosts()
          }}
          scrollEventThrottle={1}
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
  const list = posts.list

  return {
    list,
    postFinish: posts.postFinish,
    isFetching: posts.isFetching,
    selectedTag: tags.selectedTag,
    selectedCategory: categories.selectedCategory,
    layout: posts.layout,
    parentLayout: ownProps.layout,
  }
}
export default connect(mapStateToProps, { fetchPosts })(PostList)
