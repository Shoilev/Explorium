import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import firebase, { auth } from 'react-native-firebase';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createStyles } from '../assets/styles';
import { localCityChange, nicknameChange } from '../actions';
import { Auth } from '../assets/styles/auth';
import { Section, Button } from './common';

const styles = createStyles(Auth);

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
      <Section style={styles.loginBackground}>
        <View style={styles.backgroundCirle}></View>
        <View style={styles.backgroundCirleTwo}></View>

        <Text style={styles.registerTitle}>Additional User Info</Text>
        <Text style={{color:'#fff'}}>*Local City: is a place where you feel local.</Text>

        {this.props.errorMessage &&
        <Text style={{ color: 'red' }}>
          {this.props.errorMessage}
        </Text>}

        <View style={styles.loginInput}>
          <FontAwesome5 style={styles.lockIcon} name="street-view" solid/>
          <TextInput
            placeholder="Local City"
            placeholderTextColor="#78849E"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={this.onLocalCityChange.bind(this)}
            value={this.props.localCity}
          />
        </View>

        <View style={styles.loginInput}>
          <FontAwesome5 style={styles.lockIcon} name="user-circle" solid/>
          <TextInput
            placeholder="Nickname or Name"
            placeholderTextColor="#78849E"
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