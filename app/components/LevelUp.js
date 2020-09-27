import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import { ShareDialog } from 'react-native-fbsdk';
import { Button } from './common';
import { createStyles } from '../assets/styles';
import { CheckedInStyle } from '../assets/styles/checkedIn';

const styles = createStyles(CheckedInStyle);

export default class LevelUp extends Component {

  componentWillUnmount() {
  }

  shareLinkWithShareDialog() {
    const landmark = this.props.navigation.getParam('landmark', {});
    const user = this.props.navigation.getParam('user', {});
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: 'https://exploreum.app/',
      contentTitle: 'Exploreum',
      contentDescription: 'Hey I just have checked in successfully at '+ landmark.landmarkName + '. I want to invite you to join me.',
      imageUrl: 'https://exploreum.app/wp-content/uploads/2018/10/about-6.jpg'
    };

    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share operation was cancelled');
        } else {
          alert('Thank you! You recieved 20 points.');
          const db = firebase.firestore().collection('users').doc(user.uid);
          db.update({
            allPoints: firebase.firestore.FieldValue.increment(20),
            experience: firebase.firestore.FieldValue.increment(20),
            shareBonus: firebase.firestore.FieldValue.arrayUnion({shareBonusDate: Date.now(), shareBonusPoints: 20}),
          })
        }
      },
      function(error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }

  render() {
    const levelData = this.props.navigation.getParam('levelData', {});
    const user = this.props.navigation.getParam('user', {});

    return (
      <View style={[styles.container, styles.checkedInContainer]}>
        <View style={styles.checkedInCircleTop}></View>
        <View style={styles.checkedInCircleBottom}></View>

        <View style={[styles.checkedInContent, styles.levelUpContent]}>
          <View style={styles.levelUpImageWrapper}>
            <View style={styles.levelUpImageFirstCircle}>
              <View style={styles.levelUpImageSecondCircle}>
                <View style={styles.levelUpImageThirdCircle}>
                  <FontAwesome5 style={styles.levelUpImageInCircle} name={'trophy'} solid />
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.levelUpTitle}>You Level Up!</Text>
          <Text style={styles.levelUpNumber}>{levelData.level} Level</Text>

          <Text style={[styles.checkedInShareText, styles.levelUpShareText]}>Tell your friends and gain</Text>
          <Text style={[styles.checkedInPoints, styles.levelUpPoints]}>+20 points</Text>
          <TouchableHighlight style={styles.checkedInShareIcon} onPress={this.shareLinkWithShareDialog.bind(this)}>
            <FontAwesome5 style={styles.checkedInFBIcon} name={'facebook-square'} solid />
          </TouchableHighlight>
        </View>

        <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('Explore')} >Continue</Button>
      </View>
    );
  }
}
