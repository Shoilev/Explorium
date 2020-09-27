import firebase from 'react-native-firebase';
import {
  LEADERBOARD_FETCH_SUCCESS,
  LEADERBOARD_FETCH_FAIL
} from './types';
import { isEmpty } from '../helpers';

export const getLeaderboard = () => {
  return (dispatch) => {

    return firebase.firestore().collection("users")
    .where('level', '>', 1)
    .where('ranking', 'array-contains', new Date(Date.now()).getMonth().toString() + '/' + new Date(Date.now()).getFullYear().toString())
    .get().then(querySnapshot => {
      let userResult = [];

      querySnapshot.forEach(doc => {
        let user = doc.data();
        let currentDate = new Date().getMonth()-1;
        let userRank = user.userRank || 0;
        let userShareBonus = user.shareBonus || null;

        if(userShareBonus) {
          userShareBonus.map(bonus=> {
            let date = new Date(bonus.shareBonusDate).getMonth();
            if(date === currentDate) {
              userRank += bonus.shareBonusPoints
            }
          })
        }

        user.achievements.map(achievement => {
          if(achievement.timestamp) {
            let date = new Date(achievement.timestamp).getMonth();

            if(date === currentDate) {
              userRank += achievement.landmarkPoints;
            }
          }
        });

        user = { ...user, userRank: userRank++ }
        userResult.push(user);
      });

      if(isEmpty(userResult)) {
        return dispatch({ type: LEADERBOARD_FETCH_FAIL, payload: {} });
      }

      userResult.sort((a,b) => {
        return b.userRank - a.userRank
      })

      return dispatch({ type: LEADERBOARD_FETCH_SUCCESS, payload: userResult.slice(0, 20) })
    }, (err) => {
      console.log('document not found');
      return dispatch({ type: LEADERBOARD_FETCH_FAIL, payload: {} })
    })
  }
}
