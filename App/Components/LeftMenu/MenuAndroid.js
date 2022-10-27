/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DrawerLayoutAndroid } from 'react-native'
import { Events } from '@common'
import { Modal } from '@components'
import SideMenu from './SideMenu'

export default class MenuAndroid extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
    routes: PropTypes.any,
  }

  componentDidMount() {
    this.sideMenuClick = Events.onOpenLeftMenu(this.openSideMenu.bind(this))
    this.sideMenuClose = Events.onCloseLeftMenu(this.closeSideMenu.bind(this))
  }

  componentWillUnmount() {
    // Remove drawer event
    this.sideMenuClick.remove()
    this.sideMenuClose.remove()
  }

  closeSideMenu = () => {
    if (typeof this.drawer !== 'undefined') {
      this.drawer.closeDrawer()
    }
  }

  openSideMenu = () => {
    typeof this.drawer !== 'undefined' && this.drawer.openDrawer()
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        ref={(_drawer) => (this.drawer = _drawer)}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => (
          <SideMenu goToScreen={this.props.goToScreen} />
        )}
      >
        {this.props.routes}
        <Modal.Tag />
        <Modal.Layout />
        <Modal.Category />
        <Modal.User />
      </DrawerLayoutAndroid>
    )
  }
}
