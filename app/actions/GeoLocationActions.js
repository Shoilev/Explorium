import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { App } from '../resources/labels.json';

import {
  GEO_LOCATION_FETCH_SUCCESS,
  GEO_LOCATION_USER_FAIL
} from './types';

export const requestLocationPermission = () => {
  return (dispatch) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: App.Premissions.Location.title,
        message: App.Premissions.Location.title.message,
        buttonNeutral: App.Premissions.Location.buttonNeutral,
        buttonNegative: App.Premissions.Location.buttonNegative,
        buttonPositive: App.Premissions.Location.buttonPositive
      },
    ).then(()=>{
      Geolocation.getCurrentPosition( (position) => {
        console.log(position);
        dispatch({ type: GEO_LOCATION_FETCH_SUCCESS, payload: position.coords })
      }, (error) => {
        // See error code charts below.
        console.log('Location permission denied');
        console.log(error.code, error.message);
         dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
      },
      { 
        enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 
      });
      console.log('You can use the Location');
    })
    .catch(error => dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} }));
  }
}
