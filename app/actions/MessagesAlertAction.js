import firebase from 'react-native-firebase';
import {
  MESSAGES_FETCH,
  MESSAGES_FETCH_FAIL
} from './types';

export const getMessageAlert = () => {
  return (dispatch) => {
    firebase.firestore().collection('messages').doc('userMessage')
    .get().then(doc => {
      console.log(doc.data())
      console.log('asdsadsadsadasdsa')
      return dispatch({ type: MESSAGES_FETCH, payload: doc.data()});
    }).catch(error =>{
      return dispatch({type: MESSAGES_FETCH_FAIL, payload: error.message});
    });
  }
}
