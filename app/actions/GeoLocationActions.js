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
  GEO_LOCATION_COUNTRY_CITY_FAIL,
  GEO_LOCATION_IMAGE_URI
} from './types';

Geolocation.configure({
  desiredAccuracy: {
    ios: "best",
    android: "highAccuracy"
  },
  interval: 1000,
  maxWaitTime: 1000
});

BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
  //do not use this method if you are using navigation."preventBackClick: false" is already doing the same thing.
  // LocationServicesDialogBox.forceCloseDialog();
});

DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { // only trigger when "providerListener" is enabled
   console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
});


// LocationServicesDialogBox.checkLocationServicesIsEnabled({
//   message: "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
//   ok: "YES",
//   cancel: "NO",
//   enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
//   showDialog: true, // false => Opens the Location access page directly
//   openLocationServices: true, // false => Directly catch method is called if location services are turned off
//   preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
//   preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
//   providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
// }).then(function(success) {
// }).catch((error) => {
//   console.log(error.message); // error.message => "disabled"
//   dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
// });

export const requestLocationPermission = (requestCountry = false) => {
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
      console.log(granted);
      const defaultImageURI = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/images%2FBulgaria.jpg?alt=media';
      if(granted) {
          if(requestCountry) {
            console.log('Request country');
            Geolocation.getLatestLocation({ timeout: 6000 }).then(location => {
              console.log(location)
              return dispatch(getLocationCountryAndCity(location.latitude, location.longitude)).then(result=>{
                console.log(result.userCity)
                console.log('result.userCity')
                let imageURI = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/images%2F'+ result.userCountry + '.jpg?alt=media';
                console.log('image')
                console.log(imageURI)

                let imageData = {
                  imageURI,
                  defaultImageURI: defaultImageURI,
                  imageCountry: result.userCountry,
                  imageCity: result.userCity,
                  errorMsg: false
                }

                dispatch({ type: GEO_LOCATION_IMAGE_URI, payload: imageData });
              });
            }).catch(err=>{
              let imageData = {
                imageURI: defaultImageURI,
                defaultImageURI: defaultImageURI,
                imageCountry: 'Bulgaria',
                imageCity: 'Sofia',
                errorMsg: 'Please turn on your location!'
              };

              dispatch({ type: GEO_LOCATION_IMAGE_URI, payload: imageData });
            });
          }

          let isLoaded = false;
          Geolocation.subscribeToLocationUpdates(location => {
            console.log(location);
            console.log('You can use the Location');
            dispatch({ type: GEO_LOCATION_FETCH_SUCCESS, payload: location[0]});

            if(!isLoaded) {
              dispatch(getLocationCountryAndCity(location[0].latitude, location[0].longitude)).then(result=>{
                console.log(result.userCity)
                console.log('result.userCity')
                let imageURI = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/images%2F'+ result.userCountry + '.jpg?alt=media';
  
                let imageData = {
                  imageURI,
                  defaultImageURI: defaultImageURI,
                  imageCountry: result.userCountry,
                  imageCity: result.userCity,
                  errorMsg: false
                }
  
                dispatch({ type: GEO_LOCATION_IMAGE_URI, payload: imageData });
                isLoaded = true;
              })
            }
          });
      } else {
        dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} })
        console.log('Location permission denied');
      }
    })
    .catch(error => dispatch({ type: GEO_LOCATION_USER_FAIL, payload: {} }));
  }
}

const getLocationDetails = (location) => {
  return (dispatch) => {
    return dispatch(getLocationCountryAndCity(location.latitude, location.longitude)).then(result=>{
      console.log(result.userCity)
      console.log('result.userCity')
      let imageURI = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/images%2F'+ result.userCity + '.jpg?alt=media';

      let imageData = {
        imageURI,
        imageCountry: result.userCountry,
        imageCity: result.userCity,
        errorMsg: false
      }

      dispatch({ type: GEO_LOCATION_IMAGE_URI, payload: imageData });
    })
 }
}

export const getLocationCountryAndCity = ( lat, long ) => {
  return (dispatch) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key='+ GOOGLE_MAPS_APIKEY;
    return fetch(url, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log("RESULTS HERE:", responseData)
        if(responseData.results && responseData.results.length > 0) {
          // let userAddress = responseData.results[0].formatted_address.split(',');
          // let userCountryAndCity = userAddress.splice(userAddress.length-2, userAddress.length-1);
          // let userCity = userCountryAndCity[0].trim();
          // let userCountry = userCountryAndCity[1].trim();
          // let userDataAddress = {
          //   userCity,
          //   userCountry
          // };
          
          let userDataAddress = responseData.results.map(({address_components}) => {
            let city;
            let country;
            address_components.forEach(address=> {
              if( address.types.indexOf('locality') !== -1 ) {
                city = address.long_name;
              }
              if( address.types.indexOf('country') !== -1 ) {
                country = address.long_name;
              }
            })

            return city && country ? {userCity: city, userCountry: country} : false
          }).find(data=> data && data.userCity && data.userCountry)

          console.log(userDataAddress)

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
