import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { logOutUser, getUser } from '../actions';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { Authentication } from '../resources/labels.json';

const styles = createStyles();

class Profile extends Component {

  handleLogOut = () => {
    this.props.logOutUser()
  }

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Hi {this.props.userEmail}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleLogOut}
        >
          <Text> {Authentication.LogOut.buttonTitle} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({user}) => {
  const { userEmail } = user;

  return { userEmail };
};

export default connect(mapStateToProps, {
  logOutUser,
  getUser
})(Profile);
