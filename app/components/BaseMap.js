import React, { Component } from 'react';
import { Image, View, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { connect } from 'react-redux';
import { requestLocationPermission } from '../actions';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { Button, Section } from './common';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';

const styles = createStyles(ExploreStyle);

class BaseMap extends Component {
  componentWillMount() {
    this.props.requestLocationPermission();
  }

  onButtonPress() {
    console.log('TODO');
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
    const { latitude, longitude } = this.props.navigation.getParam('coordinate');

    const landmarkDirection = {
      latitude,
      longitude
    };

    return (

      <View style={styles.exploreBaseMapWrap}>
        <MapView style={styles.exploreBaseMap}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{latitude: userLocation.latitude, longitude: userLocation.longitude }}
          >
            <Image style={{ width: 45, height: 45 }} source={require('../assets/images/user_pin.png')} />
          </Marker>

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
          <Button textStyle={styles.exploreCheckInTextBtn} buttonStyle={styles.exploreCheckInBtn}>Check in</Button>
        </Section>
      </View>
    );
  }
}

const mapStateToProps = ({userGeoLocation}) => {
  return { userGeoLocation };
};

export default connect(mapStateToProps, { requestLocationPermission })(BaseMap);
