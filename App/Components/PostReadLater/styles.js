/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')
const vw = width / 100

export default StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  title: {
    width: vw * 70,
    flex: 1,
  },
  image: {
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 30,
    height: vw * 30 - 20,
    borderRadius: 2,
  },
  name: {
    fontSize: 14,
    marginLeft: Constants.RTL ? 25 : 10,
    marginTop: 12,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
    textAlign: 'left'
  },
  time: {
    marginLeft: Constants.RTL ? 25 : 10,
    marginRight: 8,
    color: '#999',
    fontSize: 11,
    marginBottom: 10,
    marginTop: 6,
    backgroundColor: 'transparent',
    textAlign: 'left'
  },
})
