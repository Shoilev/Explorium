import React, { Component } from 'react';
import { Dimensions, Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {testImg} from './assets/images';

import Explore from './screens/Explore';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import Countries from './screens/Countries';
import Achivements from './screens/Achivements';

let screen = Dimensions.get('window');

export const Tabs = createBottomTabNavigator({
  'Explore': {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: <Image style={{ width: 50, height: 50 }} source={testImg}/>,
    },
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
    },
  },
  'Friends': {
    screen: Friends,
    navigationOptions: {
      tabBarLabel: 'Friends',
    },
  },
  'Countries': {
    screen: Countries,
    navigationOptions: {
      tabBarLabel: 'Countries',
    },
  },
  'Achivements': {
    screen: Achivements,
    navigationOptions: {
      tabBarLabel: 'Achivements',
    },
  },
},{
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    style : {
      height: 100
    }
  }
});

export const createRootNavigator = () => {
  return createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: ({navigation}) => ({
          gesturesEnabled: false,
        })
      }
    },
    {
      animationEnabled: true,
      lazy: true,
      headerMode: "none",
      mode: "modal"
    }
  );
};