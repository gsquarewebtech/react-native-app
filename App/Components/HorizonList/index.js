/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, Animated, TouchableOpacity, View } from 'react-native'
import { Constants, Languages, Images } from '@common'
import { fetchPostsByTag } from '@redux/actions'
import { connect } from 'react-redux'
import Icon from '@expo/vector-icons/Entypo'
import { PostLayout, AnimatedHeader } from '@components'
import styles from './styles'
import Banner from './Banner'

const AnimatedListView = Animated.createAnimatedComponent(FlatList)

class HorizonList extends PureComponent {
  static propTypes = {
    layouts: PropTypes.object,
    onViewPost: PropTypes.func,
    onShowAll: PropTypes.func,
    config: PropTypes.object,
    index: PropTypes.number,
    fetchPostsByTag: PropTypes.func,
    horizontal: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.page = 1
    this.defaultList = [
      {
        id: 1,
        name: Languages.loading,
        title: { render: 'Loading' },
        images: [Images.imageHolder],
      },
      {
        id: 2,
        name: Languages.loading,
        title: { render: 'Loading' },
        images: [Images.imageHolder],
      },
      {
        id: 3,
        name: Languages.loading,
        title: { render: 'Loading' },
        images: [Images.imageHolder],
      },
    ]

    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentDidMount() {
    this.fetchPost()
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index, this.props.layouts.list)
  }

  fetchPost = () => {
    const { config, index, fetchPostsByTag } = this.props
    fetchPostsByTag(this.page, config.tags, config.categories, index)
  }

  nextPosts = () => {
    this.page += 1
    !this.props.layouts.finish && this.fetchPost()
  }

  viewAll = () => {
    const { index, config, onShowAll } = this.props
    onShowAll({ index, config })
  }

  renderItem = ({ item, index }) => {
    const { layouts, horizontal, config } = this.props
    const { layout, textColor, row } = config

    const isFlexibleColumn =
      layout === Constants.Layout.threeColumn ||
      layout === Constants.Layout.column ||
      layout === Constants.Layout.flexColumn
    const newLayout =
      !horizontal && isFlexibleColumn ? Constants.Layout.twoColumn : layout

    const list =
      typeof layouts !== 'undefined' && layouts.list !== 0
        ? layouts.list
        : this.defaultList
    var numOfLine = row || 1
    const newIndex = index * numOfLine
    if (typeof list === 'undefined' || newIndex >= list.length) {
      return <View />
    }

    if (newIndex + numOfLine > list.length) {
      numOfLine = list.length - newIndex
    }

    return (
      <View>
        {Array.apply(0, Array(numOfLine)).map((_, index) => {

          const item = list[newIndex + index]
          return (
            <PostLayout
              post={item}
              key={`post-${index}`}
              config={config}
              textColor={textColor}
              onViewPost={() => this.onViewPost(item, newIndex + index)}
              layout={newLayout}
            />
          )
        })}
      </View>
    )
  }

  renderHeader = () => {
    const { config } = this.props
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.header]}
        onPress={this.viewAll}
      >
        <Text
          style={[
            styles.tagHeader,
            config.textColor && { color: config.textColor },
          ]}
        >
          {config.name}
        </Text>
        <Icon
          style={styles.icon}
          color="#999"
          size={22}
          name={Constants.RTL ? "chevron-small-left" : "chevron-small-right"}
        />
      </TouchableOpacity>
    )
  }

  renderAnimatedHeader = () => {
    const { config, goBack } = this.props
    return (
      <AnimatedHeader
        goBack={goBack}
        label={config.name}
        scrollY={this.state.scrollY}
      />
    )
  }

  render() {
    const { layouts, horizontal, config } = this.props
    const isPaging = !!config.paging

    const list =
      typeof layouts !== 'undefined' && layouts.list
        ? layouts.list
        : this.defaultList

    if (typeof list === 'undefined' || list.length === 0) return <View />

    return (
      <View
        style={[
          styles.flatWrap,
          config.color && { backgroundColor: config.bgColor },
        ]}
      >
        {!horizontal && this.renderAnimatedHeader()}

        {config.name && horizontal && this.renderHeader()}

        {config.layout == Constants.Layout.banner && <Banner list={list} config={config} onViewPost={this.onViewPost} />}
        {config.layout != Constants.Layout.banner && (
          <AnimatedListView
            contentContainerStyle={[styles.hList, !horizontal && styles.vList]}
            data={list}
            keyExtractor={(item, index) => `${item.id || index}`}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={!horizontal}
            horizontal={horizontal}
            pagingEnabled={horizontal && isPaging}
            onEndReached={!horizontal && this.nextPosts}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ layouts }, ownProp) => {
  const index = ownProp.index
  return { layouts: layouts[index] }
}

export default connect(mapStateToProps, { fetchPostsByTag })(HorizonList)
