/** @format */

import React, { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

export default StyleSheet.create({
  body: {
    height: 45,
    width: width,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 99999,
  },
})
