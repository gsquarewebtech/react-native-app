import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "flatlist": {
        "flex": 1,
        "width": width
    }
});