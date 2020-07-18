import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ShareDialog } from 'react-native-fbsdk';
import { Button } from './common';
import { createStyles } from '../assets/styles';
import { CheckedInStyle } from '../assets/styles/checkedIn';

const styles = createStyles(CheckedInStyle);

export default class CheckedIn extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

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
    const levelData = this.props.navigation.getParam('levelData', false);
    // const discountData = this.props.navigation.getParam('discountData', false);

    return (
      <View style={[styles.container, styles.checkedInContainer]}>
        <View style={styles.checkedInCircleTop}></View>
        <View style={styles.checkedInCircleBottom}></View>

        <View style={styles.checkedInContent}>
          <Image style={styles.checkedInLandmarkImage} source={{uri: landmark.landmarkImage}} />
          <View style={styles.exploredImageWrapper}>
            <View style={styles.exploredImageFirstCircle}>
              <View style={styles.exploredImageSecondCircle}>
                <View style={styles.exploredImageThirdCircle}>
                  <Image style={styles.exploredImageInCircle} source={require('../assets/images/checked-icon.png')} />
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.checkedInPoints}><Icon style={styles.explorePointsIcon} name="star"/>{landmark.landmarkPoints} points</Text>
          <Text style={styles.checkedInLandmark}>{landmark.landmarkName}</Text>
          <Text style={styles.checkedInTitle}>Congratulations!</Text>
          <Text style={styles.checkedInDescription}>You have successfully checked in.</Text>

          {/* {discountData && discountData.render ? <Text>{discountData.userExplorePercent ? discountData.userExplorePercent + '/75': discountData.discountInfo[0].name}</Text> : null} */}

          <Text style={styles.checkedInShareText}>Tell your friends about us:</Text>
          <TouchableHighlight style={styles.checkedInShareIcon} onPress={this.shareLinkWithShareDialog.bind(this)}>
            <FontAwesome5 style={styles.checkedInFBIcon} name={'facebook-square'} solid />
          </TouchableHighlight>
        </View>

        {true || levelData.isLevelUp ?
          <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('LevelUp',{levelData, user})} >Continue</Button>
          :
          <Button textStyle={styles.checkedInButtonText} buttonStyle={styles.checkedInButton} onPress={()=>this.props.navigation.navigate('Explore')} >Continue</Button>
        }
      </View>
    );
  }
}
