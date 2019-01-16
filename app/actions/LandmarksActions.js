import firebase from 'react-native-firebase';
import {
  LANDMARKS_FETCH_SUCCESS,
} from './types';

export const getLandmarks = (country, city) => {
  return (dispatch) => {
    firebase.firestore().collection('countries').doc(country).collection('cities').doc(city).collection('landmarks')
    .get().then(querySnapshot => {
        console.log('firebase');
        const landmarks = [];
        querySnapshot.forEach(doc => {
          console.log(doc)
          landmarks.push({
            landmarkName: doc.data().name,
            landmarkImage: doc.data().image,
            landmarkDescription: doc.data().description
          })
        })

        // TODO: sort by points
        landmarks.sort(function(a, b) {
          return a.landmarkName.localeCompare(b.landmarkName);
        })

        dispatch({ type: LANDMARKS_FETCH_SUCCESS, payload: landmarks })
      })
  }
}
