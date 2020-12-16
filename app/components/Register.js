import React from 'react';
import { Text, TextInput, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { emailChanged, passwordChanged, confirmPasswordChanged, signUpUser, emptyUserOrPassword, passwordNotMatch, FBLoginOrRegister } from '../actions';
import { createStyles } from '../assets/styles';
import { Auth } from '../assets/styles/auth';
import { Section, Button } from './common';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(Auth);

class Register extends React.Component {
  onButtonPress() {
    const { email, password, confirmPassword, errorMessage } = this.props;
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
    if(this.props.loading) {
      return (
          <Section style={styles.loginBackground}>
            <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
          </Section>
      );
    } else {
      return (
        <Section style={styles.loginBackground}>
          <View style={styles.backgroundCirle}></View>
          <View style={styles.backgroundCirleTwo}></View>

          <Text style={styles.registerTitle}>{Authentication.SignIn.title}</Text>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onFbLogin.bind(this)}>
            <FontAwesome5 style={styles.loginTextIcon} name={'facebook-f'} solid />  {'CONTINUE WITH FACEBOOK'}
          </Button>

          <Text style={styles.loginOrText}>or</Text>

          {this.props.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.props.errorMessage}
          </Text>}

          <View style={styles.loginInputWrapper}>
            <View style={styles.loginInput}>
              <FontAwesome5 style={styles.lockIcon} name={'envelope'} solid />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#78849E"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </View>

            <View style={styles.loginInput}>
              <FontAwesome5 style={styles.lockIcon} name={'lock'} solid />
              <TextInput
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#78849E"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </View>

            <View style={styles.loginInput}>
              <FontAwesome5 style={styles.lockIcon} name={'lock'} solid />
              <TextInput
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor="#78849E"
                autoCapitalize="none"
                style={styles.textInput}
                onChangeText={this.onConfirmPasswordChange.bind(this)}
                value={this.props.confirmPassword}
              />
            </View>

            <Button textStyle={styles.loginTextBtn} buttonStyle={[styles.loginBtnStyle, styles.loginBtn]} onPress={this.onButtonPress.bind(this)}>
              {Authentication.SignIn.buttonTittle}
            </Button>
          </View>

          <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Login')}>
            {Authentication.SignIn.additionalLinkTitle} <Text style={styles.logingSignUpBtn}>Login</Text>
          </Button>
        </Section>
      )
    }
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
