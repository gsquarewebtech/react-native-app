/** @format */

import { StyleSheet } from 'react-native'
import { AppConfig } from '@common'

export default StyleSheet.create({
  container: {

  },
  button: {
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: AppConfig.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 5
  },
  value: {
    color: AppConfig.MainColor,
    fontSize: 14,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,
    paddingBottom: 10
  },
  title: {
    fontSize: 13,
    color: 'rgba(191, 192, 192, 1)',
    textAlign: 'center',
    marginVertical: 10
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(191, 192, 192, 1)',
    marginBottom: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10
  },
  text: {
    fontSize: 16,
    color: 'rgba(191, 192, 192, 1)'
  },
  selected: {
    backgroundColor: '#E6ECEE'
  },
  selectedIcon: {
    tintColor: AppConfig.MainColor
  },
  selectedText: {
    color: AppConfig.MainColor
  }
})
