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

export const checkInLeveling = (landmark, userUID, userAchievements, boostShare) => {
  const db = firebase.firestore().collection('users').doc(userUID);
  const rankingDate = new Date(Date.now()).getMonth().toString() + '/' + new Date(Date.now()).getFullYear().toString();
  let currentLevel = userAchievements.level;
  let comingPoints =  boostShare ? landmark.landmarkPoints * 2 : landmark.landmarkPoints;
  let currentExperience = (userAchievements.experience || 0) + comingPoints;

  let isLevelUp = checkLevelUp(currentLevel, currentExperience);

  let landmarkData = {...landmark, timestamp: Date.now()}

  if(isLevelUp) {
    let xp = currentExperience - getExperience(currentLevel + 1);
    let dbStoreData = {
      achievements: firebase.firestore.FieldValue.arrayUnion(landmarkData),
      allPoints: firebase.firestore.FieldValue.increment(comingPoints),
      level: firebase.firestore.FieldValue.increment(1),
      ranking: firebase.firestore.FieldValue.arrayUnion(rankingDate),
      experience: xp
    };

    if(boostShare) {
      dbStoreData.shareBonus = firebase.firestore.FieldValue.arrayUnion({shareBonusDate: Date.now(), shareBonusPoints:landmark.landmarkPoints})
    }

    return db.update(dbStoreData).then(()=>{
      return {
        allPoints: comingPoints + userAchievements.allPoints,
        isLevelUp
      }
    });
  } else {
    let dbStoreData = {
      achievements: firebase.firestore.FieldValue.arrayUnion(landmarkData),
      allPoints: firebase.firestore.FieldValue.increment(boostShare ? comingPoints * 2 : comingPoints),
      experience: firebase.firestore.FieldValue.increment(boostShare ? comingPoints * 2 : comingPoints),
      ranking: firebase.firestore.FieldValue.arrayUnion(rankingDate)
    }

    if(boostShare) {
      dbStoreData.shareBonus = firebase.firestore.FieldValue.arrayUnion({shareBonusDate: Date.now(), shareBonusPoints:landmark.landmarkPoints})
    }
    return db.update(dbStoreData).then(()=>{
      return {
        allPoints: comingPoints + userAchievements.allPoints,
        isLevelUp
      }
    });
  }
}

export const GetNextLevelXP = getExperience;
