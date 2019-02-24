import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from '../assets/styles';

const styles = createStyles();

export default class Achievements extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          My Achievements
        </Text>
      </View>
    );
  }
}
