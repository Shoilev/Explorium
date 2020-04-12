import React, { Component } from 'react';
import { View, FlatList, Text, Switch, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStyles } from '../assets/styles';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { getLandmarks, getAchievementsPerUser, switchToShadowCities } from '../actions';
import { HeaderBar } from './common';
import { isUserAchieved, isEmpty } from '../helpers';
import { Screens } from '../resources/labels.json';

const styles = createStyles(LandmarksStyles);

class LandmarksList extends Component {

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

  renderItem(item, index, navigation, achievementsData, landmarksAllData) {
    let isAchieved = false;

    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, item);
    }

    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.landmarksBox, index % 2 === 0 ? styles.landmarkBoxSpace : {}]} onPress={()=>navigation.navigate('LandmarkDetails',{landmark: item, isAchieved, landmarksCount: landmarksAllData.length})}>
          <ImageBackground source={{uri: item.landmarkImage}} imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} style={[styles.backgroundImage, styles.landmarkImage]}>
            <View style={styles.landmarksPointsWrap}><Text style={styles.landmarkPoints}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + item.landmarkPoints} points</Text></View>
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
    const { landmarksData, landmarksShadowData, shadowCities, landmarksAllData } = this.props.landmarks;
    const { achievementsData } = this.props.achievements;
    const { navigation } = this.props;
    let headerTitle = navigation.getParam('city', 'Landmarks');

    if(!isEmpty(landmarksData) && !this.state.loading) {
      return (
        <View style={{flex:1}}>
          <HeaderBar headerBarNav={navigation}>{headerTitle}</HeaderBar>
          <FlatList
            data={shadowCities && !isEmpty(landmarksShadowData) ? landmarksShadowData : landmarksData}
            style={shadowCities ? [styles.landmarkShadowActive, styles.landmarksRow]: styles.landmarksRow}
            renderItem={({item, index}) => this.renderItem(item, index, navigation, achievementsData, landmarksAllData)}
            keyExtractor={(item, index)=> 'landmarkKey' + index}
            ListHeaderComponent={
              <View style={styles.landmarksShadowCities}>
                {!isEmpty(landmarksShadowData) ?
                  <View style={styles.landmarksShdowCitiesInner}>
                    <Text style={styles.shadowCitiesLabel}>{Screens.Countries.Landmarks.shadowCities}</Text>
                    <Switch
                      value={ shadowCities }
                      onValueChange={ this.handleShadowCities.bind(this) } />
                  </View>
                :null}
              </View>
            }
            numColumns={2}
            />
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

export default connect(mapStateToProps, { getLandmarks, getAchievementsPerUser, switchToShadowCities })(LandmarksList);
