/** @format */

import React, { Component } from 'react'
import { View } from 'react-native'
import Config from '@common/Config'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
import css from './styles'

if (Config.AdMob.visible) {
  AdMobInterstitial.setAdUnitID(Config.AdMob.unitInterstitial)
}

export default class AdMob extends Component {
  componentWillUnmount() {
    if (Config.AdMob.visible) {
      AdMobInterstitial.removeAllListeners()
    }
  }

  componentDidMount() {
    Config.AdMob.isShowInterstital && setTimeout(this.showInterstital, 3000)
  }

  showInterstital() {
    if (Config.AdMob.visible) {
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd())
      // AdMobInterstitial.showAd((error) => error && Alert.alert(error));
      // AdMobInterstitial.requestAd((error) => serror && Alert.alert(error));
    }
  }

  render() {
    return (
      <View style={css.body}>
        <AdMobBanner
          adSize="fullBanner"
          testDeviceIDs={[Config.AdMob.deviceID]}
          adUnitID={Config.AdMob.unitID}
        />
      </View>
    )
  }
}
