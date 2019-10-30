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

export const CheckInLeveling = (landmark, userUID, userAchievements) => {
    const db = firebase.firestore().collection('users').doc(userUID);
    let currentLevel = userAchievements.level;
    let currentExperience = userAchievements.experience + landmark.landmarkPoints;


    let isLevelUp = checkLevelUp(currentLevel, currentExperience);

    console.log(currentLevel)
    console.log(userAchievements.experience)
    console.log(landmark.landmarkPoints)
    console.log(currentExperience)
    console.log(isLevelUp)
    
    if(isLevelUp) {
        let xp = currentExperience - getExperience(currentLevel + 1);
        db.update({
            achievements: firebase.firestore.FieldValue.arrayUnion(landmark),
            allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints),
            level: firebase.firestore.FieldValue.increment(1),
            experience: xp
        });
    } else {
        db.update({
            achievements: firebase.firestore.FieldValue.arrayUnion(landmark),
            allPoints: firebase.firestore.FieldValue.increment(landmark.landmarkPoints),
            experience: firebase.firestore.FieldValue.increment(landmark.landmarkPoints)
        });
    }
}

export const GetNextLevelXP = getExperience;
