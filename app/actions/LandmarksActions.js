import firebase from 'react-native-firebase';
import {getLocationCountryAndCity}  from './GeoLocationActions';
import {getCitiesPerCountry}  from './CitiesActions';
import {getCountries}  from './CountriesActions';
import { checkHaversineDistance, isEmpty } from '../helpers';
import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL,
  LANDMARKS_SHADOW_CITIES,
  LANDMARKS_SHADOW_FETCH_SUCCESS,
  LANDMARKS_ALL_FETCH_SUCCESS
} from './types';

// SOFIA
const LATITUDE = 42.684617;
const LONGITUDE = 23.318993;

export const getLandmarks = (country, city, cityPoints) => {
  return (dispatch) => {
    return firebase.firestore().collection('countries').doc(country).collection('cities').doc(city).collection('landmarks')
    .get().then(querySnapshot => {
        console.log('firebase');
        const landmarks = [];
        const shadowLandmarks = [];
        let allLandmarks = [];

        querySnapshot.forEach(doc => {
          console.log(doc)
          const dataDoc = doc.data();
          const isShadowLandmark = dataDoc.isShadow || false;
          const landmarkData = {
            id: doc.id,
            landmarkName: dataDoc.name,
            landmarkImage: dataDoc.image,
            landmarkDescription: dataDoc.description,
            landmarkPoints: isShadowLandmark ? cityPoints / querySnapshot.size * 2 : cityPoints / querySnapshot.size,
            isShadowLandmark,
            coordinate: {
              latitude: dataDoc.latitude || LATITUDE,
              longitude: dataDoc.longitude || LONGITUDE
            },
            distance: dataDoc.distance || false
          };

          if(isShadowLandmark) {
            shadowLandmarks.push(landmarkData);
          } else {
            landmarks.push(landmarkData);
          }
        });

        allLandmarks = landmarks.concat(shadowLandmarks);

        if(isEmpty(landmarks) || isEmpty(shadowLandmarks) || isEmpty(allLandmarks)) {
          dispatch({ type: LANDMARKS_FETCH_FAIL, payload: {errorMessage: 'Explore functionality is not available for your location. Go back and explore.'} });
        }

        landmarks.sort(function(a, b) {
          return b.landmarkPoints - a.landmarkPoints;
        });

        shadowLandmarks.sort(function(a, b) {
          return b.landmarkPoints - a.landmarkPoints;
        });

        allLandmarks.sort(function(a, b) {
          return b.landmarkPoints - a.landmarkPoints;
        });

        dispatch({ type: LANDMARKS_FETCH_SUCCESS, payload: landmarks });
        dispatch({ type: LANDMARKS_SHADOW_FETCH_SUCCESS, payload: shadowLandmarks });
        dispatch({ type: LANDMARKS_ALL_FETCH_SUCCESS, payload: shadowLandmarks });
        return allLandmarks;
      })
  }
}

export const getLandmarksByLocation = ( lat, long ) => {
  return (dispatch) => {
    return dispatch(getLocationCountryAndCity(lat, long)).then((result)=>{
      return firebase.firestore().collection('countries').doc(result.userCountry)
      .get().then(doc => {
        let countryRate = doc.data().rate || 1;

        return firebase.firestore().collection('countries').doc(result.userCountry).collection('cities').doc(result.userCity)
        .get().then(doc => {
          let cityPoints = doc.data().points * countryRate || 0;

          return dispatch(getLandmarks(result.userCountry, result.userCity, cityPoints)).then((landmarkResult)=>{
            landmarkResult.sort((a,b) => {
              let distanceA = checkHaversineDistance({latitude: lat, longitude: long}, a.coordinate, false, true);
              let distanceB = checkHaversineDistance({latitude: lat, longitude: long}, b.coordinate, false, true);
              
              if (distanceA < distanceB) {return -1;}
              if (distanceA > distanceB) {return 1;}
              return 0;
            });
  
            return landmarkResult;
          });
        })
      })
    })
  }
}

export const switchToShadowCities = (value) => {
  return { type: LANDMARKS_SHADOW_CITIES, payload: value };
};
