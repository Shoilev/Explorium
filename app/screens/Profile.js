import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgUri } from 'react-native-svg';
import { getUser, getAchievementsPerUser } from '../actions';
import { GetNextLevelXP } from '../controllers/LevelingController';
import { connect } from 'react-redux';
import { Screens } from '../resources/labels.json';
import { createStyles } from '../assets/styles';
import { ProfileStyle } from '../assets/styles/profile';
import { images } from '../assets/images';
import { isEmpty } from '../helpers';

const styles = createStyles(ProfileStyle);

class Profile extends Component {
  handleModal = (title, msg) => {
    Alert.alert(
      title,
      msg,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
  
  componentWillMount() {
    this.props.getUser();
    this.props.getAchievementsPerUser();
  }

  render() {
    const { achievementsData } = this.props.achievements;
    const userAvatar = !isEmpty(achievementsData.userAvatar) ? achievementsData.userAvatar : 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/avatars%2FavatarDefault.svg?alt=media';
    let boostShare = false;
    let currentDate = new Date().getMonth();
    let monthPoints = 0;

    if(achievementsData.boostShareExpire && achievementsData.boostShareExpire.seconds) {
      let boostShareExpire = new Date(achievementsData.boostShareExpire.seconds * 1000);
      boostShareExpire = boostShareExpire.setMonth(boostShareExpire.getMonth() + 1);

      if(boostShareExpire > Date.now()) {
        boostShare = true;
      }
    }

    console.log(achievementsData);
    console.log('====================================');
    if(achievementsData.shareBonus) {
      achievementsData.shareBonus.map(bonus=> {
        let date = new Date(bonus.shareBonusDate).getMonth();
        if(date === currentDate) {
          monthPoints += bonus.shareBonusPoints
        }
      })
    }

    achievementsData.achievements.map(achievement => {
      if(achievement.timestamp) {
        let date = new Date(achievement.timestamp).getMonth();

        if(date === currentDate) {
          monthPoints += achievement.landmarkPoints;
        }
      }
    });

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
        <ScrollView contentContainerStyle={styles.profileWrapper}>
          <View style={styles.backgroundCover}>
            <View style={styles.backgroundCirle}></View>
            <View style={styles.backgroundCirleTwo}></View>
            <View style={styles.backgroundCirleThree}></View>

            <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate('Settings')}} style={styles.profileSettingsButton}>
              <FontAwesome5 style={styles.profileSettingsIcon} name={'cog'} solid />
              <Text style={styles.profileSettingsLabel}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInnerContainer}>
              <View style={[styles.profileImageWrapper, {width:90,height: 90}]}>
                <SvgUri
                  width="90"
                  height="90"
                  uri={userAvatar}
                  style={styles.profileImage}
                />
                <Image style={[styles.profileAvatarDefault, {width: 76, height: 78, left: 8, top: 8 }]} source={images.avatarDefault} />
              </View>
            
            <View style={{marginTop: -16, marginLeft: 150}}>
              <Text styles={styles.profileEditTitle} onPress={()=>{this.props.navigation.navigate('AvatarList')}}><FontAwesome5 style={styles.profileEditIcon} name={'pen-square'} solid /> Edit Profile</Text>
            </View>

            <Text style={[styles.title, styles.profileWelcomeTitle]}>
              Hello
            </Text>
            <Text style={[styles.title, styles.profileTitle]}>
              { achievementsData.userNickname || this.props.user.userName || this.props.user.userEmail}!
            </Text>

