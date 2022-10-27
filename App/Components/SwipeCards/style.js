/** @format */

import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const vh = height / 100

export default StyleSheet.create({
  body: {
    bottom: 30,
    height: height - 100,
  },
  image: {
    width,
    height: height - 100,
    position: 'absolute',
  },
  card: {
    position: 'absolute',
    bottom: 16,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 3,
    height: vh * 19,
    width: width - 20,
  },
  cardView: {
    height: height - 110,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 24,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  author: {
    color: '#999',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  iconShare: {
    left: 8,
    flexDirection: 'row-reverse',
    position: 'absolute',
    bottom: 2,
  },
})
