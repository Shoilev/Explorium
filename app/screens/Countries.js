import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../assets/styles';

export default class Countries extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Countries
        </Text>
      </View>
    );
  }
}
