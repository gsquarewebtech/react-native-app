import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems:'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  icon:{
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: 'black',
    alignSelf:"flex-start" ,
  },
  text:{
    fontSize: 14,
    color:'black',
    alignSelf:"flex-start" ,
    marginLeft: 10
  }
})
