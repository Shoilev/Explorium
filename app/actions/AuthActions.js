import firebase from 'react-native-firebase';
import { Authentication } from '../resources/labels.json';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    firebase.auth()
    .signOut()
    .then(() => logoutUserSuccess(dispatch))
    .catch(error => logoutUserFail(dispatch, error));
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch, error))
  }
};

export const signUpUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGN_UP_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
          allPoints: 0,
          level: 0,
          achievements: []
        });
      })
      .then(()=>this.props.navigation.navigate('App'))
      .catch(error => signUpUserFail(dispatch, error))
  }
}

export const emptyUserOrPassword = () => {
  return {
    type: LOGIN_USER_FAIL,
    payload: Authentication.errorMessage
  }
}

const logoutUserSuccess = (dispatch) => {
  dispatch({ 
    type: LOGOUT_USER_SUCCESS,
  });
};

logoutUserFail = (dispatch, error) => {
  dispatch({
    type: LOGOUT_USER_FAIL,
    payload: error.message
  })
}

const loginUserFail = (dispatch, error) => {
  dispatch({ 
    type: LOGIN_USER_FAIL,
    payload: error.message
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const signUpUserFail = (dispatch, error) => {
  dispatch({ 
    type: SIGN_UP_USER_FAIL,
    payload: error.message
  });
};
