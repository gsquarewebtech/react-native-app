import React from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native'
import styles from './style'
import { Images } from '@common'
import Indicator from './Indicator'

class HeaderDetail extends React.Component {
  render() {
    let { onBack, onMore, parentPosts, scrollX } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }} onPress={onBack}>
          <Image source={Images.WhiteBackIcon} style={styles.backIcon} />
        </TouchableOpacity>
        {Platform.OS == "ios" && <Indicator items={parentPosts} scrollX={scrollX} />}
        < TouchableOpacity style={styles.button} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }} onPress={onMore}>
          <Image source={Images.WhiteMoreIcon} style={styles.icon} />
        </TouchableOpacity>
      </View >
    )
  }
}

export default HeaderDetail
