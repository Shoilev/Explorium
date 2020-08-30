import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { logOutUser } from '../actions';
import { HeaderCloseBar } from './common';
import { createStyles } from '../assets/styles';
import { ProfileStyle } from '../assets/styles/profile';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(ProfileStyle);

class Settings extends Component {
  
  handleLogOut = () => {
    this.props.logOutUser()
  }

  handleLink = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log('The service is temporarily down.');
      }
    });
  }

  componentWillMount() {
  }

  render() {
    const { navigation } = this.props;

    return (
        <View style={[styles.container, styles.settingsWrapper]}>
            <HeaderCloseBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={{navigation, redirect: false }}>{'Settings'}</HeaderCloseBar>
            <View style={styles.settingsList}>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://exploreum.app/#what-is-exploreum')}>About Exploreum</Text>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://exploreum.app/#partnerships')}>Partnership</Text>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://exploreum.app/FAQ')}>FAQ</Text>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://exploreum.app/#contact')}>Contact Us</Text>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://www.facebook.com/ExploreumApp/')}>Like us in Facebook</Text>
              <Text style={styles.settingsListItem} onPress={this.handleLink.bind(this, 'https://exploreum.app/privacy_policy')}>Privacy Policy</Text>
            </View>

            <View style={styles.settingsLogoutButton}>
              <TouchableOpacity style={[styles.button, styles.profileBtn]} onPress={this.handleLogOut}>
                  <Text style={styles.profileBtnText}>{Authentication.LogOut.buttonTitle} </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.settingsInfoWrapper}>
              <Text style={styles.settingsInfo}>Version 1.0</Text>
              <Text style={styles.settingsInfo}>team@exploreum.app</Text>
            </View>
        </View>
    )
  }
}

const mapStateToProps = ({user}) => {
  return { user };
};

export default connect(mapStateToProps, {
  logOutUser
})(Settings);

