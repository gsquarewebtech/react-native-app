/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  panel: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    position: 'relative',
    width: width / 3 - 10,
    height: width / 3 + 20,
    borderRadius: 3,
  },
  name: {
    fontSize: 15,
    color: '#333',
    fontWeight: '400',
    width: width / 3 - 10,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    fontFamily:
      Platform.OS !== 'android'
        ? Constants.fontHeader
        : Constants.fontHeaderAndroid,
    textAlign:'left',
  },
  time: {
    marginLeft: 8,
    marginRight: 8,
    color: '#999',
    fontSize: 10,
    marginTop: 4,
    fontFamily:
      Platform.OS !== 'android'
        ? Constants.fontFamily
        : Constants.fontHeaderAndroid,
    textAlign: 'left',
   alignSelf: 'flex-start'
  },
  heart: {
    position: 'absolute',
    zIndex: 9999,
    top: 1,
    right: 0,
  },

  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginRight: 18,
    marginBottom: 10,
    marginLeft: 22,
    zIndex: 9999,
    width: 24,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    left: width / 2 - 40,
    zIndex: 999,
    width: 50,
    height: 50,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    borderRadius: 40,
  },
})
