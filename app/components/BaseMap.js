import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, Linking, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { requestLocationPermission, getUser, getAchievementsPerUser } from '../actions';
import { isUserAchieved, checkHaversineDistance } from '../helpers';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { images } from '../assets/images';
import { Button, Section } from './common';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';

const styles = createStyles(ExploreStyle);

class BaseMap extends Component {
  componentWillMount() {
    this.props.requestLocationPermission();
    this.props.getUser();
    this.props.getAchievementsPerUser();
  }

  checkIn(landmark, userLocation) {
    const { achievementsData } = this.props.achievements;
    const isNearBy = checkHaversineDistance(userLocation, landmark.coordinate);

    const isAchieved = isUserAchieved(achievementsData.achievements, landmark);
    // const isAchieved = false;

    if(isNearBy && !isAchieved) {
      // assign points to the customer
      const userUID = this.props.userUID;

      const db = firebase.firestore().collection('users').doc(userUID);
      db.update({
        achievements: firebase.firestore.FieldValue.arrayUnion(landmark),
        allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints)
      });

      this.props.navigation.navigate('CheckedIn', {user: firebase.auth().currentUser, landmark})
    } else {
      // Show error
      // Move to resources
      let errorMessage = '';

      if (!isNearBy && isAchieved) {
        errorMessage = 'You are too far away from the landmark and also you have already checked this landmark';
      } else if (!isNearBy) {
        errorMessage = 'You are too far away from the landmark';
      } else {
        errorMessage = 'You have already checked this landmark';
      }

      Alert.alert(
        'Check in is not possible',
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
    const { userLocation } = this.props.userGeoLocation;
    const landmarkData = this.props.navigation.getParam('landmark');
    const { latitude, longitude } = landmarkData.coordinate;

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
              coordinate={landmarkDirection}
            >
              <Image style={{ width: 45, height: 45 }} source={require('../assets/images/pin-full.png')} />
            </Marker>

            <MapViewDirections
              origin={userLocation}
              destination={landmarkDirection}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="hotpink"
            />
          </MapView>

          <TouchableOpacity onPress={()=>this.openGoogleMaps(longitude,latitude)} style={styles.exploreDirectionBtn}>
            <Image style={styles.exploreDirectionIcon} source={images.directionImage} />
            <Text style={styles.exploreDirectionBtnText}>Get Direction</Text>
          </TouchableOpacity>
          <Section style={styles.exploreButtonSection}>
            { checkHaversineDistance(userLocation, landmarkData.coordinate)
            ?
              <TouchableOpacity onPress={()=>this.checkIn(landmarkData, userLocation)} style={styles.exploreCheckInBtn}>
                <Image style={styles.exploreCheckInIcon} source={images.checkedIconLarge} />
                <Text style={styles.exploreCheckInTextBtn}>Check in</Text>
              </TouchableOpacity>
            :
              <TouchableOpacity onPress={()=>this.checkIn(landmarkData, userLocation)} style={[styles.exploreCheckInBtn, styles.exploreCheckInDisabledBtn]}>
                <Image style={styles.exploreCheckInIcon} source={images.checkedIconLarge} />
                <Text style={styles.exploreCheckInTextBtn}>You are too far away</Text>
              </TouchableOpacity>
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
