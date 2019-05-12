import firebase from 'react-native-firebase';
import { 
  GET_USER,
  LOCAL_CITY_CHANGED,
  NICKNAME_CHANGED
} from './types';

export const getUser = () => {
  const { currentUser } = firebase.auth();

  return {
    type: GET_USER,
    payload: currentUser
  };
};

export const localCityChange = (text) => {
  return {
    type: LOCAL_CITY_CHANGED,
    payload: text
  };
};

export const nicknameChange = (text) => {
  return {
    type: NICKNAME_CHANGED,
    payload: text
  };
};
