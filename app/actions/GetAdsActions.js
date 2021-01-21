import firebase from 'react-native-firebase';
import {
  GET_ADS_FETCH,
  GET_ADS_FETCH_FAIL
} from './types';

export const getAds = () => {
  return (dispatch) => {
    firebase.firestore().collection('businesses').doc('ads')
    .get().then(doc => {
        return dispatch({ type: GET_ADS_FETCH, payload: doc.data()});
    }).catch(error =>{
        return dispatch({type: GET_ADS_FETCH_FAIL, payload: error.message});
    });
  }
}
