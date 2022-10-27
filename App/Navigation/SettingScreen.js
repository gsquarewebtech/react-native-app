import React, {Component} from "react";
import {Platform, StatusBar, Image, StyleSheet, Dimensions} from "react-native";

import {Tools, Images, Constants} from '@common';
import {Setting} from '@container';
import Icons from '@navigation/Icons';
import {TabBarIcon} from "@components";

export default class SettingScreen extends Component {
  static navigationOptions = {
    title: 'Setting',
    tabBarLabel: 'Setting',

    headerLeft: Constants.RTL ? null : Icons.Home(),
    headerRight: Constants.RTL ? Icons.Home() : null,
  };

  render = () => <Setting />
}