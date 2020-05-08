import firebase from 'react-native-firebase';
import {
  LEADERBOARD_FETCH_SUCCESS,
  LEADERBOARD_FETCH_FAIL
} from './types';

export const getLeaderboard = () => {
  return (dispatch) => {

    return firebase.firestore().collection("users")
    .where('ranking', 'array-contains', new Date(Date.now()).getMonth().toString() + '/' + new Date(Date.now()).getFullYear().toString())
    .limit(20)
    .get().then(querySnapshot => {
      let userResult = [];

      querySnapshot.forEach(doc => {
        let user = doc.data();
        let userRank = user.userRank || 0;

        user.achievements.map(achievement => {
          if(achievement.timestamp) {
            let date = new Date(achievement.timestamp).getMonth();
            let currentDate = new Date().getMonth();

            if(date === currentDate) {
              userRank += achievement.landmarkPoints;
            }
          }
        });

        user = { ...user, userRank: userRank++ }
        userResult.push(user);
      });

      userResult.sort((a,b) => {
        return b.userRank - a.userRank
      })

      return dispatch({ type: LEADERBOARD_FETCH_SUCCESS, payload: userResult })
    }, (err) => {
      console.log('document not found');
      return dispatch({ type: LEADERBOARD_FETCH_FAIL, payload: {} })
    })
  }
}
