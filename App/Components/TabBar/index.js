/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Config } from '@common'
import { connect } from 'react-redux'
import { setActiveCategory, initPosts } from '@redux/actions'
import styles from './styles'

class TabBar extends PureComponent {
  onPress = (route, index) => {
    const animateFunc = Config.tabBarAnimate
    this.refs[`tabItem${index}`][animateFunc](600)
    // this.props.jumpToIndex(index)
    this.props.jumpTo(route.key)

    // this is important to reset the list and trigger function when click home menu
    if (index === 0) {
      this.props.setActiveCategory()
      // this.props.initPosts()
    }
  }

  render() {
    const {
      navigation,
      renderIcon,
      activeTintColor,
      inactiveTintColor,
    } = this.props

    const { routes } = navigation.state

    const hiddenMenu = ['customPage', 'setting', 'postDetail', 'postNews', 'postNewsContent']

    return (
      <View style={styles.tabbar}>
        {routes &&
          routes.map((route, index) => {
            const focused = index === navigation.state.index
            const tintColor = focused ? activeTintColor : inactiveTintColor

            console.warn(route.key)
            if (hiddenMenu.indexOf(route.key) > -1) {
              return <View key={route.key} />
            }
            return (
              <TouchableWithoutFeedback
                key={route.key}
                onPress={() => this.onPress(route, index)}
              >
                <Animatable.View ref={`tabItem${index}`} style={styles.tab}>
                  {renderIcon({
                    route,
                    index,
                    focused,
                    tintColor,
                  })}
                </Animatable.View>
              </TouchableWithoutFeedback>
            )
          })}
      </View>
    )
  }
}

TabBar.propTypes = {
  setActiveCategory: PropTypes.func,
  navigation: PropTypes.object,
  renderIcon: PropTypes.any,
  activeTintColor: PropTypes.string,
  inactiveTintColor: PropTypes.string,
  jumpTo: PropTypes.func,
}

export default connect(null, { setActiveCategory, initPosts })(TabBar)
