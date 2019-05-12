import Geolocation from 'react-native-location';
import firebase from 'react-native-firebase';
import { BackHandler, DeviceEventEmitter } from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { App } from '../resources/labels.json';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';

import {
  GEO_LOCATION_FETCH_SUCCESS,
  GEO_LOCATION_USER_FAIL,
  GEO_LOCATION_COUNTRY_CITY_SUCCESS,
  GEO_LOCATION_COUNTRY_CITY_FAIL
} from './types';

BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
  //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
  LocationServicesDialogBox.forceCloseDialog();
});

DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
   console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
});

export const requestLocationPermission = () => {
  return (dispatch) => {
    Geolocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
        rationale: {
          title: App.Premissions.Location.title,
          message: App.Premissions.Location.title.message,
          buttonNeutral: App.Premissions.Location.buttonNeutral,
          buttonNegative: App.Premissions.Location.buttonNegative,
          buttonPositive: App.Premissions.Location.buttonPositive
        }
      }
    }).then(granted => {
      if(granted) {
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
          ok: "YES",
          cancel: "NO",
          enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
          showDialog: true, // false => Opens the Location access page directly
          openLocationServices: true, // false => Directly catch method is called if location services are turned off
          preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
          preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
          providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
        }).then(function(success) {
          console.log(success)
          Geolocation.getLatestLocation({ timeout: 60000 }).then(location => {
            console.log(location);
            dispatch({ type: GEO_LOCATION_FETCH_SUCCESS, payload: location})
            console.log('You can use the Location');
          }).catch(err=>{
            console.log(err)
            dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
          });
        }).catch((error) => {
          console.log(error.message); // error.message => "disabled"
          dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
        });
      } else {
        dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
        console.log('Location permission denied');
      }
    })
    .catch(error => dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} }));
  }
}

export const getLocationCountryAndCity = ( lat, long ) => {
  return (dispatch) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key='+ GOOGLE_MAPS_APIKEY;
    console.log(url);
    return fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log("RESULTS HERE:", responseData)
        if(responseData.results && responseData.results.length > 0) {
          let userAddress = responseData.results[0].formatted_address.split(',');
          let userCountryAndCity = userAddress.splice(userAddress.length-2, userAddress.length-1);
          let userCity = userCountryAndCity[0].trim();
          let userCountry = userCountryAndCity[1].trim();
          let userDataAddress = {
            userCity,
            userCountry
          };

          dispatch({ type: GEO_LOCATION_COUNTRY_CITY_SUCCESS, payload: userDataAddress })
          return userDataAddress;
        } else {
          dispatch({ type: GEO_LOCATION_COUNTRY_CITY_FAIL, payload: {error: 'No results'} })
          return {};
        }
    })
    .catch((error) =>{
      console.error(error);
      dispatch({ type: GEO_LOCATION_COUNTRY_CITY_FAIL, payload: {} })
      return {};
    })
  }
}
