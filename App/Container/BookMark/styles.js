/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  body: {
    flex: 1,
  },
	noPost: {
	  justifyContent:'center',
	  width: '100%'
  },
  noPostText: {
	color: '#333333',
	textAlign: "center" 
  },
  flatlist: {
    flex: 1,
    width: width,
  },
  topBar: {
    width: width,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  empty: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  emptyView: {
    alignItems: 'flex-start',
  },
})
