import React from 'react'
import { StyleSheet } from 'react-native'

export const yellow = 'rgb(246, 202, 23)';
export const yellowOpacity = 'rgba(246, 202, 23, 0.5)';
export const orange = 'rgb(253, 129, 2)'
export const orangeOpacity = 'rgba(253, 129, 2, 0.5)';
export const lightBlue = 'rgb(3, 215, 219)'
export const lightBlueOpacity = 'rgba(3, 215, 219, 0.5)';
export const darkBlue = 'rgb(3, 146, 221)'
export const darkBlueOpacity = 'rgba(3, 146, 221, 0.5)';
export const purple = 'rgb(95, 98, 159)';
export const purpleOpacity = 'rgba(95, 98, 159, 0.5)';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowBackground: {
    backgroundColor: yellow
  },
  yellowBackgroundOpacity: {
    backgroundColor: yellowOpacity
  },
  orangeBackground: {
    backgroundColor: orange
  },
  orangeBackgroundOpacity: {
    backgroundColor: orangeOpacity
  },
  lightBlueBackground: {
    backgroundColor: lightBlue
  },
  lightBlueBackgroundOpacity: {
    backgroundColor: lightBlueOpacity
  },
  darkBlueBackground: {
    backgroundColor: darkBlue
  },
  darkBlueBackgroundOpacity: {
    backgroundColor: darkBlueOpacity
  },
  purpleBackground: {
    backgroundColor: purple
  },
  purpleBackgroundOpacity: {
    backgroundColor: purpleOpacity
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#ffffff'
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
  searchInput: {
    color: '#1a4e6c',
    height: 40,
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15
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
    fontSize: 40,
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
  },
  countryList: {

  },
  countryListCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 120,
    borderRadius:20,
    overflow: 'hidden',
    textAlign: 'center'
  },
  countryListTitle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  countryListPoints: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 10,
    color: '#ffffff',
    borderRadius: 10
  }
});
