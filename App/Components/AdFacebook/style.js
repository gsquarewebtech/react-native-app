import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "wrap": {
      position: Platform.OS !== 'android' ? 'absolute' : 'relative',
      "bottom" : 0,
      "left" : 0,
      "right" : 0,
      "width" : width,
      "zIndex": 99999,
      "elevation" : 5,
  }
});
