import React from 'react';
import { Text, TextInput, View, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../assets/styles';
import { Section, Button } from './common';

const registerBackgroundSrc = require('../assets/images/register_background.jpg');

export default class Register extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    // TODO: Firebase stuff...
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('App'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <ImageBackground source={registerBackgroundSrc} style={styles.backgroundImage}>
        <Section style={styles.register}>
          <Text style={styles.registerTitle}>Create Your Account</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}

          <View style={styles.loginInput}>
            <Icon style={styles.emailIcon} name="ios-mail"/>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </View>

          <View style={styles.loginInput}>
            <Icon style={styles.lockIcon} name="md-lock"/>
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.handleSignUp}>
            Sign Up
          </Button>

          <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Login')}>
            Already have an account? Login
          </Button>
        </Section>
      </ImageBackground>
    )
  }
}
