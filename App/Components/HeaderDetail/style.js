/** @format */

import { StyleSheet, Platform, Dimensions } from 'react-native'


export default StyleSheet.create({
  container:{
    height: 50,
    backgroundColor:'black',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal: 10
  },
  backIcon:{
    width: 16,
    height: 16,
    resizeMode:'contain'
  },
  icon:{
    width: 20,
    height: 20,
    resizeMode:'contain'
  }
})
