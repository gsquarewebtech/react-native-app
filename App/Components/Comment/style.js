/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants } from '@common'

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh)

export default StyleSheet.create({
  wrapComment: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 10,
    backgroundColor: '#F7F7F7',
    flex: 2 / 6,
  },
  headCommentText: {
    fontSize: 15,
    color: Color.title,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'left'
  },
  sendView: {
    marginTop: 8,
    backgroundColor: '#5DCDAD',
    alignItems: 'center',
    borderRadius: 3,
    overflow: 'hidden',
    flex: 1
  },
  sendButton: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginRight: 12,
    position: 'absolute',
    marginLeft: width / 2 - 80,
    width: 100,
    top: 2,
    zIndex: 999,
    backgroundColor: 'transparent',
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
  },
  inputCommentWrap: {
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 80,
    backgroundColor: '#fff',
  },
  inputCommentText: {
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
    flex: 1,
    borderWidth: 0,
    fontSize: 15,
    color: Color.text,
    textAlign: 'left'
  },
  wrapListComment: {
    marginTop: 10,
  },
  html: {
    marginLeft: 12,
    marginRight: 12,
  },
  itemComment: {
    flex: 1,
  },
  itemHeadComment: {
    flexDirection: 'row',
  },
  avatarComment: {
    width: 40,
    height: 40,
  },
  authorName: {
    fontWeight: '400',
    fontSize: 14,
    marginTop: 2,
    marginLeft: 6,
    color: Color.title,
  },
  timeAgoText: {
    color: Color.time,
    fontSize: 12,
    marginLeft: 6,
    marginTop: 1,
  },
  commentHTML: {
    marginTop: 4,
    marginBottom: 8,
  },
})
