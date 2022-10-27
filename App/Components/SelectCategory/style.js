import { StyleSheet, Platform } from 'react-native'
import { AppConfig } from '@common'

export default StyleSheet.create({
  container: {

  },
    title:{
    fontSize: 18,
    color: '#282828',
    marginBottom: 10
  },
  wrapper: {
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: AppConfig.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  name: {
    flex: 1,
    fontSize: 14,
    color: '#282828',
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 10
  },
  required: {
    borderColor: 'red',
  }
})
