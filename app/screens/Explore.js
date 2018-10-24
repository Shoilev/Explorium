import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { styles } from '../assets/styles';

export default class Explore extends Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth();

    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Explore Screen
        </Text>
      </View>
    );
  }
}
