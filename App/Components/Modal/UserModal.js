/** @format */

import React, { PureComponent } from 'react'
import { LogIn } from '@container'
import { Events, Config } from '@common'
import ModalBox from './index'

export default class UserModal extends PureComponent {
  componentDidMount() {
    this.modalUserClick = Events.onOpenUserModal(this.open.bind(this))
    this.modalUserClose = Events.onCloseUserModal(this.close.bind(this))
  }

  componentWillUnMount() {
    this.modalUserClick.remove()
    // this.modalUserClose.remove();
  }

  open = () => {
    typeof this.refs.modal !== 'undefined' && this.refs.modal.openModal()
  }

  close = () => {
    typeof this.refs.modal !== 'undefined' && this.refs.modal.closeModal()
  }

  render() {
    return (
      <ModalBox ref="modal" type="readlater" hideClose={Config.RequiredLogin} css={{width: '100%', top: 0}}>
        <LogIn />
      </ModalBox>
    )
  }
}
