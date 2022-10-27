import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "profile": {
        "alignItems": "center",
        "justifyContent": "center",
        "width": width/2,
        "marginTop": vh * 2,
        "marginBottom": vh * 2
    },
    "toolbar": {
        "flexDirection": 'row',
        "justifyContent": "space-between",
        "alignItems": "flex-start",
        "width": width,
      marginTop: 10
    },
    "topLeft": {
        "alignItems": "flex-start",
        "justifyContent": "center",
        "flex": 1
    },
    "textTop": {
        "fontSize": 16,
        "fontWeight": "600",
        "left": Constants.RTL ? width - vw*30 : 10,
        "marginTop": 10
    },
    "avatarView": {
        "borderRadius": 50,
        "overflow": "hidden",
        "backgroundColor": "#eee",
        "width": 100
    },
    "avatar": {
        "height": 100,
        "width": 100,
        "resizeMode": "contain"
    },
    "username": {
        "color": "#2C3956",
        "fontSize": 18,
        "fontWeight": "600",
        "marginTop": 12,
        "fontFamily": Platform.OS != 'android' ? Constants.fontHeader :  Constants.fontHeaderAndroid
    },
    "email": {
        "color": "#999",
        "fontSize": 12,
        "marginTop": 4,
        "marginBottom": 12
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
    "clearText": {
        "marginRight": 0,
        "color": "#ffffff"
    },
    "tab": {
        "flex": 1,
        "borderStyle": "solid",
        "borderWidth": 1,
        "borderColor": Color.tabbarTint,
        "justifyContent": "center",
        "width": width/2,
        "height": 36,
        "flexDirection": "row",
        "alignItems": "center"
    },
    "tabLeft": {
        "borderBottomLeftRadius": 4,
        "borderTopLeftRadius": 4
    },
    "tabRight": {
        "borderBottomRightRadius": 4,
        "borderTopRightRadius": 4
    },
    "iconTop": {
        "marginTop": 10,
        "marginLeft": 6
    },
    "activeTab": {
        "backgroundColor": Color.tabbarTint
    },
    "tabText": {
        "fontFamily": Platform.OS != 'android' ? Constants.fontHeader :  Constants.fontHeaderAndroid,
        "fontWeight": "400",
        "fontSize": 14
    },
    "content": {
        "marginTop": Constants.Window.profileHeight,
        "position": "relative",
        "flex": 1,
        "marginBottom": 20
    },
    "scrollview": {
        "flex": 1
    },
    "header": {
        "position": "absolute",
        "top": 0,
        "left": 0,
        "right": 0,
        "backgroundColor": "rgba(255, 255, 255, 0.9)",
        "overflow": "hidden",
        "height": Constants.Window.profileHeight,
        "alignItems": "center"
    },
    "profileView": {
        "position": "absolute",
        "backgroundColor": "transparent",
        "alignItems": "center",
        "top": 50,
        "left": 0,
        "right": 0,
        "width": null,
        "height": Constants.Window.profileHeight
    },
    "tabView": {
        "flexDirection": "row",
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 0,
        "paddingLeft": 8,
        "borderRadius": 8,
        "position": "absolute",
        "width": width,
        "bottom": 10,
        "left": 0,
        "right": 0
    }
});