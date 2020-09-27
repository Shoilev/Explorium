import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from './common';
import { createStyles } from '../assets/styles';
import { CheckedInStyle } from '../assets/styles/checkedIn';

const styles = createStyles(CheckedInStyle);

export default class BoostSuccess extends Component {

  componentWillMount() {
  }

  render() {
    const SHOW_SUCCESS = this.props.navigation.getParam('showSuccess', false);
    
    if(SHOW_SUCCESS) {
      const MONTH_X = 1;
      let CurrentDate = new Date();
      CurrentDate.setMonth(CurrentDate.getMonth() + MONTH_X);
      let expireDate = new Date(CurrentDate);
      let parsedExpireDate = expireDate.getDate() + '/' + (expireDate.getMonth() + 1) + '/' + expireDate.getFullYear();

      return (
      <View style={[styles.container, styles.checkedInContainer]}>
        <View style={styles.checkedInCircleTop}></View>
        <View style={styles.checkedInCircleBottom}></View>

        <View style={styles.checkedInContent}>
          <View style={{marginTop: -40}}>
            <Image style={{width: 150, height: 145}} source={require('../assets/images/congratulations.png')} />
          </View>
          <Text style={styles.checkedInTitle}>Congratulations!</Text>
          <Text style={[styles.checkedInDescription, {color: '#007E25'}]}>We boost your XPx2 until {parsedExpireDate}</Text>
        </View>

        <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('Explore')} >Continue Exploring</Button>
      </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.checkedInContainer]}>
          <View style={styles.checkedInCircleTop}></View>
          <View style={styles.checkedInCircleBottom}></View>

          <View style={styles.checkedInContent}>
            <View style={{marginTop: -40}}>
              <Image style={{width: 150, height: 145}} source={require('../assets/images/congratulations.png')} />
            </View>
            <Text style={styles.checkedInTitle}>Thank you!</Text>
            <Text style={styles.checkedInDescription}>You are closer to get XP Boost for 1 month!</Text>
          </View>

          <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('FriendsShareGame')} >OK</Button>
        </View>
      );
    }
  }
}
