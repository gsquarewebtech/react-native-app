/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image, Modal} from 'react-native'
import { Images, Languages } from '@common'
import styles from './style'

class PostNewsDialog extends PureComponent {
  state = {
    modalVisible: false,
  }

  show = ()=>{
    this.setState({modalVisible: true})
  }

  hide = (callback)=>{
    this.setState({modalVisible: false},callback)
  }

  render() {
    let {type} = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.hide}>
          <View style={styles.background}>
              {type == "confirm" && this.renderConfirm()}
              {type == "success" && this.renderSuccess()}
              {type == "error" && this.renderError()}
          </View>
      </Modal>
    )
  }

  renderConfirm = ()=>{
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{this.props.message?this.props.message:Languages.readyToSubmit}</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={()=>this.hide(this.props.onCancel)}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <View style={styles.separator}/>
          <TouchableOpacity style={styles.item} onPress={this.props.onSubmit}>
            <Text style={styles.text}>{Languages.submit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderSuccess = ()=>{
    return (
      <View style={styles.content}>
        <Image source={Images.SuccessIcon} style={styles.icon}/>
        <Text style={[styles.text,styles.success]}>{Languages.successfull}</Text>
      </View>
    )
  }

  renderError = ()=>{
    return (
      <View style={styles.content}>
        <Text style={styles.message}>{this.props.message}</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.item} onPress={()=>this.hide()}>
            <Text style={styles.text}>{Languages.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default PostNewsDialog
