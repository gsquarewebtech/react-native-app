/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
import { Constants } from '@common'

export default StyleSheet.create({
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: Constants.Window.headerHeight,
    position: 'relative',
    resizeMode: 'cover',
  },
  overlayVideo: {
    top: 0,
    left: 0,
    zIndex: 100,
    width,
    height: Constants.Window.headerHeight,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  iconPlay: {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'transparent',
    marginTop: 22,
    marginRight: 18,
    marginBottom: 18,
    marginLeft: 26,
    zIndex: 9999,
    width: 28,
    height: 30,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Constants.Window.headerHeight / 2 - 30,
    left: width / 2 - 30,
    zIndex: 999,
    width: 60,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    height: 60,
    borderRadius: 40,
  },
  textIconVideo: {
    fontSize: 80,
  },
})
