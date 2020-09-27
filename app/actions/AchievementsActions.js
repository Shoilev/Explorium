import firebase, { auth } from 'react-native-firebase';
import {
  ACHIEVEMENTS_FETCH_SUCCESS,
  ACHIEVEMENTS_FETCH_FAIL,
} from './types';

export const getAchievementsPerUser = () => {
  return (dispatch) => {
    const userUID = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(userUID)
    .onSnapshot(documentSnapshot => {
      console.log('achievements');
      const userAchievements = documentSnapshot.data();

      return dispatch({ type: ACHIEVEMENTS_FETCH_SUCCESS, payload: userAchievements })
    }, (err) => {
      console.log('document not found');
      return dispatch({ type: ACHIEVEMENTS_FETCH_FAIL, payload: {} })
    })
  }
}

export const getFirstAchievementsPerUser = () => {
  return (dispatch) => {
    const userUID = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(userUID)
    .get().then(doc => {
      if(doc.exists) {
        let userAchievements = doc.data();
        
          let achievements = userAchievements.achievements.sort((a,b) => b.timestamp - a.timestamp ).slice(0,50);
          userAchievements.achievements = achievements;

          dispatch({ type: ACHIEVEMENTS_FETCH_SUCCESS, payload: userAchievements })
        }
        else {
          dispatch({ type: ACHIEVEMENTS_FETCH_FAIL, payload: {} })
        }
    });
  }
}
