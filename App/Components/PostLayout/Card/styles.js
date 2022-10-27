/** @format */

import { Platform, StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  panelOne: {
    flex: 1,
    width,
    marginBottom: 10,
  },
  imagePanelOne: {
    marginTop: 6,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 8,
    width: width - 24,
    height: width / 2,
  },
  nameOne: {
    fontSize: 22,
    color: '#333',
    width: width - 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    textAlign: 'left',
    fontFamily:
      Platform.OS !== 'android'
        ? Constants.fontHeader
        : Constants.fontHeaderAndroid,
  },
  timeOne: {
    marginBottom: 10,
    marginTop: 4,
    marginLeft: 12,
    marginRight: 12,
    color: '#999',
    fontSize: 12,
    textAlign: 'left',
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  floatTitle: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    width: width - 30,
    backgroundColor: 'transparent',
    color: '#fff',
  },

  linearGradient: {
    height: 120,
    marginTop: -120,
    width: width - 24,
    marginLeft: 12,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },

  iconPlay: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    marginTop: 12,
    marginRight: 18,
    marginBottom: 10,
    marginLeft: 26,
    zIndex: 9999,
    width: 28,
  },
  iconVideo: {
    alignItems: 'center',
    justifyContent: 'center',
    top: width / 5 - 10,
    left: width / 2 - 30,
    zIndex: 999,
    width: 60,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, 0.3)',
    height: 60,
    borderRadius: 40,
  },
})
