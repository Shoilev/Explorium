import firebase from 'react-native-firebase';
import {getLocationCountryAndCity}  from './GeoLocationActions';
import {
  LANDMARKS_FETCH_SUCCESS,
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
            coordinate: {
              latitude: doc.data().latitude || LATITUDE,
              longitude: doc.data().longitude || LONGITUDE
            }
          })
        })

        // TODO: sort by points
        landmarks.sort(function(a, b) {
          return a.landmarkName.localeCompare(b.landmarkName);
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
        return landmarkResult;
      });
    })
  }
}
