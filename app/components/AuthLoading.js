import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';
import { createStyles } from '../assets/styles';

const styles = createStyles();

const requestAdditionalUserData = () => {
  const userUID = firebase.auth().currentUser.uid;

  return firebase.firestore().collection('users').doc(userUID)
  .get().then(doc => {
    if(doc.exists) {
      const userData = doc.data();

      if(!userData.userHomeLocale) {
        return  true;
      }

      return false;
    }

    return false;
  })
}

export default class AuthLoading extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        requestAdditionalUserData().then(premission=>{
          if(premission) {
            this.props.navigation.navigate('UserInfo');
          } else {
            this.props.navigation.navigate('App');
          }
        });
      } else {
        this.props.navigation.navigate('Auth');
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
