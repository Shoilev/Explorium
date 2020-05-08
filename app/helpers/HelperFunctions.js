import { Linking, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { App } from '../resources/labels.json';

export const isEmpty = (obj) => {
  return obj === undefined || Object.keys(obj).length === 0;
}

export const inviteWAFriend = (phoneNumber, shareGame, appNavigation) => {
  Linking.openURL('whatsapp://send?text=' + App.shareMessage + '&phone='+ phoneNumber.toString());
  if(shareGame) {
    ShareGamePoints(appNavigation);
  }
};

export const inviteSMSFriend = (phoneNumber, shareGame, appNavigation) => {
  const url = 'sms://' + phoneNumber + '' + (Platform.OS === 'ios' ? '&' : '?') + 'body=' + encodeURIComponent(App.shareMessage);
  Linking.openURL(url);
  if(shareGame) {
    ShareGamePoints(appNavigation);
  }
}

const ShareGamePoints = (navigation) => {
  const userUID = firebase.auth().currentUser.uid;
  const db = firebase.firestore().collection('users').doc(userUID);
  let boostShareResult = 0;

  db.get().then(doc => {
    const userData = doc.data();
    boostShareResult = userData.boostShare || 0;

    if(boostShareResult < 5) {
      if(boostShareResult === 4) {
        db.update({
          boostShare: firebase.firestore.FieldValue.increment(1),
          boostShareExpire: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
          navigation.navigate('BoostSuccess', {showSuccess: true});
        });
      } else {
        db.update({
          boostShare: firebase.firestore.FieldValue.increment(1),
        }).then(()=>{
          navigation.navigate('BoostSuccess', {showSuccess: false});
        });
      }
    }
  });
};
