import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStyles } from './assets/styles';
import { Screens } from './resources/labels.json';
import AnimatedCircleBarComponent from './components/common/AnimatedNavigationBarComponent';

// components
import Login from './components/Login';
import Register from './components/Register';
import AuthLoading from './components/AuthLoading';

// Screens
import Explore from './screens/Explore';
import Profile from './screens/Profile';
import Friends from './screens/Friends';
import Countries from './screens/Countries';
import Achievements from './screens/Achievements';

//Inner screens
import CitiesList from './components/CitiesList';
import FriendList from './components/FriendList';
import LandmarksList from './components/LandmarksList';
import LandmarkDetails from './components/LandmarkDetails';
import BaseMap from './components/BaseMap';
import ExploreMap from './components/ExploreMap';
import CheckedIn from './components/CheckedIn';
import UserInfo from './components/UserInfo';

const styles = createStyles();

export const Tabs = createBottomTabNavigator({
  'Explore': {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: Screens.Explore.title,
      tabBarIcon: <Image style={{width: 30, height: 30, marginBottom: 5}} source={require("./assets/images/explore.png")}/>
    },
  },
  'Countries': {
    screen: Countries,
    navigationOptions: {
      tabBarLabel: Screens.Countries.title,
      tabBarIcon: <Image style={{width: 25, height: 25, marginBottom: 5}} source={require("./assets/images/countries.png")}/>
    },
  },
  'Achievements': {
    screen: Achievements,
    navigationOptions: {
      tabBarLabel: Screens.Achievements.title,
      tabBarIcon: <Image style={{width: 25, height: 25, marginBottom: 5}} source={require("./assets/images/achievements.png")}/>
    },
  },
  'Friends': {
    screen: Friends,
    navigationOptions: {
      tabBarLabel: Screens.Friends.title,
      tabBarIcon: <Image style={{width: 30, height: 30}} source={require("./assets/images/friends.png")}/>
    },
  },
  'Profile': {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: Screens.Profile.title,
      tabBarIcon: <Image style={{width: 25, height: 25, marginBottom: 5}} source={require("./assets/images/profile.png")}/>
    },
  },
},{
  initialRouteName: Screens.Explore.title,
  animationEnabled: true,
  tabBarOptions: {
    // activeTintColor: 'tomato',
    // inactiveTintColor: '#1c4f6d',
    labelStyle: {
      fontSize: 11,
    },
    style : {
      borderTopWidth: 1,
      borderTopColor: '#f2f2f2',
      color: '#1a4e6c',
      paddingBottom: 5,
      paddingTop: 5
    },
  },
  tabBarComponent: AnimatedCircleBarComponent,
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
        title: 'Cities',
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
    FriendList: {
      screen: FriendList,
      navigationOptions: ({navigation}) => ({
        title: 'Friends',
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
          borderBottomColor: navigation.state.params.shadowCities ? '#fff' : '#1a4e6c',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: navigation.state.params.shadowCities ? '#1f1f1f' : '#fff',
        },
        headerTintColor: navigation.state.params.shadowCities ? '#fff' : '#1a4e6c',
        headerTitleStyle: { color: navigation.state.params.shadowCities ? '#fff' : '#1a4e6c' },
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
          backgroundColor: 'transparent'
        },
        headerTintColor: '#1a4e6c',
        headerTitleStyle: { color: '#1a4e6c' },
      }),
      headerMode: 'screen'
    },
    CheckedIn: {
      screen: CheckedIn,
      navigationOptions: ({navigation}) => ({
        title: 'Checked In',
        headerStyle: {
          borderBottomColor: '#1a4e6c',
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
      }),
      headerMode: 'float',
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
    },
    UserInfo: {
      screen: UserInfo,
      navigationOptions: ({navigation}) => ({
        title: 'Additional User Info',
        header: null
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
    Auth: AuthStack
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
