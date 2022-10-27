/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, RefreshControl, Animated } from 'react-native'
import { HorizonList, AnimatedHeader } from '@components'
import { Images, Config, AppConfig } from '@common'
import Icons from '@navigation/Icons'
import styles from './styles'

class Horizontal extends PureComponent {
  static propTypes = {
    fetchPostsByTag: PropTypes.func,
    onShowAll: PropTypes.func,
    onViewPost: PropTypes.func,
    goBack: PropTypes.func,
  }

  state = { scrollY: new Animated.Value(0), refreshing: false }

  onRefresh = () => {
    this.setState({ refreshing: true })
    AppConfig.HorizonLayout.map((config, index) => {
      this.props.fetchPostsByTag(1, config.tags, config.categories, index)
    })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 600)
  }

  render() {
    const { onShowAll, onViewPost, goBack } = this.props
    return (
      <View style={styles.body}>
        <AnimatedHeader
          image={Images.logo}
          right={Config.showLayoutButton && Icons.Layer()}
          scrollY={this.state.scrollY}
        />

        <Animated.ScrollView
          contentContainerStyle={styles.scrollView}
          scrollEventThrottle={1}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          {AppConfig.HorizonLayout.map((config, index) => (
            <HorizonList
              horizontal
              key={`hlist-${index}`}
              config={config}
              index={index}
              onBack={() => goBack()}
              onShowAll={onShowAll}
              onViewPost={onViewPost}
            />
          ))}
        </Animated.ScrollView>
      </View>
    )
  }
}

export default Horizontal
