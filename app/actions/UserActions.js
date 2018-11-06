import firebase from 'react-native-firebase';
import { GET_USER } from './types';

export const getUser = () => {
  const { currentUser } = firebase.auth();

  return {
    type: GET_USER,
    payload: currentUser
  };
};