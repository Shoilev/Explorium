import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Section, Button } from './common';
import { styles } from '../assets/styles';

const loginBackgroundSrc = require('../assets/images/login_background.jpg');
const logoSrc = require('../assets/images/logo.png');

class Login extends Component {
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  render() {
    return (
      <ImageBackground source={loginBackgroundSrc} style={styles.backgroundImage}>
        <Section style={styles.login}>
          <Image source={logoSrc} style={styles.loginLogo}/>
          <Text style={styles.introText}>Inspired exploration!</Text>


          {this.props.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.props.errorMessage}
          </Text>}

          <View style={styles.loginInput}>
            <Icon style={styles.emailIcon} name="ios-mail"/>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              />
          </View>

          <View style={styles.loginInput}>
            <Icon style={styles.lockIcon} name="md-lock"/>
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="#ffffff"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </View>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onButtonPress.bind(this)}>
            LOG IN
          </Button>

          <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Register')}>
            Don't have an account? Sign Up
          </Button>
        </Section>
      </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, errorMessage, loading } = auth;

  return { email, password, errorMessage, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(Login);
