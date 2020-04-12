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
          console.log(doc)
          countries.push({
            countryName: doc.data().name,
            countryImage: doc.data().image,
            countryIsOnline: doc.data().isOnline,
            countryRate: doc.data().rate
          })
        })

        // TODO: waiting for an update from firestore to make possible to get child collections.
        getCountriesPoints(countries).then(dataWithPoints => {
          dataWithPoints.sort(function(a, b) {
            return b.countryPoints - a.countryPoints;
          })
          return dispatch({ type: COUNTRIES_FETCH_SUCCESS, payload: dataWithPoints })
        }).catch(err=>{
          console.log(err);
          countries.sort(function(a, b) {
            return a.countryName.localeCompare(b.countryName);
          });

          return dispatch({ type: COUNTRIES_FETCH_SUCCESS, payload: countries })
        });
      })
  }
}

export const updateCountries = (countriesData) => {
  return {
    type: COUNTRIES_UPDATE,
    payload: countriesData
  };
};

function getCountriesPoints(countriesArr) {
  let index = 0;

  function request() {
    return firebase.firestore().collection('countries').doc(countriesArr[index].countryName).collection('cities')
    .get().then(cityQuerySnapshot => {
      let points = 0;

      cityQuerySnapshot.forEach(cityDoc => {
        points += cityDoc.data().points * countriesArr[index].countryRate;
      });

      countriesArr[index] = {...countriesArr[index], ...{ countryPoints: points} };
      index++;

      if(index >= countriesArr.length) {
        return countriesArr;
      }

      return request();
    })
  }

  return request();
}

// Use as an example
// function getCitiesName(countriesArr) {
//   let index = 0;

//   function request() {
//     return firebase.firestore().collection('countries').doc(countriesArr[index].countryName).collection('cities')
//     .get().then(cityQuerySnapshot => {
//       let cities = [];
//       cityQuerySnapshot.forEach(cityDoc => {
//         cities.push(cityDoc.data().name);
//       })

//       countriesArr[index] = {...countriesArr[index], ...{ countryCities: cities} };
//       return getLandmarkPoints(countriesArr, index).then(countryPointsResult => {
//         index++;

//         if(index >= countriesArr.length) {
//           return countryPointsResult;
//         }
  
//         return request();
//       }).catch(err=>{console.log(err)});
//     })
//   }

//   return request();
// }

// function getLandmarkPoints(countriesArr, countryIndex) {
//   let index = 0;
//   let countrySumPoints = 0;

//   function request() {
//     return firebase.firestore().collection('countries').doc(countriesArr[countryIndex].countryName).collection('cities').doc(countriesArr[countryIndex].countryCities[index]).collection('landmarks')
//     .get().then(landmarkQuery => {

//       landmarkQuery.forEach(landmarkDoc => {
//         countrySumPoints += landmarkDoc.data().points || 0;
//       });

//       index++;

//       if (index >= countriesArr[countryIndex].countryCities.length) {
//         countriesArr[countryIndex] = {...countriesArr[countryIndex], ...{ countryPoints: countrySumPoints } };
//         return countriesArr;
//       }

//       return request();
//     });

//   }
//   return request();
// }
