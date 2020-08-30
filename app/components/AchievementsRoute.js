import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { SvgUri } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAchievementsPerUser } from '../actions';
import { createStyles } from '../assets/styles';
import { Section } from '../components/common';
import { isEmpty } from '../helpers';
import { Colors } from '../assets/styles/common/colors';
import { AchievementsStyle } from '../assets/styles/achievements';
import { countryColors } from '../settings/global.json';
import { Screens } from '../resources/labels.json';

const styles = createStyles(AchievementsStyle);

class AchievementsRoute extends Component {

  componentWillMount() {
    this.props.getAchievementsPerUser();
  }

  renderItem(item, index) {

    // const color = countryColors[index % countryColors.length];

    return  <Section style={styles.achievementsListCard}>
              <Image source={{uri: item.landmarkImage}} style={{width:120, height: 100, borderRadius: 10 }}></Image>
              <View>
                <Text style={styles.achievementsListTitle}>{item.landmarkName.toUpperCase()}</Text>

                <View style={{flex:1, flexDirection:'row', alignItems:'center', marginRight: 20, marginLeft: 20}}>
                  <Text style={[styles.explorePoints, styles.exploreCarouselPoints, styles.achievementsUserPoints]}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + item.landmarkPoints + ' points'}</Text>
                  <Text style={styles.achievementsDate}><Icon style={styles.achievementsDateIcon} name="calendar"/> {new Date(item.timestamp).toDateString()}</Text>
                </View>
              </View>
            </Section>
  }

  render() {
    const { achievementsData, error, errorMessage } = this.props.achievements;
    const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/avatars%2FavatarDefault.svg?alt=media';
    const currentDate = new Date().getMonth();
    let mothlyPoints = 0;

    if(achievementsData.shareBonus) {
      achievementsData.shareBonus.map(bonus=> {
        let date = new Date(bonus.shareBonusDate).getMonth();
        if(date === currentDate) {
          mothlyPoints += bonus.shareBonusPoints
        }
      })
    }

    achievementsData.achievements.map(achievement => {
      if(achievement.timestamp) {
        let date = new Date(achievement.timestamp).getMonth();

        if(date === currentDate) {
          mothlyPoints += achievement.landmarkPoints;
        }
      }
    });

    if(!isEmpty(achievementsData)) {
      const userAchievements = achievementsData.achievements;

      if(isEmpty(userAchievements)) {
        return (
          <View style={styles.container}>
            <Text>{errorMessage}</Text>
          </View>
        )
      }

      return (
        <View style={{flex:1}}>
          <Text style={styles.achievementsHeaderText}>{Screens.Achievements.headerTitle}</Text>
          <FlatList
            data={userAchievements}
            renderItem={({item, index}) => this.renderItem(item,index)}
            keyExtractor={index => { return 'achievements' + index.toString() + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}}
            style={styles.achievementsList}
            ListHeaderComponent={
              <View style={styles.achievementUserWrapper}>
                <SvgUri
                  width="85"
                  height="85"
                  uri={!isEmpty(achievementsData.userAvatar) ? achievementsData.userAvatar : defaultAvatar}
                />
                <View style={styles.achievementsUserInfo}>
                  <Text style={styles.achievementsUserName}>{achievementsData.userNickname}</Text>
                  <Text>{'Level: ' + (achievementsData.level + 1)}</Text>
                  <Text style={[styles.explorePoints, styles.exploreCarouselPoints, styles.achievementsUserPoints]}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + mothlyPoints + ' points'}</Text>
                </View>
              </View>
            }
          />
        </View>
      )
    } else if (error) {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      );
    }
  }
}

const mapStateToProps = ({achievements}) => {

  return { achievements };
};

export default connect(mapStateToProps, { getAchievementsPerUser })(AchievementsRoute);
