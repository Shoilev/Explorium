import firebase from 'react-native-firebase';
import {
  COUNTRIES_FETCH_SUCCESS,
} from './types';

export const getCountries = () => {
  return (dispatch) => {
    firebase.firestore().collection('countries')
    .get().then(querySnapshot => {
        console.log('firebase');
        const countries = [];
        querySnapshot.forEach(doc => {
          countries.push({
            countryName: doc.data().name
          })
        })

        dispatch({ type: COUNTRIES_FETCH_SUCCESS, payload: countries })
      })
      .catch(err => {
        console.log('Error getting countries', err);
      });
  }
}