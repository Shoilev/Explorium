import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { createStyles } from '../assets/styles';
import { Section } from '../components/common';
import { LandmarksStyles } from '../assets/styles/landmarks';

const styles = createStyles(LandmarksStyles);

export default class LandmarkDetails extends Component {

  render() {
    const landmark = this.props.navigation.getParam('landmark', '');

    if(landmark) {
      return (
        <Section style={styles.landmarksDetails}>
          <ImageBackground source={{uri: landmark.landmarkImage}} style={[styles.backgroundImage, styles.landmarkDetailsImage]}>
            <View style={styles.landmarksDetailsPointsWrap}><Text style={styles.landmarkDetailsPoints}>50 points</Text></View>
          </ImageBackground>
          <Text style={styles.landmarksText}>{landmark.landmarkName}</Text>
          <View>
            <Text style={styles.landmarksText}>{landmark.landmarkDescription}</Text>
          </View>
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
