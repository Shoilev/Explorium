import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, Linking, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { requestLocationPermission, getUser, getAchievementsPerUser } from '../actions';
import { isUserAchieved, checkHaversineDistance, checkBounds } from '../helpers';
import { checkInLeveling } from '../controllers/LevelingController';
import { getDiscount  } from '../controllers/DiscountController';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { images } from '../assets/images';
import { Section } from './common';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';
import { Components } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);

class BaseMap extends Component {
  componentWillMount() {
    this.setState({
      checkInLoader: false
    });
    this.props.requestLocationPermission(true);
    this.props.getUser();
    this.props.getAchievementsPerUser();
  }

  checkIn(landmark, userLocation, userCountryAndCity, landmarksCount, boostShare) {
    const { achievementsData } = this.props.achievements;
    console.log("=====================================")
    // const isNearBy = checkHaversineDistance(userLocation, landmark.coordinate, landmark.distance);
    const isNearBy = checkBounds(landmark.viewport, userLocation);
    console.log(isNearBy)

    const isAchieved = isUserAchieved(achievementsData.achievements, landmark);

    if( true || isNearBy && !isAchieved) {
      // assign points to the customer
      const userUID = this.props.userUID;
      this.setState({
        checkInLoader: true
      });

      checkInLeveling(landmark, userUID, achievementsData, boostShare).then((levelData) => {
          this.setState({
            checkInLoader: false
          });
          this.props.navigation.navigate('CheckedIn', {user: firebase.auth().currentUser, landmark, levelData, achievementsData});

        // The first parameter decides whether or not to store the discount data in the database
        // getDiscount(false, userUID, achievementsData, userCountryAndCity.userCity, landmarksCount).then((discountData)=>{
        // });
      });
    } else {
      let errorMessage = '';

      if (!isNearBy && isAchieved) {
        errorMessage = Components.CheckIn.errorMessageCheckedAndFarAway;
      } else if (!isNearBy) {
        errorMessage = Components.CheckIn.errorMessageFarAway;
      } else {
        errorMessage = Components.CheckIn.errorMessageAlreadyChecked;
      }

      Alert.alert(
        Components.CheckIn.errorMessageNotPossible,
        errorMessage,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  // TODO Move this in controller with whatsupp functionality
  openGoogleMaps(longitude, latitude) {
    let coords = latitude.toString() + ', ' + longitude.toString();
    let url = "https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=" + coords;
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { userLocation, userCountryAndCity } = this.props.userGeoLocation;
    const { achievementsData } = this.props.achievements;
    const landmarkData = this.props.navigation.getParam('landmark');
    const landmarksCount = this.props.navigation.getParam('landmarksCount');
    const { latitude, longitude } = landmarkData.coordinate;
    let boostShare = false;

    if(achievementsData.boostShareExpire && achievementsData.boostShareExpire.seconds) {
      let boostShareExpire = new Date(achievementsData.boostShareExpire.seconds * 1000);
      boostShareExpire = boostShareExpire.setMonth(boostShareExpire.getMonth() + 1);

      if(boostShareExpire > Date.now()) {
        boostShare = true;
      }
    }

    const landmarkDirection = {
      latitude,
      longitude
    };

    if(!userLocation.longitude) {
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return (
        <View style={styles.exploreBaseMapWrap}>
          <MapView style={styles.exploreBaseMap}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {/* <Marker
              coordinate={{latitude: userLocation.latitude, longitude: userLocation.longitude }}
            >
              <Image style={{ width: 45, height: 45 }} source={require('../assets/images/user_pin.png')} />
            </Marker> */}

            <Marker
              tracksViewChanges={false}
              coordinate={landmarkDirection}
            >
              <FontAwesome5 style={{fontSize: 36, color: '#3643FF' }} name={'map-marker'} solid />
            </Marker>

            <MapViewDirections
              origin={{latitude: userLocation.latitude, longitude: userLocation.longitude}} //this cause the blinking issue
              destination={landmarkDirection}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#FF7E29"
              mode='walking'
            />
          </MapView>

          <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={styles.exploreBaseMapBackBtn}>
            <Icon style={styles.exploreBaseMapBackIcon} name="arrow-left"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.openGoogleMaps(longitude,latitude)} style={styles.exploreDirectionBtn}>
            <FontAwesome5 style={styles.exploreDirectionIcon} name={'directions'} solid />
            <Text style={styles.exploreDirectionBtnText}>Get Direction</Text>
          </TouchableOpacity>

          <Section style={styles.exploreButtonSection}>
            { true ||  checkBounds(landmarkData.viewport, userLocation)
            ?
            <View>
              {this.state.checkInLoader ?
                <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
              : null}

              {boostShare ? 
                <Text style={styles.exploreBoostText}><FontAwesome5 style={styles.exploreBoostIcon} name={'rocket'} solid />x2 Boost XP</Text>
              :
              null}

              <TouchableOpacity onPress={()=>this.checkIn(landmarkData, userLocation, userCountryAndCity, landmarksCount, boostShare)} style={styles.exploreCheckInBtn}>
                <FontAwesome5 style={styles.exploreCheckInIcon} name={'check-circle'} regular />
                <Text style={styles.exploreCheckInTextBtn}>{Components.CheckIn.buttonLabel}</Text>
              </TouchableOpacity>
            </View>
            :
              <View>
                {boostShare ? <Text style={styles.exploreBoostText}><FontAwesome5 style={styles.exploreBoostIcon} name={'rocket'} solid /> x2 Boost xp</Text> : null}
                <TouchableOpacity onPress={()=>this.checkIn(landmarkData, userLocation, userCountryAndCity, landmarksCount, boostShare)} style={[styles.exploreCheckInBtn, styles.exploreCheckInDisabledBtn]}>
                  <FontAwesome5 style={styles.exploreCheckInIcon} name={'check-circle'} regular />
                  <Text style={styles.exploreCheckInTextBtn}>{Components.CheckIn.errorMessageButton}</Text>
                </TouchableOpacity>
              </View>
            }
          </Section>
        </View>
      );
    }
  }
}

const mapStateToProps = ({userGeoLocation, user, achievements}) => {
  const { userUID } = user;

  return { userGeoLocation, userUID, achievements };
};

export default connect(mapStateToProps, { requestLocationPermission, getUser, getAchievementsPerUser })(BaseMap);
