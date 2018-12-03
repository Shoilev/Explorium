import React, { Component } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { styles } from './assets/styles';
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
      tabBarIcon: <Icon2 style={styles.menuTab} name="envelope"/>,
    },
  },
  'Countries': {
    screen: Countries,
    navigationOptions: {
      tabBarLabel: 'Countries',
      tabBarIcon: <Icon style={styles.menuTab} name="md-globe"/>
    },
  },
  'Achivements': {
    screen: Achivements,
    navigationOptions: {
      tabBarLabel: 'Achivements',
      tabBarIcon: <Icon style={styles.menuTab} name="md-ribbon"/>
    },
  },
  'Friends': {
    screen: Friends,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: <Icon style={styles.menuTab} name="ios-people"/>
    },
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: <Icon style={styles.menuTab} name="md-person"/>
    },
  },
},{
  initialRouteName: 'Explore',
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style : {
      height: 80,
      borderTopWidth: 1,
      borderTopColor: '#1a4e6c',
      color: '#1a4e6c'
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

export const RootNavigation = new createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default class RootNavigator extends Component {
  render() {
    return (
      <RootNavigation/>
    )
  }
}