            <View style={styles.profileTotalPoints}>
              <Text style={styles.profilePointsLabel}>Total Points</Text>
              <Text style={[styles.explorePoints, styles.exploreCarouselPoints, styles.achievementsUserPoints]}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + achievementsData.allPoints + ' points'}</Text>
            </View>

            <View style={styles.profilePointsInfo}>
              <View style={styles.profilePointsInfoLeft}>
                <Text style={styles.profilePointsLabel}>Monthly {"\n"}Points</Text>
                <Icon style={styles.profilePointsInfoIcon} name="star"/>
                <Text style={styles.profilePointsInfoLabel}>{monthPoints + ' Points'}</Text>
              </View>

              <View>
                <Text style={[styles.profilePointsLabel, {marginBottom: 16}]}>Level</Text>
                <Icon style={styles.profilePointsInfoIcon} name="trophy"/>
                <Text style={styles.profilePointsInfoLabel}>{achievementsData.level + ' Level'}</Text>
              </View>
            </View>

            <View sytle={styles.profileXPWrapper}>
              <Text style={styles.profilePointsLabel}>Experience</Text>
              <View style={[styles.profileXPStatusBar, boostShare ? {} : {marginBottom: 20}]}>
                <View style={[styles.profileXPProgress, progressValue]}></View>
                <View style={styles.profileXPTarget}>
                  <Text style={styles.profileXPTargetText}>{achievementsData.experience || 0}/{GetNextLevelXP(achievementsData.level + 1)}</Text>
                </View>
              </View>
            </View>

            {boostShare ? 
            <View>
              <Text style={[styles.exploreBoostText, {marginBottom: 20, fontSize: 12}]}><FontAwesome5 style={[styles.exploreBoostIcon, {fontSize: 12}]} name={'rocket'} solid /> x2 Boost xp</Text>
            </View>
            : null }
          </View>

          {/* Exploreum Badges */}
          <View style={styles.profileBadgesWrapper}>
            <Text style={styles.profileBadgesTitle}>{Screens.Profile.badgesTitle}</Text>
            <View style={styles.profileBadges}>
              <View>
                {(achievementsData.achievements.length > 10 ) ?
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Tourist Badge', 'To win a Tourist badge you need to explore 10 landmarks.')}>
                  <Image style={{width: 105, height: 90, marginLeft: 20}} source={images.touristBadgeEnabled} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Tourist Badge', 'To win a Tourist badge you need to explore 10 landmarks.')}>
                  <Image style={{width: 105, height: 90, marginLeft: 20}} source={images.touristBadge} />
                </TouchableOpacity>
                }
                <Text onPress={this.handleModal.bind(this, 'Tourist Badge', 'To win a Tourist badge you need to explore 10 landmarks.')} style={[styles.profileBadgeLabel, {marginLeft: 20}]}>Tourist</Text>
              </View>

              <View>
                {(achievementsData.achievements.length > 50 ) ?
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Explorer Badge', 'To win a Explorer badge you need to explore 50 landmarks.')}>
                  <Image style={{width: 107, height: 90}} source={images.explorerBadgeEnabled} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Explorer Badge', 'To win a Explorer badge you need to explore 50 landmarks.')}>
                  <Image style={{width: 107, height: 90}} source={images.explorerBadge} />
                </TouchableOpacity>
                }
                <Text onPress={this.handleModal.bind(this, 'Explorer Badge', 'To win a Explorer badge you need to explore 50 landmarks.')} style={styles.profileBadgeLabel}>Explorer</Text>
              </View>

              <View>
                {(achievementsData.achievements.length > 100 ) ?
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Adventurer Badge', 'To win a Adventurer badge you need to explore 100 landmarks.')}>
                  <Image style={{width: 78, height: 90, marginRight: 20}} source={images.adventurerBadgeEnabled} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.handleModal.bind(this, 'Adventurer Badge', 'To win a Adventurer badge you need to explore 100 landmarks.')}>
                  <Image style={{width: 78, height: 90, marginRight: 20}} source={images.adventurerBadge} />
                </TouchableOpacity>
                }
                <Text onPress={this.handleModal.bind(this, 'Adventurer Badge', 'To win a Adventurer badge you need to explore 100 landmarks.')} style={[styles.profileBadgeLabel, {marginRight: 20}]}>Adventurer</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = ({user, achievements}) => {

  return { user, achievements };
};

export default connect(mapStateToProps, {
  getUser,
  getAchievementsPerUser
})(Profile);
