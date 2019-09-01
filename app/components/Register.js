import React from 'react';
import { Text, TextInput, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { emailChanged, passwordChanged, confirmPasswordChanged, signUpUser, emptyUserOrPassword, passwordNotMatch, FBLoginOrRegister } from '../actions';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { Auth } from '../assets/styles/auth';
import { Section, Button } from './common';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(Auth);
const registerBackgroundSrc = images.registerBackground;

class Register extends React.Component {
  onButtonPress() {
    const { email, password, confirmPassword } = this.props;
    if(!email || !password || !confirmPassword) {
      this.props.emptyUserOrPassword();
      return;
    }

    if (password !== confirmPassword) {
      this.props.passwordNotMatch();
      return;
    }

    this.props.signUpUser({ email, password });
  }

  onFbLogin() {
    this.props.FBLoginOrRegister();
    return;
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmPasswordChange(text) {
    this.props.confirmPasswordChanged(text);
  }

  render() {
    return (
      <ImageBackground source={registerBackgroundSrc} style={styles.backgroundImage}>
        <Section style={styles.register}>
          <Text style={styles.registerTitle}>{Authentication.SignIn.title}</Text>

          {this.props.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.props.errorMessage}
          </Text>}

          <View style={styles.loginInput}>
            <Icon style={styles.emailIcon} name="ios-mail"/>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
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
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </View>

          <View style={styles.loginInput}>
            <Icon style={styles.lockIcon} name="md-lock"/>
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onConfirmPasswordChange.bind(this)}
              value={this.props.confirmPassword}
            />
          </View>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onButtonPress.bind(this)}>
            {Authentication.SignIn.buttonTittle}
          </Button>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onFbLogin.bind(this)}>
            {'FB LOGIN'}
          </Button>

          <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Login')}>
            {Authentication.SignIn.additionalLinkTitle}
          </Button>
        </Section>
      </ImageBackground>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, confirmPassword, errorMessage, loading } = auth;

  return { email, password, confirmPassword, errorMessage, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  signUpUser,
  FBLoginOrRegister,
  emptyUserOrPassword,
  passwordNotMatch
})(Register);
