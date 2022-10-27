/** @format */

import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Config, Languages } from '@common'
import { fetchCategories, fetchPosts, setActiveCategory } from '@redux/actions'
import { connect } from 'react-redux'
import styles, { sliderWidth, itemWidth } from './styles'

class CategoryBanner extends Component {
  showCategory = (categoryId) => {
    const {
      setActiveCategory,
      selectedCategory,
      fetchPosts,
      selectedTag,
    } = this.props

    if (categoryId !== selectedCategory) {
      setActiveCategory(categoryId)
      fetchPosts(1, selectedTag, categoryId)
    }
  }

  onViewItem = (index) => {
    const { list, selectedTag, fetchPosts, setActiveCategory } = this.props
    const category = list[index]

    if (typeof category !== 'undefined') {
      setActiveCategory(category.id)
      fetchPosts(1, selectedTag, category.id)
    } else {
      setActiveCategory(null)
      fetchPosts(1, selectedTag, null)
    }
  }

  renderCategory = ({ item, index }) => {
    const imageCategory = Config.imageCategories[item.slug]
    if (imageCategory === undefined) {
      return <View />
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.slideInnerContainer}
        key={`cate-${index + 1}`}
        onPress={() => this.showCategory(item.id)}
      >
        <Text style={[styles.title]}>{item.name.toUpperCase()}</Text>
        <View style={styles.imageContainer}>
          <Image source={imageCategory} style={styles.image} />
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    // this.onViewItem(1)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.selectedCategory !== nextProps.selectedCategory) {
  //     // warn(nextProps.selectedCategory)
  //     // update the post list whenever the select category is changed
  //   }
  // }

  render() {
    const { list } = this.props

    return (
      <Carousel
        ref="carousel"
        data={list}
        renderItem={this.renderCategory}
        onSnapToItem={this.onViewItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.6}
        enableMomentum={false}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid
        removeClippedSubviews={false}
      />
    )
  }
}

const mapStateToProps = ({ categories, tags }) => {
  const data = [
    { id: null, name: Languages.allCategory, slug: 'all' },
    ...categories.list,
  ]

  return {
    list: data,
    selectedCategory: categories.selectedCategory,
    selectedTag: tags.selectedTag,
  }
}
export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  setActiveCategory,
})(CategoryBanner)
