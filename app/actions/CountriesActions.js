import firebase from 'react-native-firebase';
import {
  COUNTRIES_FETCH_SUCCESS,
  COUNTRIES_UPDATE
} from './types';

export const getCountries = () => {
  return (dispatch) => {
    firebase.firestore().collection('countries')
    .get().then(querySnapshot => {
        console.log('firebase');
        const countries = [];
        querySnapshot.forEach(doc => {
          countries.push({
            countryName: doc.data().name,
            countryImage: doc.data().image
          })
        })

        countries.sort(function(a, b) {
          return a.countryName.localeCompare(b.countryName);
        })

        dispatch({ type: COUNTRIES_FETCH_SUCCESS, payload: countries })
      })
  }
}

export const updateCountries = (countriesData) => {
  return {
    type: COUNTRIES_UPDATE,
    payload: countriesData
  };
};