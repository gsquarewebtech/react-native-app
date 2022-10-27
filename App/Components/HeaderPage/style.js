/** @format */

import { StyleSheet } from 'react-native'
import { AppConfig } from '@common'

export default StyleSheet.create({
  content: {
    paddingHorizontal: 20
  },
  backIcon: {
    width: 15,
    height: 13,
    resizeMode: 'contain',
    margin: 10
  },
  btnBack: {
    position: 'absolute',
    top: 30,
    left: 10
  },
  largeTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'left'
  },
  subTitle: {
    marginTop: 10,
    color: 'rgba(175,176,175,1)',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left'
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  rightButton: {
    position: 'absolute',
    top: 30,
    right: 20
  },
  rightTitle: {
    fontSize: 16,
    color: AppConfig.MainColor
  }
})
