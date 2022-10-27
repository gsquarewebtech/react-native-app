/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import User from '@services/User'
import { Events, Config, Languages } from '@common'

export default class Base extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { userData: '' }
    this.fetchDataUser()
    Events.onSideMenuRefresh(this.fetchDataUser)

    this.items = [
      {
        label: Languages.news,
        icon: 'home',
        onPress: () => this.goToScreen('home'),
      },
      { label: Languages.contact, icon: 'mail', onPress: this.goToContact },
      { label: Languages.aboutus, icon: 'assignment', onPress: this.goToAbout },
      //~ {
        //~ label: Languages.setting,
        //~ icon: 'settings',
        //~ onPress: () => this.goToScreen('setting'),
      //~ },
      {
        label: Languages.user,
        icon: 'User',
        onPress: () => {
          this.goToScreen('readlater')
          Events.openUserModal()
        },
      },
    ]
  }

  fetchDataUser = () => {
    const self = this
    User.getUser().then((data) => {
      self.setState({
        userData: data,
      })
    })
  }

  goToContact = () => {
    this.goToScreen('customPage', {
      id: Config.CustomPages.contact_id,
      title: Languages.contact,
    })
  }

  goToAbout = () => {
    this.goToScreen('customPage', {
      id: Config.CustomPages.aboutus_id,
      title: Languages.aboutus,
    })
    // you can also use custom page by using
    // this.goToScreen('customPage', {url: 'http://inspireui.com'});
  }

  goToScreen = (routeName, params = {}) => {
    this.props.goToScreen(routeName, params, false)
    Events.closeLeftMenu()
  }

  logout = () => {
    Events.logoutUser()
    this.setState({ userData: undefined })
    Events.closeLeftMenu()
  }

  login() {
    // Actions.login();
  }

  render() {
    return <View />
  }
}
