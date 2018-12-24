import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from '../assets/styles';

const styles = createStyles();

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
