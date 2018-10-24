import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import { styles } from '../assets/styles';

export default class Profile extends Component {
  state = { currentUser: null }

  handleLogOut = () => {
    // TODO: Firebase stuff...
    firebase.auth()
      .signOut()
      .then(() => {
        this.setState({ email: '', password: '', errorMessage: null })
        this.props.navigator.navigate(Router.getRoute('Auth'))
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Hi {currentUser.email}!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleLogOut}
        >
          <Text> Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
