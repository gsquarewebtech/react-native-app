/** @format */

import React, { PureComponent } from 'react'
import {View, Modal} from 'react-native';
import styles from './style'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

class ProcessModal extends PureComponent {

  static defaultProps = {
    progress: 0
  }

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
    let {progress} = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.hide}>
          <View style={styles.background}>
              <ProgressBarAnimated
                width={250}
                maxValue={100}
                value={progress*100}
                backgroundColorOnComplete="#6CC644"/>
          </View>
      </Modal>
    )
  }
}

export default ProcessModal
