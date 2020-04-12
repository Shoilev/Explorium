import React, { Component } from 'react';
import { View, ScrollView, Text, ImageBackground, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderBar } from './common';
import { createStyles } from '../assets/styles';
import { Section, Button } from '../components/common';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { Components, Screens } from '../resources/labels.json';

const styles = createStyles(LandmarksStyles);

export default class LandmarkDetails extends Component {

  render() {
    const { navigation } = this.props;
    const landmark = this.props.navigation.getParam('landmark', '');
    const landmarksCount = this.props.navigation.getParam('landmarksCount', 0);
    const isAchieved = this.props.navigation.getParam('isAchieved', '');

    if(landmark) {
      return (
        <View style={{flex:1}}>
          <HeaderBar headerBarNav={navigation}>{landmark.landmarkName}</HeaderBar>
          <Section style={styles.landmarksDetails}>
            <ImageBackground source={{uri: landmark.landmarkImage}} imageStyle={{borderRadius: 20}} style={[styles.backgroundImage, styles.landmarkDetailsImage]}>
              <View style={styles.landmarksDetailsPointsWrap}><Text style={styles.landmarkDetailsPoints}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + landmark.landmarkPoints} points</Text></View>

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
            <ScrollView style={styles.landmarkScrollDescription}>
              <Text style={styles.landmarksDescription}>{landmark.landmarkDescription}</Text>
            </ScrollView>
            <Button textStyle={styles.landmarkDetailsBtnText} buttonStyle={styles.landmarkDetailsBtn} onPress={() => this.props.navigation.navigate('BaseMap', {landmark, landmarksCount})} >{Components.LandmarkDetails.buttonTitle}</Button>
          </Section>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      );
    }
  }
}
