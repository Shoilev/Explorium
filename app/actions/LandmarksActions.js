import firebase from 'react-native-firebase';
import {getLocationCountryAndCity}  from './GeoLocationActions';
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

export const getLandmarks = (country, city) => {
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
            landmarkPoints: dataDoc.points,
            isShadowLandmark,
            coordinate: {
              latitude: dataDoc.latitude || LATITUDE,
              longitude: dataDoc.longitude || LONGITUDE
            }
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
      return dispatch(getLandmarks(result.userCountry, result.userCity)).then((landmarkResult)=>{
        landmarkResult.sort((a,b) => {
          let distanceA = checkHaversineDistance({latitude: lat, longitude: long}, a.coordinate, true);
          let distanceB = checkHaversineDistance({latitude: lat, longitude: long}, b.coordinate, true);
          
          if (distanceA < distanceB) {return -1;}
          if (distanceA > distanceB) {return 1;}
          return 0;
        });

        return landmarkResult;
      });
    })
  }
}

export const switchToShadowCities = (value) => {
  return { type: LANDMARKS_SHADOW_CITIES, payload: value };
};
