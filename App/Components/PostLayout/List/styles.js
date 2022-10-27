/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import { Constants } from '@common'

const { width } = Dimensions.get('window')
const vw = width / 100

export default StyleSheet.create({
  panel: {
    backgroundColor: '#FFF',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  content: {
    width: vw * 63,
    marginLeft: vw * 2,
  },
  title: {
    fontSize: 16,
    marginLeft: 4,
    marginTop: 12,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
    textAlign: 'left'
  },
  description: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 10,
    marginRight: 8,
    color: '#333',
    fontWeight: '300',
    textAlign: 'left'
  },

  time: {
    color: '#999',
    fontSize: 11,
    marginBottom: 10,
    marginLeft: 4,
    marginTop: 6,
    backgroundColor: 'transparent',
  },

  category: {
    fontSize: 11,
    marginTop: 6,
    color: '#999',
  },

  image: {
    marginLeft: vw * 2,
    marginRight: vw * 2,
    marginTop: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 31,
    height: vw * 25,
    // resizeMode: 'cover',
    borderRadius: 2,
  },
  heart: {
    position: 'absolute',
    zIndex: 9999,
    top: 1,
    right: 0,
  },

  panelList: {
    backgroundColor: '#FFF',
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  imageList: {
    marginTop: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: vw * 30,
    height: vw * 30 - 20,
    // resizeMode: 'cover',
    borderRadius: 2,
  },
  titleList: {
    width: vw * 65,
    marginTop: 4,
  },
  nameList: {
    fontSize: 16,
    marginLeft: 2,
    marginTop: 6,
    marginRight: 8,
    color: '#333',
    fontWeight: '400',
    textAlign: 'left'
  },
  descriptionList: {
    fontSize: 12,
    marginLeft: 4,
    marginTop: 10,
    marginRight: 8,
    color: '#333',
    fontWeight: '300',
    textAlign: 'left',
  },
  timeList: {
    color: '#999',
    fontSize: 11,
    marginLeft: 4,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
})
