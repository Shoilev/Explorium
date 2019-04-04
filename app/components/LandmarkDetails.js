import React, { Component } from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import { createStyles } from '../assets/styles';
import { Section, Button } from '../components/common';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { Components } from '../resources/labels.json';

const styles = createStyles(LandmarksStyles);

export default class LandmarkDetails extends Component {

  render() {
    const landmark = this.props.navigation.getParam('landmark', '');

    if(landmark) {
      return (
        <Section style={styles.landmarksDetails}>
          <ImageBackground source={{uri: landmark.landmarkImage}} style={[styles.backgroundImage, styles.landmarkDetailsImage]}>
            <View style={styles.landmarksDetailsPointsWrap}><Text style={styles.landmarkDetailsPoints}>{landmark.landmarkPoints} points</Text></View>
          </ImageBackground>
          <Text style={styles.landmarksText}>{landmark.landmarkName}</Text>
          <View>
            <Text style={styles.landmarksText}>{landmark.landmarkDescription}</Text>
          </View>
          <Button textStyle={styles.landmarkDetailsBtnText} buttonStyle={styles.landmarkDetailsBtn} onPress={() => this.props.navigation.navigate('BaseMap', {coordinate: landmark.coordinate})} >{Components.LandmarkDetails.buttonTitle}</Button>
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
