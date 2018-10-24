import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../assets/styles';

export default class Achivements extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          My Achivements
        </Text>
      </View>
    );
  }
}
