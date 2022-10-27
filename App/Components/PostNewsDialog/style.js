/** @format */

import { StyleSheet } from 'react-native'
import { AppConfig } from '@common'

export default StyleSheet.create({
  container: {

  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: 'black',
    textAlign: 'center',
    marginVertical: 40
  },
  row: {
    height: 45,
    borderTopWidth: 0.5,
    borderColor: "#E6ECEE",
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    color: AppConfig.MainColor,
    textAlign: 'center'
  },
  separator: {
    height: 45,
    width: 0.5,
    backgroundColor: '#E6ECEE',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginVertical: 20,
    alignSelf: 'center'
  },
  success: {
    marginBottom: 20
  },
  message: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 40
  },
})
