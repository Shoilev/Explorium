import React from 'react'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15
  },
  login: {
  },
  loginInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
    width: '75%',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  textInput: {
    height: 40,
    borderWidth: 0,
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#ffffff',
    fontSize: 15
  },
  introText: {
    color: '#ffffff',
    marginBottom: 15
  },
  loginLogo: {
    width: '70%',
    maxWidth: 239
  },
  loginTextBtn: {
    textTransform: 'uppercase',
    fontSize: 15,
    color: '#ffffff'
  },
  loginBtnStyle: {
    width: '75%',
    backgroundColor: 'rgba(20, 22, 54, 0.4)',
    marginTop: 20,
  },
  signBtnStyle: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  signTextBtn: {
    color: '#ffffff'
  },
  emailIcon: {
    fontSize: 25,
    paddingTop: 18,
    color: '#ffffff'
  },
  lockIcon: {
    fontSize: 25,
    paddingTop: 18,
    color: '#ffffff'
  },
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  register: {

  },
  registerTitle: {
    color: '#ffffff',
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '100'
  },
  menuTab: {
    fontSize: 50,
    color: '#1a4e6c'
  },
  explore: {

  },
  exploreTextBtn: {
    color: '#ffffff'
  },
  exploreBtnStyle: {
    backgroundColor: '#1e324d',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 15,
    paddingTop: 5,
    paddingBottom: 5
  }
});
