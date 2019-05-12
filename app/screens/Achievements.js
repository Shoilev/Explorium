import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getAchievementsPerUser } from '../actions';
import { Section } from '../components/common';
import { createStyles } from '../assets/styles';
import { isEmpty } from '../helpers';
import { AchievementsStyle } from '../assets/styles/achievements';

const styles = createStyles(AchievementsStyle);

class Achievements extends Component {
  componentWillMount() {
    this.props.getAchievementsPerUser();
  }

  renderItem(item, index) {

    return <Section style={styles.achievementListCard}>
            <View style={styles.achievementTextIndex}>
              <Text>{index+1}</Text>
            </View>
            <View>
              <Image source={{uri: item.landmarkImage}} style={[styles.backgroundImage, styles.achievementsImage]}>
              </Image>
            </View>
            <View style={styles.achievementsRightSection}>
              <Text>{item.landmarkName}</Text>
              <Text style={styles.achievementsPoints}>{item.landmarkPoints + ' points'}</Text>
            </View>
          </Section>
  }

  render() {
    const { achievementsData, error, errorMessage } = this.props.achievements;

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
        <FlatList
          data={userAchievements}
          renderItem={({item, index}) => this.renderItem(item,index)}
          keyExtractor={(country, index)=> index.toString()}
          style={styles.achievementsList}
        />
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
          <ActivityIndicator />
        </View>
      );
    }
  }
}

const mapStateToProps = ({achievements}) => {

  return { achievements };
};

export default connect(mapStateToProps, { getAchievementsPerUser })(Achievements);
