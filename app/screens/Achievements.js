import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getAchievementsPerUser } from '../actions';
import { Section } from '../components/common';
import { createStyles } from '../assets/styles';
import { Colors } from '../assets/styles/common/colors';
import { isEmpty } from '../helpers';
import { AchievementsStyle } from '../assets/styles/achievements';
import { countryColors } from '../settings/global.json';
import { Screens } from '../resources/labels.json';

const styles = createStyles(AchievementsStyle);

class Achievements extends Component {
  componentWillMount() {
    this.props.getAchievementsPerUser();
  }

  renderItem(item, index) {

    const color = countryColors[index % countryColors.length];

    return  <Section style={styles.achievementsListCard}>
              <ImageBackground source={{uri: item.landmarkImage}} style={[styles.backgroundImage, styles.countryCardBackground]}>
              </ImageBackground>
              <View style={[styles.overlay, {backgroundColor: Colors[color + 'Opacity']}]}>
                <Text style={styles.achievementsIndexText}>#{index+1}</Text>
                <Text style={styles.achievementsListTitle}>{item.landmarkName.toUpperCase()}</Text>
                <Text style={[styles.achievementsListPoints, {backgroundColor: Colors[color]}]}>{item.landmarkPoints + ' points'}</Text>
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
          ListHeaderComponent={<View style={styles.achievementsHeader}><Text style={styles.achievementsHeaderText}>{Screens.Achievements.headerTitle}</Text></View>}
          stickyHeaderIndices={[0]}
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
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      );
    }
  }
}

const mapStateToProps = ({achievements}) => {

  return { achievements };
};

export default connect(mapStateToProps, { getAchievementsPerUser })(Achievements);
