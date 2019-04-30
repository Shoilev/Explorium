import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Share } from 'react-native';
import { Button, Section } from './common';
import { createStyles } from '../assets/styles';
// import { CheckedInStyle } from '../assets/styles/checkedIn';
// import { Authentication } from '../resources/labels.json';

const styles = createStyles();

export default class CheckedIn extends Component {

  componentWillMount() {
  }

    onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Exploreum',
        message: 'I have checked in.',
        url: 'https://www.google.com'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const user = this.props.navigation.getParam('user', {});
    const landmark = this.props.navigation.getParam('landmark', {});

    return (
      <View style={styles.container}>
        <Image style={{ width: 200, height: 200 }} source={require('../assets/images/checked-in.png')} />
        <Text style={{fontSize: 30, marginBottom: 20,  marginTop: 20}}>Congratulations!</Text>
        <Text>{landmark.landmarkName}</Text>
        <Text>{landmark.landmarkPoints} points</Text>
        <Text> You have successfully checked in.</Text>

        <Button onPress={this.onShare}>Share</Button>
        <Button onPress={()=>this.props.navigation.navigate('Explore')} >Continue Exploring</Button>
      </View>
    );
  }
}
