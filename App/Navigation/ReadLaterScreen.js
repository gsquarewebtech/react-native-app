import React, { Component } from "react";
import { Platform, StatusBar, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

import { Tools, Images, Languages } from '@common';
import { ReadLater, User } from '@container';
import { TabBarIcon } from "@components";
import OneSignal from 'react-native-onesignal'
import { fetchUserData, getDeviceTokens } from '@redux/actions';
import { connect } from 'react-redux';

class ReadLaterScreen extends Component {
  static navigationOptions = {
    tabBarLabel: Languages.textBookMark,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon icon={Images.icons.love} tintColor={tintColor} />
    ),
    header: null,
  }
  
	componentDidMount() {
		const array	=	{ get_all_tokens:true }
		this.props.getDeviceTokens(array);
	}

  componentWillMount() {
    if (typeof this.props.user.data == 'undefined' || this.props.user.data == null) {
      this.props.fetchUserData();
    }
  }
  
 onPressLiveStreamNow = () => {
    const { route, user } = this.props;
    
    const array	=	{ get_all_tokens:true,message:'Admin is going to live,Click here to see the activity.',data:{type:"Stream"} }
	this.props.getDeviceTokens(array);
    
    const userName = user.data.displayName;
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Streamer', { userName:userName, roomName: userName });
  };


  render = () => {
    const { user, navigation } = this.props;
    const onViewPost = (item, index, parentPosts) => navigation.navigate('postDetail', { post: item, index, parentPosts, backToRoute: 'readlater' });
    const onReload = () => navigation.navigate("readlater");

    if (typeof user.data != 'undefined') {
      return <User userData={user.data}
        onViewPost={onViewPost}
        onReload={onReload}
        LiveStream={()=>this.onPressLiveStreamNow()}
        postNews={() => navigation.navigate("postNews")} />
    }
    return <ReadLater userData={user.data}
      onViewPost={onViewPost} />
  }
}
const mapStateToProps = ({ user, notification }) => ({ user, notification });
export default connect(mapStateToProps, { fetchUserData, getDeviceTokens })(ReadLaterScreen);
