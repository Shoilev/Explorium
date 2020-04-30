import firebase from 'react-native-firebase';
import { Leveling  } from '../settings/global.json';

function getExperience(level) {
  let exponent = Leveling.exponent; // The exponent represents the difficulty between levels 
  let baseXP = Leveling.baseXP;
  return Math.floor(baseXP * Math.pow(level,exponent))
}

function checkLevelUp(currentLevel, currentExperience) {
  let level = currentLevel + 1;
  let experience = getExperience(level);

  return currentExperience >= experience
}

export const checkInLeveling = (landmark, userUID, userAchievements) => {
  const db = firebase.firestore().collection('users').doc(userUID);
  let currentLevel = userAchievements.level;
  let currentExperience = (userAchievements.experience || 0) + landmark.landmarkPoints;

  let isLevelUp = checkLevelUp(currentLevel, currentExperience);

  let landmarkData = {...landmark, timestamp: Date.now()}

  if(isLevelUp) {
    let xp = currentExperience - getExperience(currentLevel + 1);
    return db.update({
      achievements: firebase.firestore.FieldValue.arrayUnion(landmarkData),
      allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints),
      level: firebase.firestore.FieldValue.increment(1),
      experience: xp
    }).then(()=>{
      return {
        allPoints: landmark.landmarkPoints + userAchievements.allPoints,
        isLevelUp
      }
    });
  } else {
    return db.update({
      achievements: firebase.firestore.FieldValue.arrayUnion(landmarkData),
      allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints),
      experience: firebase.firestore.FieldValue.increment(landmark.landmarkPoints)
    }).then(()=>{
      return {
        allPoints: landmark.landmarkPoints + userAchievements.allPoints,
        isLevelUp
      }
    });
  }
}

export const GetNextLevelXP = getExperience;
