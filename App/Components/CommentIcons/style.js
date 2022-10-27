import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "shareIcon": {
    "flexDirection": "row",
    "justifyContent": "flex-end",
    "position": "absolute",
    "width": Platform.OS === 'android' ? width / 2 - 70 : width / 2 - 90,
    "right": 10,
    "bottom": -30,
    "zIndex": 9999
  },
  "newsIcons": {
    padding: 6
  },
  "newsIconsOpacity": {
    padding: 6,
    opacity: 0.8
  },
  "iconText": {
    "marginLeft": -6,
    "fontSize": 13,
    "fontWeight": "500"
  },
  backButton: {
    "position": "absolute",
    left: 8,
    top: 2,
  }
});