import firebase from 'react-native-firebase';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_UPDATE
} from './types';

export const getFriends = () => {
  return (dispatch) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          // error
          console.log('Contacts premission denied: ' +  err);
          dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: [] })
        } else {
          // contacts returned in Array
          console.log('Contact premission approved!')
          let contactResult = contacts.filter(({hasThumbnail, thumbnailPath, phoneNumbers, familyName, givenName, middleName}) =>  {
            if( givenName.length > 0 && phoneNumbers && phoneNumbers.length > 0 ) {
              return {
                hasThumbnail,
                thumbnailPath,
                phoneNumbers,
                familyName,
                givenName,
                middleName
              }
            }
          });
          contactResult.sort((a,b) => a.givenName.toLocaleLowerCase().localeCompare(b.givenName.toLocaleLowerCase()))
          console.log(contactResult)

          dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: contactResult })
        }
      })
    });
  }
}

export const updateFriends = (friendsData) => {
  return {
    type: FRIENDS_UPDATE,
    payload: friendsData
  };
};