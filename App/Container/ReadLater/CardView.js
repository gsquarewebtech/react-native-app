/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View, Platform } from 'react-native'
import Toolbar from '@components/Toolbar'
import Carousel from 'react-native-snap-carousel'
import css from './styles'
import Card from './Card'

const { width } = Dimensions.get('window')
const vw = width / 100

export default class CardView extends PureComponent {
  static propTypes = {
    data: PropTypes.any,
  }

  renderCard = (post, index) => {
    if (post != null) {
      return <Card post={post} />
    }
    return null
  }

  render() {
    return (
      <View
        style={Platform.OS === 'android' ? css.bodyCardAndroid : css.bodyCard}
      >
        <Toolbar name="Read later" cardButton userButton />
        <Carousel
          ref="carousel"
          items={this.props.data}
          renderItem={this.renderCard}
          sliderWidth={vw * 75}
          itemWidth={vw * 86}
          slideStyle={css.slide}
        />
      </View>
    )
  }
}
