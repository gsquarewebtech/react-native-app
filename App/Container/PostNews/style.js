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
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  selectImage:{
    marginTop: 20
  },
  postHeading:{
    marginTop: 15,
    marginBottom: 20
  }
})
