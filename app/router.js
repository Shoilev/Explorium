import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStyles } from './assets/styles';
import { Screens } from './resources/labels.json';

// components
import Login from './components/Login';
import Register from './components/Register';
import AuthLoading from './components/AuthLoading';

// Screens
import Explore from './screens/Explore';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import Countries from './screens/Countries';
import Achivements from './screens/Achivements';

//Inner screens
import CitiesList from './components/CitiesList';
import LandmarksList from './components/LandmarksList';
import LandmarkDetails from './components/LandmarkDetails';
import BaseMap from './components/BaseMap';
import ExploreMap from './components/ExploreMap';

const styles = createStyles();

export const Tabs = createBottomTabNavigator({
  'Explore': {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: Screens.Explore.title,
      tabBarIcon: <Icon style={styles.menuTab} name="ios-compass"/>,
    },
  },
  'Countries': {
    screen: Countries,
    navigationOptions: {
      tabBarLabel: Screens.Countries.title,
      tabBarIcon: <Icon style={styles.menuTab} name="md-globe"/>
    },
  },
  'Achivements': {
    screen: Achivements,
    navigationOptions: {
      tabBarLabel: Screens.Achivements.title,
      tabBarIcon: <Icon style={styles.menuTab} name="md-ribbon"/>
    },
  },
  'Friends': {
    screen: Friends,
    navigationOptions: {
      tabBarLabel: Screens.Friends.title,
      tabBarIcon: <Icon style={styles.menuTab} name="ios-people"/>
    },
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: Screens.Profile.title,
      tabBarIcon: <Icon style={styles.menuTab} name="md-person"/>
    },
  },
},{
  initialRouteName: Screens.Explore.title,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
      paddingTop: 10
    },
    style : {
      height: 65,
      borderTopWidth: 1,
      borderTopColor: '#1a4e6c',
      color: '#1a4e6c',
      paddingBottom: 5,
      paddingTop: 15
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
        header: null
      }),
    },
    CitiesList: {
      screen: CitiesList,
      navigationOptions: ({navigation}) => ({
        title: `Cities`,
        headerStyle: {
          borderBottomColor: '#1a4e6c',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' },
      }),
      headerMode: 'screen',
    },
    LandmarksList: {
      screen: LandmarksList,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('city', 'Landmarks'),
        headerStyle: {
          borderBottomColor: '#1a4e6c',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' },
      }),
      headerMode: 'screen',
    },
    LandmarkDetails: {
      screen: LandmarkDetails,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('landmark') ? navigation.getParam('landmark').landmarkName : 'Landmark',
        headerStyle: {
          borderBottomColor: '#1a4e6c',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' },
      }),
      headerMode: 'screen',
    },
    BaseMap: {
      screen: BaseMap,
      navigationOptions: ({navigation}) => ({
        title: '',
        headerTransparent: true,
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' }
      }),
      headerMode: 'screen',
    },
    ExploreMap: {
      screen: ExploreMap,
      navigationOptions: ({navigation}) => ({
        title: '',
        headerTransparent: true,
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' }
      }),
      headerMode: 'screen',
    }
  },
  {
    mode: "modal",
    cardStyle: {backgroundColor: '#ffffff'}
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
