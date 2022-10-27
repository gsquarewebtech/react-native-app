/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 45,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily:
      Platform.OS != 'android'
        ? Constants.fontHeader
        : Constants.fontHeaderAndroid,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 6,
    marginLeft: 12,
  },
  headerIcons: {
    width: 20,
    height: 18,
    resizeMode: 'contain',
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    opacity: 0.4,
  },
})
