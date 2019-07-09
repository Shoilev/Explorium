import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { createStyles } from '../assets/styles';
import { Section, Button } from '../components/common';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { Components, Screens } from '../resources/labels.json';

const styles = createStyles(LandmarksStyles);

export default class LandmarkDetails extends Component {

  render() {
    const landmark = this.props.navigation.getParam('landmark', '');
    const isAchieved = this.props.navigation.getParam('isAchieved', '');

    if(landmark) {
      return (
        <Section style={styles.landmarksDetails}>
          <ImageBackground source={{uri: landmark.landmarkImage}} style={[styles.backgroundImage, styles.landmarkDetailsImage]}>
            <View style={styles.landmarksDetailsPointsWrap}><Text style={styles.landmarkDetailsPoints}>{landmark.landmarkPoints} points</Text></View>

            { isAchieved ?
              <View style={styles.landmarkExploredLabelWrapper}>
                <Image style={[styles.landmarkExploredImage, styles.landmarkExploredImageLarge]} source={require('../assets/images/checked-icon-large.png')} />
                <Text style={[styles.landmarkExploredLabel, styles.landmarkExploredLabelLarge]}>
                  {Screens.Countries.Landmarks.exploredLabel}
                </Text>
              </View>
              : null
            }
          </ImageBackground>
          <Text style={styles.landmarksText}>{landmark.landmarkName}</Text>
          <View>
            <Text style={styles.landmarksText}>{landmark.landmarkDescription}</Text>
          </View>
          <Button textStyle={styles.landmarkDetailsBtnText} buttonStyle={styles.landmarkDetailsBtn} onPress={() => this.props.navigation.navigate('BaseMap', {landmark})} >{Components.LandmarkDetails.buttonTitle}</Button>
        </Section>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}
