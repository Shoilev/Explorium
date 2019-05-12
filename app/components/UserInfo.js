import React from 'react';
import { Text, TextInput, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import firebase, { auth } from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStyles } from '../assets/styles';
import { localCityChange, nicknameChange } from '../actions';
import { images } from '../assets/images';
import { Auth } from '../assets/styles/auth';
import { Section, Button } from './common';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(Auth);
const registerBackgroundSrc = images.registerBackground;

class UserInfo extends React.Component {
  onButtonPress() {
    const { userHomeLocale, userNickname } = this.props;
    const userUID = firebase.auth().currentUser.uid;

    return firebase.firestore().collection('users').doc(userUID).update({
      userHomeLocale: userHomeLocale,
      userNickname: userNickname
    }).then(()=> this.props.navigation.navigate('Explore', {notReload: true}))
  }

  onLocalCityChange(text) {
    this.props.localCityChange(text);
  }

  onNicknameChange(text) {
    this.props.nicknameChange(text);
  }

  render() {
    return (
      <ImageBackground source={registerBackgroundSrc} style={styles.backgroundImage}>
        <Section style={styles.register}>
          <Text style={styles.registerTitle}>Additional User Info</Text>
          <Text style={{color:'#fff'}}>*Local City: is a place where you feel local.</Text>

          {this.props.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.props.errorMessage}
          </Text>}

          <View style={styles.loginInput}>
            <Icon style={styles.emailIcon} name="ios-locate"/>
            <TextInput
              placeholder="Local City"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onLocalCityChange.bind(this)}
              value={this.props.localCity}
            />
          </View>

          <View style={styles.loginInput}>
            <Icon style={styles.lockIcon} name="md-contact"/>
            <TextInput
              placeholder="Nickname or Name"
              placeholderTextColor="#ffffff"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={this.onNicknameChange.bind(this)}
              value={this.props.nickname}
            />
          </View>

          <Button textStyle={styles.loginTextBtn} buttonStyle={styles.loginBtnStyle} onPress={this.onButtonPress.bind(this)}>
            Submit
          </Button>
        </Section>
      </ImageBackground>
    )
  }
}

const mapStateToProps = ({ user }) => {
  const { userHomeLocale, userNickname} = user;

  return { userHomeLocale, userNickname };
};

export default connect(mapStateToProps, {
  localCityChange,
  nicknameChange
})(UserInfo);