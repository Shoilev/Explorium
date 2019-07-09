import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { ShareDialog } from 'react-native-fbsdk';
import { Button } from './common';
import { createStyles } from '../assets/styles';
import { CheckedInStyle } from '../assets/styles/checkedIn';

const styles = createStyles(CheckedInStyle);

export default class CheckedIn extends Component {

  componentWillMount() {
  }

  // onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       title: 'Exploreum',
  //       message: 'I have checked in.',
  //       url: 'https://www.google.com'
  //     });

  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  shareLinkWithShareDialog() {
    const landmark = this.props.navigation.getParam('landmark', {});
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
          alert('Share was successful');
        }
      },
      function(error) {
        alert('Share failed with error: ' + error.message);
      }
    );
  }

  render() {
    const user = this.props.navigation.getParam('user', {});
    const landmark = this.props.navigation.getParam('landmark', {});

    return (
      <View style={[styles.container, styles.checkedInContainer]}>
        <Image style={styles.checkedInImage} source={require('../assets/images/congratulations.png')} />
        <Text style={styles.checkedInPoints}>{landmark.landmarkPoints} points</Text>
        <Text style={styles.checkedInTitle}>Congratulations!</Text>
        <Text style={styles.checkedInDescription}>You have successfully checked in.</Text>
        <Text style={styles.checkedInLandmark}>{landmark.landmarkName}</Text>

        <Text style={styles.checkedInShareText}>Share with friends</Text>
        <TouchableHighlight style={styles.checkedInShareIcon} onPress={this.shareLinkWithShareDialog.bind(this)}>
          <Image source={require('../assets/images/fb-icon.png')} style={{height:35, width:35}} />
        </TouchableHighlight>

        <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('Explore')} >Continue Exploring</Button>
      </View>
    );
  }
}
