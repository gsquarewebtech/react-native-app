/** @format */

import React from 'react'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import { Color, Images } from '@common'
import { TabBar, TabBarIcon } from '@components'
import PostDetailScreen from './PostDetailScreen'
import HomeScreen from './HomeScreen'
import SettingScreen from './SettingScreen'
import CategoryScreen from './CategoryScreen'
import CustomPageScreen from './CustomPageScreen'
import PhotoScreen from './PhotoScreen'
import VideoScreen from './VideoScreen'
import ReadLaterScreen from './ReadLaterScreen'
import PostListScreen from './PostListScreen'
import HorizontalScreen from './HorizontalScreen'
import SearchScreen from './SearchScreen'
import PostNewsScreen from './PostNewsScreen'
import PostNewsContentScreen from './PostNewsContentScreen'
import LoginStream from '../LiveStream/pages/Login';
import HomeStream from '../LiveStream/pages/Home';
import Streamer from '../LiveStream/pages/Streamer';
import Viewer from '../LiveStream/pages/Viewer';
//~ import PostStream from './PostStreamScreen';
import PostStream from '@container/PostStream';

const categoryStack = createStackNavigator(
  {
    category: { screen: CategoryScreen },
    PostListScreen: { screen: PostListScreen },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon icon={Images.icons.category} tintColor={tintColor} />
      ),
      headerTintColor: '#333',
    },
  }
)

const newsStack = createStackNavigator(
  {
    home: { screen: HomeScreen },
    PostListScreen: { screen: PostListScreen },
    HorizontalScreen: { screen: HorizontalScreen },
  },
  {
    header: null,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon icon={Images.icons.news} tintColor={tintColor} />
      ),
    },
  }
)

const videoStack = createStackNavigator(
  {
    video: { screen: VideoScreen },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon icon={Images.icons.video} tintColor={tintColor} />
      ),
    },
  }
)

handleTabPress = ({ navigation }) => {
  navigation.popToTop();
  navigation.navigate(navigation.state.routeName);
}

const streamStack = createStackNavigator(
  {
	HomeStream: { screen: HomeStream },
    Streamer: { screen: Streamer },
	Viewer: { screen: Viewer },
	PostStream: { screen: PostStream },
  },
  {
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon icon={Images.icons.video} tintColor={tintColor} />
      ),
    },
  }
)

const searchStack = createStackNavigator(
  {
    search: { screen: SearchScreen },
    searchPostDetail: { screen: PostDetailScreen },
  },
  {
    header: null,
  }
)

const AppNavigator = createBottomTabNavigator(
  {
    home: {
      screen: newsStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.icons.news} tintColor={tintColor} />
        ),
      },
    },

    category: {
      screen: categoryStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.icons.category} tintColor={tintColor} />
        ),
      },
    },

    search: {
      screen: searchStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.icons.search} tintColor={tintColor} />
        ),
      },
    },

    video: {
      screen: videoStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.icons.video} tintColor={tintColor} />
        ),
      },
    },
    Stream: {
      screen: streamStack,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.icons.stream} tintColor={tintColor} />
        ),
        
      },
    },
    photo: { screen: PhotoScreen },
    readlater: { screen: ReadLaterScreen },
    postDetail: { screen: PostDetailScreen },
    customPage: { screen: CustomPageScreen },
    setting: { screen: SettingScreen },
    postNews: { screen: PostNewsScreen },
    postNewsContent: { screen: PostNewsContentScreen },
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: Color.tabbarTint,
      inactiveTintColor: Color.tabbarColor
    },
     resetOnBlur: true,
    lazy: true
  }
)

export default createAppContainer(AppNavigator)
