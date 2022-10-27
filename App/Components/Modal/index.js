/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Platform, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from '@expo/vector-icons/SimpleLineIcons'
import styles from './styles'

export default class ModalBox extends PureComponent {
  static propTypes = {
    type: PropTypes.any,
    css: PropTypes.any,
    children: PropTypes.any,
  }

  static defaultProps = {
    hideClose: false,
  }

  closeModal = () => {
    this.modal.close()
  }

  closeModalLayout = () => {
    this.modal.close()
  }

  openModal = () => {
    this.modal.open()
  }

  render() {
    const { type, css, hideClose } = this.props
    return (
      <Modal
        backdropPressToClose={!hideClose}
        swipeToClose={!hideClose}
        ref={(modal) => (this.modal = modal)}
        animationDuration={100}
        backdropOpacity={Platform.OS === 'android' ? 0.9 : 0.5}
        position="top"
        style={[
          typeof type !== 'undefined'
            ? styles.modalReadlater
            : styles.modalBoxWrap,
          css,
        ]}
      >
        <View style={styles.wrap}>{this.props.children}</View>

        {!hideClose && (
          <TouchableOpacity style={styles.iconZoom} onPress={this.closeModal}>
            <Icon
              style={styles.textClose}
              name="close"
              size={22}
              color="rgba(0,0,0, 0.4)"
              backgroundColor="transparent"
            />
          </TouchableOpacity>
        )}
      </Modal>
    )
  }
}
