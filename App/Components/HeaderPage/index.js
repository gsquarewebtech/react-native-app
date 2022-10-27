/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native'
import { Constants, Config, Images, Languages } from '@common'
import styles from './style'
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

class Header extends PureComponent {
  static defaultProps = {
    scrollY: new Animated.Value(0),
    hideRightButton: true
  }

  render() {
    let {onBack, title, subTitle, style, scrollY, hideRightButton, rightIcon, onRightPress, rightTitle} = this.props

    const marginTopTitle = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [70, 10],
      extrapolate: 'clamp',
    });

    const marginLeftTitle = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 30],
      extrapolate: 'clamp',
    });

    const topButton = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [30, 10],
      extrapolate: 'clamp',
    });

    const marginTopSubtitle = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [10, 0],
      extrapolate: 'clamp',
    });

    const marginLeftSubtitle = scrollY.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 30],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.content, style]}>
        <AnimatedTouchableOpacity style={[styles.btnBack, {top: topButton}]} onPress={onBack}>
          <Image source={Constants.RTL ? Images.RTLBackIcon : Images.BackIcon} style={styles.backIcon}/>
        </AnimatedTouchableOpacity>
        <Animated.Text style={[styles.largeTitle, subTitle == undefined && {marginBottom: 10},{marginTop: marginTopTitle, marginLeft: marginLeftTitle}]}>{title}</Animated.Text>
        {subTitle != undefined && <Animated.Text style={[styles.subTitle, {marginLeft: marginLeftSubtitle, marginTop: marginTopSubtitle}]}>{subTitle}</Animated.Text>}

        {!hideRightButton && (
          <AnimatedTouchableOpacity style={[styles.rightButton, {top: topButton}]} onPress={onRightPress}>
            {rightIcon != undefined && <Image source={rightIcon} style={styles.icon}/>}
            {rightTitle != undefined && <Text style={styles.rightTitle}>{rightTitle}</Text>}
          </AnimatedTouchableOpacity>
        )}

      </Animated.View>
    )
  }

}

export default Header
