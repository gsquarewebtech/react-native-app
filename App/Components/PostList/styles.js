/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noPost: {
	  justifyContent:'center',
	  width: '100%'
  },
  noPostText: {
	color: '#333333',
	textAlign: "center" 
  },
  flatlist: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginTop: 30,
  },
  more: {
    width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  spinView: {
    width,
    backgroundColor: '#fff',
    flex: 1,
    height,
    paddingTop: 20,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 0,
    height: 40,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 40,
  },
  title: {
    color: '#333333',
  },
  row: {
    height: 300,
    width: null,
    marginBottom: 1,
    padding: 16,
    backgroundColor: 'transparent',
  },
  rowText: {
    color: 'white',
    fontSize: 18,
  },
})
