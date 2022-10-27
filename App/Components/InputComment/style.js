import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  backgroundColor:{
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex:1,
    justifyContent:'flex-end'
  },
  content:{
    flexDirection:'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor:'white'
  },
  input:{
    height: 30,
    padding: 0,
    marginRight: 10,
    flex:1
  },
  add:{
    fontSize: 12,
    color: 'black'
  },
  btnAdd:{
    paddingVertical: 3,
    paddingHorizontal:10,
    backgroundColor: 'rgba(230,236,238,1)',
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  }
})
