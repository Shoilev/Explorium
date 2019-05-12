import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { logOutUser, getUser, getAchievementsPerUser } from '../actions';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { ProfileStyle } from '../assets/styles/profile';
import { Authentication } from '../resources/labels.json';

const styles = createStyles(ProfileStyle);

class Profile extends Component {

  handleLogOut = () => {
    this.props.logOutUser()
  }

  componentWillMount() {
    this.props.getUser();
    this.props.getAchievementsPerUser();
  }

  render() {
    const { achievementsData } = this.props.achievements;

    return (
      <View style={styles.container}>
        {this.props.user.userPhoto ? 
        <Image style={{ width: 200, height: 200, borderRadius: 100 }} source={{
          uri:
            this.props.user.userPhoto,
        }} /> :
        <Image style={{ width: 200, height: 200, }} source={require('../assets/images/user_profile.png')} /> }
        <Text style={styles.title}>
          Hi {this.props.user.userName || achievementsData.userNickname || this.props.user.userEmail}
        </Text>

        <Text>Level: {achievementsData.level}</Text>
        <Text>Points: {achievementsData.allPoints}</Text>

        <TouchableOpacity
          style={[styles.button, styles.profileBtn]}
          onPress={this.handleLogOut}
        >
          <Text> {Authentication.LogOut.buttonTitle} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({user, achievements}) => {

  return { user, achievements };
};

export default connect(mapStateToProps, {
  logOutUser,
  getUser,
  getAchievementsPerUser
})(Profile);
