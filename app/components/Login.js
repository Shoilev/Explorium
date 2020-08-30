import React, { Component } from 'react';
import { Text, TextInput, View, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';
import { emailChanged, passwordChanged, loginUser, emptyUserOrPassword, FBLoginOrRegister } from '../actions';
import { Section, Button } from './common';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { Auth } from '../assets/styles/auth';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(Auth);
const logoSrc = images.logo;

class Login extends Component {
  onButtonPress() {
    const { email, password } = this.props;

    if(!email || !password) {
      this.props.emptyUserOrPassword();
      return;
    }

    this.props.loginUser({ email, password });
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

  componentDidMount() {
    SplashScreen.hide();
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

          <View style={styles.loginLogoCircle}>
            <Image source={logoSrc} style={styles.loginLogo}/>
          </View>

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
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#78849E"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                />
            </View>

            <View style={styles.loginInput}>
              <FontAwesome5 style={styles.lockIcon} name={'lock'} solid />
              <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="#78849E"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </View>

            <Button textStyle={styles.loginTextBtn} buttonStyle={[styles.loginBtnStyle, styles.loginBtn]} onPress={this.onButtonPress.bind(this)}>
              {Authentication.LogIn.buttonTitle}
            </Button>
          </View>

          <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Register')}>
            {Authentication.LogIn.additionalLinkTitle} <Text style={styles.logingSignUpBtn}>Sign up</Text>
          </Button>
        </Section>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, errorMessage, loading } = auth;

  return { email, password, errorMessage, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  FBLoginOrRegister,
  emptyUserOrPassword
})(Login);
