/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width, height } = Dimensions.get('window')
const vw = width / 100

export default StyleSheet.create({
  bannerView: {
    width,
    backgroundColor: '#fff',
    height: Constants.Window.headerHeight,
    marginTop: 10,
  },
  banner: {
    height: height / 2,
    width,
    backgroundColor: '#ccc',
  },
  paging: {
    top: -height * 11 / 100,
    right: 10,
  },
  bannerImage: {
    width,
    height: Constants.Window.headerHeight,
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 15,
    height: 2,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },
  bannerText: {
    position: 'absolute',
    bottom: 0,
    height: 30 * height / 100,
  },
  bannerGradient: {
    width,
    height: 30 * height / 100,
    alignItems: Constants.RTL ? 'flex-end' : 'flex-start',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 8,
    zIndex: 9999,
  },
  bannerTitle: {
    marginTop: 12,
    marginRight: 12,
    marginBottom: 8,
    marginLeft: 12,
    color: 'white',
    fontSize: 20,
    textAlign: Constants.RTL ? 'right' : 'left',
    backgroundColor: 'transparent',
  },
  bannerDate: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 16,
    textAlign: Constants.RTL ? 'right' : 'left',
    width: width - vw * 5,
  },
  fixHeart: {
    position: Platform.OS !== 'android' ? 'absolute' : 'relative',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  bannerWrapper: {},
})
