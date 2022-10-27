/** @format */

import React, { PureComponent } from 'react'
import {View, Modal, TouchableWithoutFeedback,} from 'react-native';
import styles from './style'
import TextInputComment from './Input'

class InputComment extends PureComponent {
  state = {
    isVisible: false
  }

  hide = ()=>{
    this.setState({isVisible: false})
  }

  show = ()=>{
    this.setState({isVisible: true})
  }

  render() {
    
    return (
      <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={this.hide}>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.backgroundColor} keyboardShouldPersistTaps={'handled'}>
              <TextInputComment post={this.props.post} onHide={this.finishPost}/>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    )
  }

  finishPost = ()=>{
    this.hide()
    this.props.reloadComments()
  }
}

export default InputComment
