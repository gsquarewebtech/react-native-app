import React, {StyleSheet, Dimensions} from 'react-native'
import {Color, Constants, Styles} from '@common';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  flatlist: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 40,
  },
  more: {
    width: width,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  spinView: {
    width: width,
    backgroundColor: '#fff',
    flex: 1,
    height: height,
    paddingTop: 20
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
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
});