import firebase from 'react-native-firebase';
import {getLocationCountryAndCity}  from './GeoLocationActions';
import {getCitiesPerCountry}  from './CitiesActions';
import {getCountries}  from './CountriesActions';
import { checkHaversineDistance, isEmpty } from '../helpers';
import { GOOGLE_MAPS_APIKEY, DefaultLocationData  } from '../settings/global.json';
import {
  LANDMARKS_FETCH_SUCCESS,
  LANDMARKS_FETCH_FAIL,
  LANDMARKS_SHADOW_CITIES,
  LANDMARKS_SHADOW_FETCH_SUCCESS,
  LANDMARKS_ALL_FETCH_SUCCESS,
  HANDLE_LANDMARKS_MAP_VIEW
} from './types';

// SOFIA
const LATITUDE = 42.684617;
const LONGITUDE = 23.318993;

export const getLandmarks = (country, city, cityPoints) => {
  return (dispatch) => {
    return firebase.firestore().collection('countries').doc(country).collection('cities').doc(city).collection('landmarks')
    .get().then(querySnapshot => {
        const landmarks = [];
        const shadowLandmarks = [];
        let allLandmarks = [];

        querySnapshot.forEach(doc => {
          const dataDoc = doc.data();
          const isShadowLandmark = dataDoc.isShadow || false;
          const landmarkData = {
            id: doc.id,
            landmarkName: dataDoc.name,
            landmarkImage: dataDoc.image + '&key=' + GOOGLE_MAPS_APIKEY,
            landmarkDescription: dataDoc.description,
            landmarkPoints: isShadowLandmark ? Math.floor(cityPoints / querySnapshot.size * 2) : Math.floor(cityPoints / querySnapshot.size),
            isShadowLandmark,
            coordinate: {
              latitude: dataDoc.latitude || LATITUDE,
              longitude: dataDoc.longitude || LONGITUDE
            },
            viewport: dataDoc.viewport,
            distance: dataDoc.distance || false,
            city
          };

          if(isShadowLandmark) {
            shadowLandmarks.push(landmarkData);
          } else {
            landmarks.push(landmarkData);
          }
        });

        allLandmarks = landmarks.concat(shadowLandmarks);

        if(isEmpty(landmarks) || isEmpty(allLandmarks)) {
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
        dispatch({ type: LANDMARKS_ALL_FETCH_SUCCESS, payload: allLandmarks });
        return allLandmarks;
      })
  }
}

export const getLandmarksByLocation = ( lat, long ) => {
  return (dispatch) => {
    return dispatch(getLocationCountryAndCity(lat, long)).then((result)=>{
      return firebase.firestore().collection('countries').doc(result.userCountry)
      .get().then(doc => {
        if(!doc.data() || !doc.data().isOnline) {
          return firebase.firestore().collection('countries').doc(DefaultLocationData.country).get().then(doc=>{
            let countryRate = doc.data().rate || 1;

            return firebase.firestore().collection('countries').doc(DefaultLocationData.country).collection('cities').doc(DefaultLocationData.city).get()
            .then(doc => {
              let cityPoints = doc.data().points * countryRate || 0;
              return dispatch(getLandmarks(DefaultLocationData.country, DefaultLocationData.city, cityPoints)).then((landmarkResult) => {
                return dispatch({ type: LANDMARKS_FETCH_FAIL, payload: { errorMessage: 'Explore functionality is not available for your location. Go back and explore.'} });
              })
            }).catch(e=>{
              return dispatch({ type: LANDMARKS_FETCH_FAIL, payload: {errorMessage: 'Explore functionality is not available for your location. Go back and explore.'} });
            })
          });
        }
        let countryRate = doc.data().rate || 1;
        
        return firebase.firestore().collection('countries').doc(result.userCountry).collection('cities').doc(result.userCity)
        .get().then(doc => {
          if(!doc.data()) {
            return firebase.firestore().collection('countries').doc(DefaultLocationData.country).collection('cities').doc(DefaultLocationData.city).get()
            .then(doc => {
              let cityPoints = doc.data().points * countryRate || 0;
              return dispatch(getLandmarks(DefaultLocationData.country, DefaultLocationData.city, cityPoints)).then((landmarkResult) => {
                return dispatch({ type: LANDMARKS_FETCH_FAIL, payload: { errorMessage: 'Explore functionality is not available for your location. Go back and explore.'} });
              })
            })
          } else {
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
          }
        })
      })
    })
  }
}

export const landmarksMapView = (enable) => {
  console.log(enable)
  return { type: HANDLE_LANDMARKS_MAP_VIEW, payload: enable };
}

export const switchToShadowCities = (value) => {
  return { type: LANDMARKS_SHADOW_CITIES, payload: value };
};
