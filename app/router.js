import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { testImg } from './assets/images';

// components
import Login from './components/Login';
import Register from './components/Register';
import AuthLoading from './components/AuthLoading';

// TODO refactor screens
import Explore from './screens/Explore';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import Countries from './screens/Countries';
import Achivements from './screens/Achivements';

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
  initialRouteName: 'Explore',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style : {
      height: 100
    }
  },
  headerMode: "none",
  mode: "modal",
});

const AppStack = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
      }),
    }
  },
  {
    headerMode: "none",
    mode: "modal",
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        gesturesEnabled: false,
      }),
    },
    Register: {
      screen: Register
    },
  },
  {
    headerMode: "none",
    mode: "modal",
  }
);

export const createRootNavigator = () => {
  return createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  );
};