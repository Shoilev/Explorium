import React, { Component } from 'react';
import { View, FlatList, Text, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../assets/styles';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { getLandmarks, getAchievementsPerUser, switchToShadowCities, landmarksMapView } from '../actions';
import { HeaderBar } from './common';
import { isUserAchieved, isEmpty } from '../helpers';
import { Screens } from '../resources/labels.json';
import ExploreMap from './ExploreMap';

const styles = createStyles(LandmarksStyles);


class LandmarksList extends Component {
  handleLandmarksMapView(enable) {
    if(enable) {
      this.props.landmarksMapView(false);
    } else {
      this.props.landmarksMapView(true);
    }
  };
  
  componentWillMount() {
    this.setState({
      loading: true
    });
    const country = this.props.navigation.getParam('country', '');
    const city = this.props.navigation.getParam('city', '');
    const cityPoints = this.props.navigation.getParam('cityPoints', '0');
    this.props.getLandmarks(country, city, cityPoints).then(result=>{
      this.setState({
        loading: false
      });
    });
    this.props.getAchievementsPerUser();
  }

  handleShadowCities(value) {
    this.props.navigation.setParams({shadowCities: value});
    this.props.switchToShadowCities(value);
  }

  renderItem(item, index, navigation, achievementsData, landmarksAllData, shadowCities) {
    let isAchieved = false;

    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, item);
    }

    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.landmarksBox, index % 2 === 0 ? styles.landmarkBoxSpace : {}, shadowCities ? styles.landmarkBoxShadowActive : {}]} onPress={()=>navigation.navigate('LandmarkDetails',{landmark: item, isAchieved, landmarksCount: landmarksAllData.length})}>
          <ImageBackground source={{uri: item.landmarkImage}} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} style={[styles.backgroundImage, styles.landmarkImage]}>
            <View style={styles.landmarksPointsWrap}><Text style={styles.explorePoints}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + item.landmarkPoints} points</Text></View>
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
          <Text style={[styles.landmarksText, shadowCities ? styles.landmarksTextShadowActive : {} ]}>{item.landmarkName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    //activeLandmarks is available if we decide to implement live search in the near future.
    const { landmarksData, landmarksShadowData, shadowCities, landmarksAllData, mapViewEnabled } = this.props.landmarks;
    const { achievementsData } = this.props.achievements;
    const { navigation } = this.props;
    let headerTitle = navigation.getParam('city', 'Landmarks');

    if(!isEmpty(landmarksData) && !this.state.loading) {
      let coordinate = landmarksData[0].coordinate;

      return (
        <View style={[{flex:1}, shadowCities ? styles.landmarkShadowActive : {}]}>
          <HeaderBar mapViewListener={this.handleLandmarksMapView.bind(this, mapViewEnabled)} coordinate={coordinate} headarBarMapView={{headarBarMapView: true}} mapViewIsEnabled={{mapViewIsEnabled: mapViewEnabled}} headerBarStyle={shadowCities ? styles.landmarksHeaderBarActive: {}} headerBarNav={navigation}>{headerTitle}</HeaderBar>

          {!mapViewEnabled ?
            <View style={styles.landmarksShadowCities}>
              {!isEmpty(landmarksShadowData) ?
                  <TouchableOpacity activeOpacity={0.5} onPress={()=>this.handleShadowCities(!shadowCities)} style={[styles.landmarkShadowIconButton, shadowCities ? styles.landmarkShadowButtonActive : {}]}>
                    <FontAwesome5 style={[styles.landmarkShadowIcon, shadowCities ? styles.landmarkShadowActiveIcon : {}]} name={'user-secret'} solid />
                    <Text style={[styles.shadowCitiesLabel, shadowCities ? styles.landmarkShadowActiveIcon : {}]}>
                      {Screens.Countries.Landmarks.shadowCities}
                    </Text>
                  </TouchableOpacity>
              :null}
            </View>
          : null }
          {mapViewEnabled ?
            //May be new map file is better idea. To skip api calls
            <ExploreMap navigation={navigation} latitude={coordinate.latitude} longitude={coordinate.longitude} />
            :
            <FlatList
              data={shadowCities && !isEmpty(landmarksShadowData) ? landmarksShadowData : landmarksData}
              style={styles.landmarksRow}
              renderItem={({item, index}) => this.renderItem(item, index, navigation, achievementsData, landmarksAllData, shadowCities)}
              keyExtractor={(item, index)=> 'landmarkKey' + index}
              numColumns={2}
              />
            }
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <HeaderBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={navigation}>{headerTitle}</HeaderBar>
          <ActivityIndicator color="rgb(255, 126, 41)" size="large" />
        </View>
      );
    }
  }
}

const mapStateToProps = ({landmarks, achievements}) => {
  return { landmarks, achievements };
};

export default connect(mapStateToProps, { getLandmarks, getAchievementsPerUser, switchToShadowCities, landmarksMapView })(LandmarksList);
