import firebase from 'react-native-firebase';
import {getLocationCountryAndCity}  from './GeoLocationActions';
import { checkHaversineDistance, isEmpty } from '../helpers';
import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL
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
        querySnapshot.forEach(doc => {
          console.log(doc)
          landmarks.push({
            id: doc.id,
            landmarkName: doc.data().name,
            landmarkImage: doc.data().image,
            landmarkDescription: doc.data().description,
            landmarkPoints: doc.data().points,
            coordinate: {
              latitude: doc.data().latitude || LATITUDE,
              longitude: doc.data().longitude || LONGITUDE
            }
          })
        })

        if(isEmpty(landmarks)) {
          dispatch({ type: LANDMARKS_FETCH_FAIL, payload: {errorMessage: 'Explore functionality is not available for your location. Go back and explore.'} });
        }

        landmarks.sort(function(a, b) {
          return b.landmarkPoints - a.landmarkPoints;
        })

        dispatch({ type: LANDMARKS_FETCH_SUCCESS, payload: landmarks });
        return landmarks;
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
