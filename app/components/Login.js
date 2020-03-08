import React, { Component } from 'react';
import { Text, TextInput, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import { emailChanged, passwordChanged, loginUser, emptyUserOrPassword, FBLoginOrRegister } from '../actions';
import { Section, Button } from './common';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { Auth } from '../assets/styles/auth';
import { App, Authentication } from '../resources/labels.json';

const styles = createStyles(Auth);
const loginBackgroundSrc = images.loginBackground;
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
        <ImageBackground source={loginBackgroundSrc} style={styles.backgroundImage}>
          <Section style={styles.login}>
            <ActivityIndicator />
          </Section>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground source={loginBackgroundSrc} style={styles.backgroundImage}>
          <Section style={styles.login}>
            <Image source={logoSrc} style={styles.loginLogo}/>
            <Text style={styles.introText}>{App.description}</Text>


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
              {Authentication.LogIn.buttonTitle}
            </Button>

            <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onFbLogin.bind(this)}>
              {'FB LOGIN'}
            </Button>

            <Button textStyle={styles.signTextBtn} buttonStyle={styles.signBtnStyle} onPress={() => this.props.navigation.navigate('Register')}>
              {Authentication.LogIn.additionalLinkTitle}
            </Button>
          </Section>
        </ImageBackground>
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
