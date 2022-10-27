/** @format */

// custom module from - react-native-magazine-listview

import React, { PureComponent } from 'react'
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  FlatList,
} from 'react-native'
import { Tools, Events, Constants } from '@common'
import TimeAgo from 'react-native-timeago'
import { CommentIcons } from '@components'
import css from './style'

const { width } = Dimensions.get('window')

export default class SwipeCards extends PureComponent {
  constructor(props) {
    super(props)
    const imageCards = this.initImages(props.data)
    this.state = {
      data: props.data,
      opacity: new Animated.Value(1),

      images: imageCards.reverse(),

      opacity_values: imageCards.map(() => {
        return new Animated.Value(1)
      }),
      text_opacity: imageCards.map(() => {
        return new Animated.Value(1)
      }),
    }
    this.page = imageCards.length - 1
    this.offset = 0

    this.renderRow = this.renderRow.bind(this)
  }

  componentDidMount() {
    this.fetchPostData()
  }

  initImages(data) {
    const images = []
    data.map((post) => {
      const imageUrl = Tools.getImage(post)
      images.push(imageUrl)
    })
    return images
  }

  viewPost(post) {
    const navigate = this.props.navigate
    navigate('postDetail', { post })
    // Actions.postDetails({post: post});
  }

  fetchPostData() {
    Events.postCardFetchData()
  }

  renderRow = ({item, index}) => {
    if (typeof item.title === 'undefined') {
      return null
    }
    const postTitle = Tools.formatText(item.title.rendered, 200)
    const authorName = item._embedded.author[0].name
    const commentCount =
      typeof item._embedded.replies === 'undefined'
        ? 0
        : item._embedded.replies[0].length

    return (
      <View style={css.cardView}>
        <TouchableOpacity
          style={css.card}
          onPress={this.viewPost.bind(this, item)}
        >
          <Animated.View
            style={{ flex: 1, opacity: this.state.text_opacity[index] }}
          >
            <Text style={css.title}>{postTitle}</Text>
            <Text style={css.author}>
              <TimeAgo time={item.date} hideAgo /> by @{authorName}
            </Text>
            <CommentIcons
              style={Constants.RTL ? css.iconShare : null}
              post={item}
              comment={commentCount}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  handleScroll(event) {
    const e = event.nativeEvent

    const currentOffset = e.contentOffset.x
    const offset_ratio = currentOffset / width
    if (currentOffset > this.offset) {
      if (!Number.isInteger(offset_ratio) && offset_ratio > 0) {
        var page = Math.floor(offset_ratio)
        var stack = Math.abs(page - this.state.opacity_values.length + 1)
        if (stack != 0) {
          this.state.opacity_values[stack].setValue(
            Math.abs((currentOffset - width * (page + 1)) / width)
          )
          this.state.text_opacity[page].setValue(
            Math.abs((currentOffset - width * (page + 1)) / width)
          )
          this.state.text_opacity[page + 1].setValue(
            Math.abs((currentOffset - width * page) / width)
          )
        }
      }
    } else if (!Number.isInteger(offset_ratio) && offset_ratio > 0) {
      var page = Math.ceil(offset_ratio)
      var stack = Math.abs(page - this.state.opacity_values.length + 1)
      if (
        this.state.opacity_values[stack + 1] != null &&
        page < this.state.opacity_values.length
      ) {
        this.state.opacity_values[stack + 1].setValue(
          Math.abs(currentOffset - width * page) / width
        )
        this.state.text_opacity[page - 1].setValue(
          Math.abs((currentOffset - width * page) / width)
        )
        this.state.text_opacity[page].setValue(
          Math.abs(currentOffset - width * (page - 1)) / width
        )
      }
    }
    this.offset = currentOffset
  }

  renderImages() {
    const { images, opacity_values } = this.state

    return images.map((image, i) => {
      return (
        <Animated.Image
          key={i}
          style={[css.image, { opacity: opacity_values[i] }]}
          source={{ uri: images[i] }}
        />
      )
    })
  }

  render() {
    const { images, page, opacity } = this.state
    return (
      <View style={css.body}>
        {this.renderImages()}
        <View style={{ position: 'absolute' }}>
          <FlatList
            keyExtractor={(item, index) => `${index}`}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={this.handleScroll.bind(this)}
            horizontal
            data={this.props.data}
            onEndReachedThreshold={200}
            onEndReached={this.fetchPostData.bind(this)}
            renderItem={this.renderRow}
          />
        </View>
      </View>
    )
  }
}
