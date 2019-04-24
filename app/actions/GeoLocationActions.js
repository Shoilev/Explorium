import Geolocation from 'react-native-location';
import { App } from '../resources/labels.json';
import { GOOGLE_MAPS_APIKEY  } from '../settings/global.json';

import {
  GEO_LOCATION_FETCH_SUCCESS,
  GEO_LOCATION_USER_FAIL,
  GEO_LOCATION_COUNTRY_CITY_SUCCESS,
  GEO_LOCATION_COUNTRY_CITY_FAIL
} from './types';

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
      console.log(granted)
      if(granted) {
        Geolocation.getLatestLocation({ timeout: 60000 }).then(location => {
          console.log(location);
          dispatch({ type: GEO_LOCATION_FETCH_SUCCESS, payload: location})
          console.log('You can use the Location');
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
