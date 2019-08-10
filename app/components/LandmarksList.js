import React, { Component } from 'react';
import { View, FlatList, Text, Switch, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { getLandmarks, getAchievementsPerUser, switchToShadowCities } from '../actions';
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

  handleShadowCities(value) {
    this.props.navigation.setParams({shadowCities: value});
    this.props.switchToShadowCities(value);
  }

  renderItem(item, index, navigation, achievementsData) {
    let isAchieved = false;
    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, item);
    }

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.landmarksBox} onPress={()=>navigation.navigate('LandmarkDetails',{landmark: item, isAchieved})}>
          <ImageBackground source={{uri: item.landmarkImage}} style={[styles.backgroundImage, styles.landmarkImage]}>
            <View style={styles.landmarksPointsWrap}><Text style={styles.landmarkPoints}>{item.landmarkPoints} points</Text></View>
            { isAchieved ?
              <View style={styles.landmarkExploredLabelWrapper}>
                <Image style={styles.landmarkExploredImage} source={require('../assets/images/checked-icon.png')} />
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
    const { landmarksData, landmarksShadowData, shadowCities } = this.props.landmarks;
    const { achievementsData } = this.props.achievements;
    const { navigation } = this.props;

    if(!isEmpty(landmarksData)) {
      console.log(this.props.landmarks.shadowCities)
      console.log('landmarksData.shadowCities')

      return (
        <FlatList
          data={shadowCities && !isEmpty(landmarksShadowData) ? landmarksShadowData : landmarksData}
          style={shadowCities ? [styles.landmarkShadowActive, styles.landmarksRow]: styles.landmarksRow}
          renderItem={({item, index}) => this.renderItem(item,index,navigation, achievementsData)}
          keyExtractor={(item, index)=> 'landmarkKey' + index}
          ListHeaderComponent={
            <View style={styles.landmarksShadowCities}>
              <View style={styles.landmarksShdowCitiesInner}>
                <Text style={styles.shadowCitiesLabel}>{Screens.Countries.Landmarks.shadowCities}</Text>
                <Switch
                  value={ shadowCities }
                  onValueChange={ this.handleShadowCities.bind(this) } />
              </View>
            </View>
          }
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

export default connect(mapStateToProps, { getLandmarks, getAchievementsPerUser, switchToShadowCities })(LandmarksList);
