import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { logOutUser, getUser, getAchievementsPerUser } from '../actions';
import { GetNextLevelXP } from '../controllers/LevelingController';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { ProfileStyle } from '../assets/styles/profile';
import { Authentication } from '../resources/labels.json';
import { images } from '../assets/images';
import { isEmpty } from '../helpers';

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
    let boostShare = false;

    if(achievementsData.boostShareExpire && achievementsData.boostShareExpire.seconds) {
      let boostShareExpire = new Date(achievementsData.boostShareExpire.seconds * 1000);
      boostShareExpire = boostShareExpire.setMonth(boostShareExpire.getMonth() + 1);

      if(boostShareExpire > Date.now()) {
        boostShare = true;
      }
    }

    if(isEmpty(achievementsData)) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      );
    } else {
      let percent = (achievementsData.experience || 0) * 100 / GetNextLevelXP(achievementsData.level + 1);
      let progressValue = {
        width: percent + '%'
      }

      return (
        <View style={[styles.container, styles.profileWrapper]}>
          <ImageBackground source={images.profileBackground} style={styles.profileBackgroundImage}>
            {this.props.user.userPhoto ? 
            <Image style={styles.profileImageFb} source={{
              uri:
                this.props.user.userPhoto,
            }} /> :
            <Image style={styles.profileImage} source={images.userProfile} /> }
          </ImageBackground>
          <Text style={[styles.title, styles.profileTitle]}>
            Hello {"\n"} {this.props.user.userName || achievementsData.userNickname || this.props.user.userEmail}!
          </Text>

          {boostShare ? 
          <View>
            <Text style={styles.exploreBoostText}><FontAwesome5 style={styles.exploreBoostIcon} name={'rocket'} solid /> x2 Boost xp</Text>
          </View>
          : null }

          <View sytle={styles.profileXPWrapper}>
            <View style={styles.profileXPStatusBar}>
              <View style={[styles.profileXPProgress, progressValue]}></View>
              <View style={styles.profileXPTarget}>
                <Text style={styles.profileXPTargetText}>{achievementsData.experience || 0}/{GetNextLevelXP(achievementsData.level + 1)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileScore}>
            <Image style={styles.profileIcon} source={images.profileLevel} />
            <Text>Level:</Text>
            <Text style={styles.profileRightScore}>{achievementsData.level + 1}</Text>
          </View>
          <View style={styles.profileScore}>
            <Image style={styles.profileIcon} source={images.profilePoints} />
            <Text>Points:</Text>
            <Text style={styles.profileRightScore}>{achievementsData.allPoints}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.profileBtn]}
            onPress={()=>{this.props.navigation.navigate('Friends')}}
          >
            <Text style={styles.profileBtnText}> Friends </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.profileBtn]}
            onPress={this.handleLogOut}
          >
            <Text style={styles.profileBtnText}> {Authentication.LogOut.buttonTitle} </Text>
          </TouchableOpacity>
        </View>
      );
    }
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
