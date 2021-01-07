import firebase from 'react-native-firebase';
import {
  GAME_RULES_FETCH,
  GAME_RULES_FETCH_FAIL
} from './types';

export const getGameRules = () => {
  return (dispatch) => {
    firebase.firestore().collection('messages').doc('gameRules')
    .get().then(doc => {
        return dispatch({ type: GAME_RULES_FETCH, payload: doc.data()});
    }).catch(error =>{
        return dispatch({type: GAME_RULES_FETCH_FAIL, payload: error.message});
    });
  }
}
