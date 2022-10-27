import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  "hlist": {
    "flex": 1
  },
  "body": {
    "backgroundColor": Color.main,
    "flex": 1
  },
  "top": {
    "flexDirection": 'row'
  },
  "topLeft": {
    "alignItems": "flex-start",
    "justifyContent": "center",
    "width": width - vw * 26
  },
  "empty": {
    "color": "#aaa",
    "marginTop": 20,
    "marginRight": 50,
    "marginBottom": 50,
    "marginLeft": 50
  },
  "iconTop": {
    "marginTop": 10,
    "marginLeft": 6
  },
  "textTop": {
    "fontSize": 16,
    "fontWeight": "600",
    "left": Constants.RTL ? width - vw * 30 : 10,
    "marginTop": 4
  },
  "bodyCard": {
    "backgroundColor": Color.main,
    "height": height,
    "paddingTop": 80
  },
  "bodyCardAndroid": {
    "backgroundColor": Color.main,
    "height": height
  },
  "panel": {
    "backgroundColor": "#fff",
    "borderColor": "#eee",
    "borderBottomWidth": 1,
    "flexDirection": 'row'
  },
  "title": {
    "width": vw * 70
  },
  "image": {
    "marginTop": 12,
    "marginLeft": 8,
    "marginRight": 8,
    "marginBottom": 8,
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "width": vw * 30,
    "height": vw * 30 - 20,
    "borderRadius": 2
  },
  "shareIcon": {
    "flexDirection": "row-reverse",
    "position": "absolute",
    "left": 8,
    "bottom": 2
  },
  "name": {
    "fontSize": 14,
    "marginLeft": 8,
    "marginTop": 12,
    "marginRight": 8,
    "color": "#333",
    "fontWeight": "400"
  },
  "time": {
    "marginLeft": 8,
    "marginRight": 8,
    "color": "#999",
    "fontSize": 11,
    "marginBottom": 10,
    "marginTop": 6,
    "backgroundColor": "transparent"
  },
  "topBar": {
    "width": width,
    "height": 30,
    "backgroundColor": Color.toolbarTint,
    "flexDirection": 'row',
    "justifyContent": "flex-end",
    "alignItems": "center",
    "paddingRight": 15,
    "marginTop": 10
  },
  "toolbar": {
    "flexDirection": 'row',
    "justifyContent": "space-between",
    "alignItems": "flex-start",
    "width": width,
    marginTop: 8
  },
  "toolbarMenu": {
    "height": 50,
    "width": width,
    "backgroundColor": Color.toolbar,
    "flexDirection": "row",
    "justifyContent": "space-between",
    "paddingLeft": 15,
    "paddingTop": 13,
    "paddingRight": 15,
    "position": "relative",
    "transform": [{scaleX: Constants.RTL ? -1 : 1}]
  },
  "slide": {
    "width": (vw * 86),
    "marginTop": vh * 4
  },
  "viewShadow": {
    "shadowColor": "#000",
    "shadowOpacity": 0.4,
    "shadowRadius": 8,
    "shadowOffset": {width: 0, height: 2},
    "borderRadius": 3,
    "width": vw * 86,
    "marginLeft": Platform.OS == 'android' ? 20 : vw * 8 - 1,
    "backgroundColor": Platform.OS == 'android' ? '#EEEEEE' : '#FFFFFF'
  },
  "card": {
    "borderRadius": 3,
    "overflow": "hidden"
  },
  "cardImage": {
    "alignItems": "center",
    "justifyContent": "center",
    "position": "relative",
    "width": vw * 86,
    "height": vh * 40,
    "borderRadius": 3
  },
  "cardTitle": {
    "width": vw * 86,
    "paddingTop": 8,
    "paddingRight": 8,
    "paddingBottom": 8,
    "paddingLeft": 8,
    "backgroundColor": "rgba(255, 255, 255, 0.9)",
    "height": vh * 25,
    "marginBottom": 8
  },
  "cardName": {
    "fontSize": 18,
    "fontWeight": "300",
    "marginTop": 8,
    "marginRight": 8,
    "marginBottom": 8,
    "marginLeft": 8
  },
  "cardTime": {
    "marginTop": 8,
    "marginRight": 8,
    "marginBottom": 8,
    "marginLeft": 8,
    "color": "#999"
  }
});