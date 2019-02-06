import React, { Component } from 'react';
import { ImageBackground, Image, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { ExploreStyle } from '../assets/styles/explore';
import { Section, Button } from '../components/common';
import { Screens } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const exploreumSrc = images.exploreumBackground;
const exploreEarth = images.earth;

export default class Explore extends Component {

  onButtonPress() {
    const { navigation } = this.props;
    // TODO: move to state
    let latitude = 42.684617;
    let longitude = 23.318993;
    navigation.navigate('ExploreMap',{ latitude, longitude });
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Exploreum App Location Premission',
          message: 'Exploreum App needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Instead of navigator.geolocation, just use Geolocation.
        Geolocation.getCurrentPosition( (position) => {
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { 
          enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 
        });
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentWillMount() {
    this.requestLocationPermission();
  }

  componentDidMount() {

  }

  render() {
    return (
      <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
        <Section>
          <Image source={exploreEarth} />
          <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
        </Section>
      </ImageBackground>
    );
  }
}
