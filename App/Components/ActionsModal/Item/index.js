/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { Constants, Config, Images, Languages, Tools } from '@common'
import styles from './style'

class Item extends PureComponent {

  render() {
    let {icon,text,onPress} = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={icon} style={styles.icon}/>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default Item
