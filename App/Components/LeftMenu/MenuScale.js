/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@custom/react-native-drawer'
import { Events, Constants } from '@common'
import { Modal } from '@components'
import SideMenu from './SideMenu'

export default class MenuScale extends PureComponent {
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
    if (typeof this.refs.drawer !== 'undefined') {
      this.refs.drawer.close()
    }
  }

  openSideMenu = () => {
    typeof this.refs.drawer !== 'undefined' && this.refs.drawer.open()
  }

  render() {
    return (
      <Drawer
        ref="drawer"
        type="static"
        side={Constants.RTL ? 'right' : 'left'}
        isScale
        captureGestures
        backgroundColor="#FFFFFF"
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose
        panCloseMask={0.4}
        openDrawerOffset={0.4}
        content={<SideMenu goToScreen={this.props.goToScreen} />}
      >
        {this.props.routes}

        <Modal.Tag />
        <Modal.Layout />
        <Modal.Category />
        <Modal.User />
      </Drawer>
    )
  }
}
