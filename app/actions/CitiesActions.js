import firebase from 'react-native-firebase';
import {
  CITIES_PER_COUNTRY_FETCH_SUCCESS,
} from './types';

export const getCitiesPerCountry = (country, countryRate) => {
  return (dispatch) => {
    firebase.firestore().collection('countries').doc(country).collection('cities')
    .get().then(querySnapshot => {
      console.log('firebase');
      const citites = [];
      querySnapshot.forEach( doc => {
        console.log(doc);
        citites.push({
          cityName: doc.data().name,
          cityImage: doc.data().image,
          cityShortDescription: doc.data().shortDescription,
          cityPoints: doc.data().points * countryRate
        })
      });

      citites.sort(function(a, b) {
        return a.cityName.localeCompare(b.cityName);
      })

      dispatch({ type: CITIES_PER_COUNTRY_FETCH_SUCCESS, payload: citites });
    })
  }
}

// function getLandmarkPoints(country, citiesArr) {
//   let index = 0;
//   function request() {
//     return firebase.firestore().collection('countries').doc(country).collection('cities').doc(citiesArr[index].cityName).collection('landmarks')
//     .get().then(landmarkQuery => {
//       let citySumPoints = 0;

//       landmarkQuery.forEach(landmarkDoc => {
//         citySumPoints += landmarkDoc.data().points || 0;
//       });

//       citiesArr[index] = {...citiesArr[index], ...{ cityPoints: citySumPoints} };

//       index++;

//       if (index >= citiesArr.length) {
//         return citiesArr;
//       }

//       return request();
//     });

//   }
//   return request();
// }
