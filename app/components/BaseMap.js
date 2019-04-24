import React, { Component } from 'react';
import { Image, View, Linking, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { requestLocationPermission, getUser } from '../actions';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { Button, Section } from './common';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';

const styles = createStyles(ExploreStyle);

// TODO: move as a helper function (index.js and haversineDistance.js)
const haversineDistance = function(coords1, coords2) {
  function toRad(x) {
    return x * Math.PI / 180;
  }

  const lon1 = coords1.longitude;
  const lat1 = coords1.latitude;

  const lon2 = coords2.longitude;
  const lat2 = coords2.latitude;

  const R = 6371; // km

  const x1 = lat2 - lat1;
  const dLat = toRad(x1);
  const x2 = lon2 - lon1;
  const dLon = toRad(x2)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  // return d < 0.05; // 50 meters
  return d < 10000;
}

class BaseMap extends Component {
  componentWillMount() {
    this.props.requestLocationPermission();
    this.props.getUser();
  }

  checkIn(landmark, userLocation) {
    let isNearBy = haversineDistance(userLocation, landmark.coordinate);

    if(isNearBy) {
      // assign points to the customer
      const userUID = this.props.userUID;
      console.log(userUID);
      console.log(landmark);

      const db = firebase.firestore().collection('users').doc(userUID);
      console.log(firebase.firestore.FieldValue);
      db.update({
        achievements: firebase.firestore.FieldValue.arrayUnion(landmark),
        allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints)
      })
    } else {
      // do nothing ???
    }
    console.log(isNearBy);
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
              <Image style={{ width: 45, height: 45 }} source={require('../assets/images/pin.png')} />
            </Marker>

            <MapViewDirections
              origin={userLocation}
              destination={landmarkDirection}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="hotpink"
            />
          </MapView>

          <Section style={styles.exploreButtonSection}>
            <Button onPress={()=>this.openGoogleMaps(longitude,latitude)} textStyle={styles.exploreDirectionBtnText} buttonStyle={styles.exploreDirectionBtn}>Get direction</Button>
            { haversineDistance(userLocation, landmarkData.coordinate) 
            ?
              <Button onPress={()=>this.checkIn(landmarkData, userLocation)} textStyle={styles.exploreCheckInTextBtn} buttonStyle={styles.exploreCheckInBtn}>Check in</Button>
            :
              <Button onPress={()=>this.checkIn(landmarkData, userLocation)} textStyle={styles.exploreCheckInTextBtn} buttonStyle={styles.exploreCheckInDisabledBtn}>You are too far away</Button>
            }
          </Section>
        </View>
      );
    }
  }
}

const mapStateToProps = ({userGeoLocation, user}) => {
  const { userUID } = user;

  return { userGeoLocation, userUID };
};

export default connect(mapStateToProps, { requestLocationPermission, getUser })(BaseMap);
