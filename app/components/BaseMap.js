import React, { Component } from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';

const styles = createStyles(ExploreStyle);
//SOFIA
let coordinate = {
  latitude: 42.684617,
  longitude: 23.318993
}

export default class BaseMap extends Component {
  componentWillMount() {
    // TODO: move to settings the default possition and get it from state
    const {latitude, longitude} = this.props.navigation.getParam('coordinate', coordinate);
    
    coordinate.latitude = latitude;
    coordinate.longitude = longitude;
  }

  onButtonPress() {
    console.log('TODO');
  }

  render() {
    return (
      <MapView style={styles.exploreBaseMap}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude }}
        >
          <Image style={{ width: 45, height: 45 }} source={require('../assets/images/pin.png')} />
        </Marker>
      </MapView>
    );
  }
}
