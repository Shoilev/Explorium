import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../assets/styles';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from 'react-redux';

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
      <View style={styles.container}>
        <Text>Login into the application</Text>

        {this.props.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.props.errorMessage}
        </Text>}

        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onButtonPress.bind(this)}
        >
          <Text> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text> Don't have an account? Sign Up </Text>
        </TouchableOpacity>
      </View>
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
