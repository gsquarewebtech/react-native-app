/** @format */

import React, { PureComponent } from 'react'
import { View, Text, Slider, AsyncStorage } from 'react-native'
import Tools from '@common/Tools'
import Constants from '@common/Constants'
import css from './style'

export default class SliderControl extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: this.defaultValue,
      fontSizeMin: Constants.fontText.fontSizeMin,
      fontSizeMax: Constants.fontText.fontSizeMax,
      step: 1,
    }

    Tools.getFontSizePostDetail().then((data) => {
      if (data.toString() == 'NaN') {
        data = Constants.fontText.size
      }

      this.defaultValue = data
      this.setState({
        value: this.defaultValue,
        defaultValue: this.defaultValue,
      })
    })
  }

  completeSliding = () => {
    try {
      AsyncStorage.setItem('@setting_fontSize', this.state.value.toString())
    } catch (error) {
    }
  }

  render() {
    if (typeof this.state.value !== 'undefined') {
      return (
        <View>
          <Text style={css.text}>{this.state.value}</Text>
          <Slider
            minimumValue={this.state.fontSizeMin}
            maximumValue={this.state.fontSizeMax}
            value={this.state.defaultValue}
            onValueChange={(value) => this.setState({ value })}
            onSlidingComplete={this.completeSliding}
            step={this.state.step}
          />
        </View>
      )
    }
    return null
  }
}
