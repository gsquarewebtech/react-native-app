/** @format */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Constants, Color } from '@common'
import { connect } from 'react-redux'
import { changeLayout } from '@redux/actions'
import styles from './styles'

export default class Item extends PureComponent {
  static propTypes = {
    changeLayout: PropTypes.func,
    close: PropTypes.func,
    posts: PropTypes.array,
    layout: PropTypes.any,
    image: PropTypes.any,
    text: PropTypes.string,
  }

  changeLayout = (layout) => {
    this.props.changeLayout(layout)
    this.props.close()
  }

  render() {
    const { posts, layout, image, text } = this.props

    let postLayout = posts.layout
    if (typeof postLayout === 'undefined') {
      postLayout = Constants.Layout.horizontal
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.rowView}
        onPress={() => this.changeLayout(layout)}
      >
        <View style={[styles.row, postLayout === layout && styles.rowActive]}>
          <Image
            source={image}
            style={[
              styles.imageIcon,
              postLayout === layout && { tintColor: Color.toolbarTint },
            ]}
          />
          <Text
            style={[
              styles.text,
              postLayout === layout && styles.imageIconActive,
            ]}
          >
            {' '}
            {text}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
const mapStateToProps = ({ posts }) => ({ posts })
module.exports = connect(mapStateToProps, { changeLayout })(Item)
