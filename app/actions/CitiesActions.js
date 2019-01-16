import firebase from 'react-native-firebase';
import {
  CITIES_PER_COUNTRY_FETCH_SUCCESS,
} from './types';

export const getCitiesPerCountry = (country) => {
  return (dispatch) => {
    firebase.firestore().collection('countries').doc(country).collection('cities')
    .get().then(querySnapshot => {
        console.log('firebase');
        const citites = [];
        querySnapshot.forEach(doc => {
          console.log(doc)
          citites.push({
            cityName: doc.data().name,
            cityImage: doc.data().image,
            cityShortDescription: doc.data().shortDescription
          })
        })

        // TODO: sort by points
        citites.sort(function(a, b) {
          return a.cityName.localeCompare(b.cityName);
        })

        dispatch({ type: CITIES_PER_COUNTRY_FETCH_SUCCESS, payload: citites })
      })
  }
}
