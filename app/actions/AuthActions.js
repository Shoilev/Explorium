import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
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

export const FBLoginOrRegister = () => {
  return (dispatch) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'));
      }
      // Retrieve the access token
      return AccessToken.getCurrentAccessToken();
    })
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      console.log(user.user.uid)
      if(user.additionalUserInfo.isNewUser) {
        return firebase.firestore().collection('users').doc(user.user.uid).set({
          allPoints: 0,
          level: 0,
          achievements: []
        });
      }
      console.log('sadsadas')
      loginUserSuccess(dispatch, user)
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
      loginUserFail(dispatch, error)
    });
  }
}

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
