import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  backgroundColor:{
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex:1,
    justifyContent:'flex-end'
  },
  content:{
    marginHorizontal: 15,
    marginBottom: 10
  },
  wrapper:{
    alignItems:'flex-start',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 10
  },
  btnCancel:{
    height: 50,
    backgroundColor:'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontSize: 15,
    color: 'blue'
  },

})
