import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container:{
    borderTopWidth: 0.5,
    borderColor: 'rgba(191, 192, 192, 1)',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  input:{
    height: 30,
    padding: 0,
    marginHorizontal: 10,
    flex:1
  },
  icon:{
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginVertical: 5,
    marginHorizontal:15
  },
  comment:{
    color: "rgba(191, 192, 192, 1)",
    flex:1,
    marginHorizontal: 10,
    marginTop: 8
  },
  badge:{
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'red',
    position:'absolute',
    top: Platform.OS == "ios" ? -3 : 0,
    right:5
  },
  badgeText:{
    fontSize: 10,
    color: 'white'
  },
  btnNext:{
    flexDirection:'row',
    alignItems:'center',
    marginRight: 10,
    marginLeft: 15
  },
  next:{
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  nextIcon:{
    width: 13,
    height: 13,
    resizeMode:'contain'
  }
})



