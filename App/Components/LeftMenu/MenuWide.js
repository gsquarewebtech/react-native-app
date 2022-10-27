/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@custom/react-native-drawer'
import { Events } from '@common'
import { Modal } from '@components'
import SideMenu from './SideMenuBackGround'
import css from './style'

export default class MenuWide extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
    routes: PropTypes.any,
  }

  componentDidMount() {
    this.sideMenuClick = Events.onOpenLeftMenu(this.openSideMenu)
    this.sideMenuClose = Events.onCloseLeftMenu(this.closeSideMenu)
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
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose
        captureGestures
        panCloseMask={0.2}
        panThreshold={0.2}
        openDrawerOffset={0.2}
        content={
          <SideMenu
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff', backgroundColor: 'transparent' }}
            rowStyle={css.menuRowWide}
            iconStyle={css.iconWide}
            menuBody={css.menuColorWide}
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
