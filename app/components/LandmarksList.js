import React, { Component } from 'react';
import { View, FlatList, Text, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { getLandmarks, getAchievementsPerUser } from '../actions';
import { isUserAchieved, isEmpty } from '../helpers';
import { Screens } from '../resources/labels.json';

const styles = createStyles(LandmarksStyles);

class LandmarksList extends Component {

  componentWillMount() {
    const country = this.props.navigation.getParam('country', '');
    const city = this.props.navigation.getParam('city', '');
    this.props.getLandmarks(country, city);
    this.props.getAchievementsPerUser();
  }

  renderItem(item, index, navigation, achievements) {
    const isAchieved = isUserAchieved(achievements, item);

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.landmarksBox} onPress={()=>navigation.navigate('LandmarkDetails',{landmark: item, isAchieved})}>
          <ImageBackground source={{uri: item.landmarkImage}} style={[styles.backgroundImage, styles.landmarkImage]}>
            <View style={styles.landmarksPointsWrap}><Text style={styles.landmarkPoints}>{item.landmarkPoints} pt</Text></View>
            { isAchieved ?
              <View style={styles.landmarkExploredLabelWrapper}>
                <Text style={styles.landmarkExploredLabel}>
                  {Screens.Countries.Landmarks.exploredLabel}
                </Text>
              </View>
              : null
            }
          </ImageBackground>
          <Text style={styles.landmarksText}>{item.landmarkName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    //activeLandmarks is available if we decide to implement live search in the near future.
    const { landmarksData } = this.props.landmarks;
    const { achievementsData } = this.props.achievements;
    const { navigation } = this.props;

    if(!isEmpty(landmarksData) && landmarksData.length && !isEmpty(achievementsData) && achievementsData.achievements) {
      return (

        <FlatList
          data={landmarksData}
          style={styles.landmarksRow}
          renderItem={({item, index}) => this.renderItem(item,index,navigation, achievementsData.achievements)}
          keyExtractor={(item, index)=> 'landmarkKey' + index}
          numColumns={2}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

const mapStateToProps = ({landmarks, achievements}) => {
  return { landmarks, achievements };
};

export default connect(mapStateToProps, { getLandmarks, getAchievementsPerUser })(LandmarksList);
