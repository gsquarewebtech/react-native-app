/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlist: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    flex: 1,
    paddingTop: 100,
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
  viewMansory: {
    marginTop: 4,
    marginRight: 0,
    marginBottom: 10,
    marginLeft: 8,
    width: width / 2 - 18,
    borderRadius: 3,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#fcc',
  },
  imageMansory: {
    width: width / 2,
    resizeMode: 'contain',
  },
  cardView: {
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  smDescription: {
    backgroundColor: 'white',
  },
  fixHeart: {
    position: 'absolute',
    top: 10,
    right: 5,
    zIndex: 9999,
  },
  smTitle: {
    marginTop: 6,
    marginRight: 6,
    marginBottom: 20,
    marginLeft: 6,
    fontSize: 18,
    fontWeight: '100',
    color: '#333333',
  },
  listView: {
    paddingTop: 40,
  },
})
