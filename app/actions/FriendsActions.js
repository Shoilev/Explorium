import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { isEmpty } from '../helpers';
import { Screens } from '../resources/labels.json';
import {
  FRIENDS_FETCH_SUCCESS,
  FRIENDS_UPDATE,
  FRIENDS_FETCH_FAILED
} from './types';

export const getFriends = () => {
  return (dispatch) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': Screens.Friends.premissionMessage,
        'buttonPositive': 'Allow'
      }
    ).then(() => Contacts.getAll())
      .then((contacts) => {
          console.log('Contact premission approved!')
          
          if(isEmpty(contacts)) {
            dispatch({ type: FRIENDS_FETCH_FAILED, payload: Screens.Friends.errorFetchMessage });
          }

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

          dispatch({ type: FRIENDS_FETCH_SUCCESS, payload: contactResult })
      })
      .catch((e) => { 
        // error
        console.log('Contacts premission denied: ' +  e);
        dispatch({ type: FRIENDS_FETCH_FAILED, payload: Screens.Friends.errorPremissionMessage });
      })
  }
}

export const updateFriends = (friendsData) => {
  return {
    type: FRIENDS_UPDATE,
    payload: friendsData
  };
};