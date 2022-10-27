import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container:{
  },
  title:{
    fontSize: 18,
    color: '#282828',
    marginBottom: 10
  },
  imgWrap:{
    height: 250,
    borderRadius: 5,
    backgroundColor: '#E6ECEE',
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    width: 80,
    height: 80,
    resizeMode: 'contain'
  },
  image:{
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5
  },
  required:{
    borderWidth: 0.5,
    borderColor: 'red'
  }
})
