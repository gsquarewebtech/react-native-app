/** @format */

import React, { PureComponent } from 'react'
import {View, Text, TextInput} from 'react-native'
import { Languages } from '@common'
import styles from './style'

class PostHeading extends PureComponent {

  render() {
    let {onChangeText, style, required} = this.props
    return (
      <View style={[styles.container, style, required && styles.required]}>
        <Text style={styles.title}>{Languages.postHeading}</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={onChangeText} />
      </View>

    )
  }
}

export default PostHeading
