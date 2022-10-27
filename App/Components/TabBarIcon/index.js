/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
  },
})

const TabBarIcon = ({ icon, tintColor, css }) => {
  return (
    <Image
      source={{ uri: icon }}
      style={[styles.icon, { tintColor }, css]}
    />
  )
}

TabBarIcon.propTypes = {
  icon: PropTypes.string,
  tintColor: PropTypes.string,
  css: PropTypes.any,
}

export default TabBarIcon
