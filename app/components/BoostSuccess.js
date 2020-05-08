import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from './common';
import { createStyles } from '../assets/styles';
import { FriendsStyle } from '../assets/styles/friends';

const styles = createStyles(FriendsStyle);

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
      <View style={[styles.container]}>
        <Image style={{width: 250, height: 250}} source={require('../assets/images/congratulations.png')} />
        <Text>Congratulations!</Text>
        <Text>We boost your XP x2 until {parsedExpireDate}</Text>

        <Button onPress={()=>this.props.navigation.navigate('Explore')} >Continue Exploring</Button>
      </View>
      );
    } else {
      return (
        <View style={[styles.container]}>
          <Image style={{width: 250, height: 250}} source={require('../assets/images/congratulations.png')} />
          <Text>Thank you!</Text>
          <Text>You are closer to get XP Boost for 1 month!</Text>

          <Button onPress={()=>this.props.navigation.navigate('FriendsShareGame')} >OK</Button>
        </View>
      );
    }
  }
}
