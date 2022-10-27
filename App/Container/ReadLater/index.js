/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import Icons from '@navigation/Icons'
import { BookMark } from '@container'
import { Languages } from '@common'
import styles from './styles'

export default class ReadLater extends PureComponent {
  static propTypes = {
    onViewPost: PropTypes.func,
  }

  render() {
    const { onViewPost } = this.props

    const renderToolbar = () => (
      <View style={styles.toolbar}>
        {Icons.Home()}
        <Text style={styles.textTop}>{Languages.textBookMark}</Text>
        {Icons.User()}
      </View>
    )

    return (
      <View style={styles.body}>
        {renderToolbar()}
        <BookMark onViewPost={onViewPost} />
      </View>
    )
  }
}
