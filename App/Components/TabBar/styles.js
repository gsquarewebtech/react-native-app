/** @format */

import { StyleSheet, Platform } from 'react-native'
import { Color, Device } from '@common'

export default StyleSheet.create({
  tabbar: {
    height: 49,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.tabbar,
  },
  tab: {
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        paddingTop: 0,
      },
      android: {
        justifyContent: 'center',
      },
    }),
  },
})
