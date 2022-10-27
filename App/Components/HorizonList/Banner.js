/** @format */

import React, { PureComponent } from 'react'
import { Dimensions, View } from 'react-native'
import { PostLayout } from '@components'
import styles from './styles'

import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window')

class Banner extends PureComponent {

  render() {
    const { list, config, onViewPost } = this.props
    const { layout, textColor } = config

    return (
      <Swiper
        height={width / 2 + 30}
        paginationStyle={styles.paginationStyle}
        showsButtons={false}
        autoplay
        activeDotStyle={styles.activeDotStyle}
        activeDotColor={'#fff'}
        bounces
        dotColor={'rgba(255, 255, 255, 0.3)'}
        dotStyle={styles.dotStyle}>
        {list.slice(0, 5).map((item, index) => (
          <View key={index} style={styles.bannerItem}>
            <PostLayout
              post={item}
              key={`post-${index}`}
              config={config}
              textColor={textColor}
              onViewPost={() => onViewPost(item, index)}
              layout={layout}
            />
          </View>
        ))}
      </Swiper>
    )
  }
}

export default Banner
