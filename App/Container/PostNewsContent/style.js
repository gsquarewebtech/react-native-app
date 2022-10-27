/** @format */

import { StyleSheet, Dimensions } from 'react-native'
import Color from '@common/Color'
const { width, height } = Dimensions.get('window')
const vh = height / 100

export default StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white',
  },
  content:{
    marginHorizontal: 20,
    flex:1,
  },
  input:{
    ...StyleSheet.absoluteFillObject,
    fontSize: 16,
    padding: 0,
    textAlignVertical:'top',
        color: '#282828'
  }
})
