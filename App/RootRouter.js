/** @format */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  I18nManager,
} from 'react-native'
import MainNavigator from '@navigation'
import { Events, Style, Constants, Config, Device } from '@common'

import MenuScale from '@components/LeftMenu/MenuScale'
import MenuOverlay from '@components/LeftMenu/MenuOverlay'
import MenuSmall from '@components/LeftMenu/MenuSmall'
import MenuWide from '@components/LeftMenu/MenuWide'
import MenuAndroid from '@components/LeftMenu/MenuAndroid'

import { AppIntro } from '@components'

// not support from v.3.8.4 due to some latest update from google play service
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

import OneSignal from 'react-native-onesignal'

import { connect } from 'react-redux'
import { setInitialNotification, fetchPostById, saveDeviceToken } from '@redux/actions'

// const tracker = new GoogleAnalyticsTracker(Config.Google.analyticId)

// gets the current screen from navigation state
// function getCurrentRouteName(navigationState) {
//   if (!navigationState) {
//     return null
//   }
//   const route = navigationState.routes[navigationState.index]

//   !Device.isIphoneX && StatusBar.setHidden(true)

//   // dive into nested navigators
//   if (route.routes) {
//     return getCurrentRouteName(route)
//   }
//   return route.routeName
// }

class RootRouter extends Component {
  static propTypes = {
    setInitialNotification: PropTypes.func,
    fetchPostById: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { menuStyle: 0 }

    !Device.isIphoneX && StatusBar.setHidden(true)
    I18nManager.forceRTL(Constants.RTL)
    // Set Default Language for App
    // Languages.setLanguage(Config.Language);
  }

  componentWillMount() {
    // manifestPlaceholders = [onesignal_app_id: "85cbc2b5-4e0d-4214-9653-8054d06f4256",
    //                                     onesignal_google_project_number: "REMOTE"]

    OneSignal.init(Config.OneSignal.appId,{kOSSettingsKeyAutoPrompt : true})
    OneSignal.addEventListener('received', this.onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)

    OneSignal.inFocusDisplaying(2)
  }

  componentDidMount() {
    Events.appChangeMenuStyle(this.changeMenuStyle)

    const { isLoggedIn } = this.props
    if (!isLoggedIn && Config.RequiredLogin) {
      Events.openUserModal()
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification)
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body)
    console.log('Data: ', openResult.notification.payload.additionalData)
    console.log('isActive: ', openResult.notification.isAppInFocus)
    console.log('openResult: ', openResult)

    // handle data when click notification banner
    this.handleDeepLink(openResult)
  }

  onRegistered = (notifData) => {
    console.log('Device had been registered for push notifications!', notifData)
  }

  onIds = (device) => {
    
    console.log('Device info: ', device)
    const data	=	{ save_token: true, token: device.userId }
    this.props.saveDeviceToken(data);
    //~ OneSignal.removeExternalUserId((results) => {
		 //~ alert('Results of removing external user id');
	//~ console.log(results);
	//~ })
    //~ OneSignal.setExternalUserId('7777888', (results) => {
	  
	  //~ alert('Results of setting external user id');
	  //~ console.log(results);
	//~ })
  }

  changeMenuStyle = (data) => {
    this.setState({ menuStyle: data.menuId })
  }

  handleDeepLink = (openResult) => {
    const data = openResult.notification.payload.additionalData
    this.props.setInitialNotification(openResult)
    if (data && data.id) {
      this.props.fetchPostById(data.id).then((post) => {
        this.goToScreen('post', { post })
      })
    } else if (data && data.type =='Stream') {
      this.goToScreen('Stream', { userName:'Guest' })
    } else {
      console.log('notification is invalid data')
    }
  }

  goToScreen = (routeName, params, isReset = true) => {
    const { navigator } = this.refs
    navigator.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })

    //
    // if (isReset) {
    //   const resetAction = NavigationActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({routeName, params})]
    //   });
    //   navigator.dispatch(resetAction);
    // } else {
    //   navigator.dispatch({type: 'Navigation/NAVIGATE', routeName: routeName, params});
    // }
    // this.closeSideMenu();
  }

  renderContent = () => {
    const { isLoggedIn } = this.props
    return (
      <SafeAreaView style={Style.container}>
        <View style={Style.app}>
          {Device.isIphoneX && (
            <StatusBar backgroundColor="white" barStyle="dark-content" />
          )}
          {(isLoggedIn || !Config.RequiredLogin) && (
            <MainNavigator
              ref="navigator"
              // onNavigationStateChange={(prevState, currentState) => {
              //   const currentScreen = getCurrentRouteName(currentState)
              //   const prevScreen = getCurrentRouteName(prevState)
              //
              //   if (prevScreen !== currentScreen) {
              //     // the line below uses the Google Analytics tracker
              //     // change the tracker here to use other Mobile analytics SDK.
              //
              //     // tracker.trackScreenView(currentScreen)
              //   }
              // }}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }

  render() {
    const { small, wide, overlay } = Constants.LeftMenu

    if (this.props.isFinishedIntro == false && Config.showAppIntro) {
      return <AppIntro />
    }

    if (Platform.OS === 'android') {
      return (
        <MenuAndroid
          ref="menuDefault"
          goToScreen={this.goToScreen}
          routes={this.renderContent()}
        />
      )
    }

    switch (Config.LeftMenuStyle) {
      case small:
        return (
          <MenuSmall
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      case wide:
        return (
          <MenuWide
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      case overlay:
        return (
          <MenuOverlay
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
      default:
        return (
          <MenuScale
            ref="menuDefault"
            goToScreen={this.goToScreen}
            routes={this.renderContent()}
          />
        )
    }
  }
}

RootRouter.defaultProps = {
  isFinishedIntro: false,
}

const mapStateToProps = ({ user }, ownProps) => {
  return {
    isFinishedIntro: user.isFinishedIntro,
    isLoggedIn: user && user.data,
  }
}

export default connect(
  mapStateToProps,
  { setInitialNotification, saveDeviceToken, fetchPostById }
)(RootRouter)
