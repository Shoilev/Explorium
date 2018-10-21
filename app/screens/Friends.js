import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Friends extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Friends
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
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});