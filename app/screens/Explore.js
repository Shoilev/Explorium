import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Explore extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Explore Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});