/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Drawer from '@custom/react-native-drawer'
import { Events } from '@common'
import { Modal } from '@components'
import SideMenu from './SideMenuIcons'
import css from './style'

export default class MenuSmall extends PureComponent {
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
        tweenHandler={Drawer.tweenPresets.parallax}
        tapToClose
        backgroundColor="#34BC99"
        captureGestures
        panCloseMask={0.7}
        panThreshold={0.7}
        openDrawerOffset={0.7}
        content={
          <SideMenu
            goToScreen={this.props.goToScreen}
            textColor={{ color: '#fff' }}
            menuBody={css.menuColor}
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
