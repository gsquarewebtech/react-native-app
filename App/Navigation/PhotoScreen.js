import React, {Component} from "react";
import {Platform, Image, StyleSheet, Dimensions} from "react-native";

import {Tools, Images, Constants} from '@common';
import {Photos} from '@container';
import Icons from '@navigation/Icons';
import {TabBarIcon} from "@components";

const {width} = Dimensions.get("window"), vw = width / 100;

export default class PhotoScreen extends Component {
  static navigationOptions = {
    title: 'Photo',
    tabBarLabel: 'Photo',
    tabBarIcon: ({tintColor}) => (
      <TabBarIcon icon={Images.icons.photo} tintColor={tintColor}/>
    ),
    headerLeft: Icons.Home(),
  };
  render = () => <Photos />
}

