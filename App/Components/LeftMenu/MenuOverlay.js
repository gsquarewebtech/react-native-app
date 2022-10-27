/** @format */

import React, { Component } from 'react'
import Drawer from '@custom/react-native-drawer'
import { Events } from '@common'
import { Modal } from '@components'
import SideMenu from './SideMenu'
import css from './style'

export default class MenuOverlay extends Component {
  componentDidMount() {
    this.sideMenuClick = Events.onOpenLeftMenu(this.openSideMenu.bind(this))
    this.sideMenuClose = Events.onCloseLeftMenu(this.closeSideMenu.bind(this))
  }

  componentWillUnmount() {
    // Remove drawer event
    this.sideMenuClick.remove()
    this.sideMenuClose.remove()
  }

  closeSideMenu() {
    if (typeof this.refs.drawer !== 'undefined') {
      this.refs.drawer.close()
    }
  }

  openSideMenu() {
    typeof this.refs.drawer !== 'undefined' && this.refs.drawer.open()
  }

  render() {
    const drawerStyles = {
      drawer: { backgroundColor: 'rgba(37, 149, 242, 0.5)' },
    }
    return (
      <Drawer
        ref="drawer"
        type="overlay"
        tapToClose
        panCloseMask={0.2}
        openDrawerOffset={0.2}
        styles={drawerStyles}
        content={
          <SideMenu
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff' }}
            rowStyle={{ borderTopWidth: 0 }}
            menuBody={css.menuOverlay}
          />
        }
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
