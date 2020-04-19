import React, { Component } from 'react';
import { View, ScrollView, Text, ImageBackground, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
          <ImageBackground source={{uri: landmark.landmarkImage}} imageStyle={{borderBottomRightRadius: 44, borderBottomLeftRadius: 44}} style={[styles.backgroundImage, styles.landmarkDetailsImage]}>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.goBack(null)}} style={styles.landmarkHeaderBarIcon}>
                <Icon style={styles.headerBarBackIcon} name="arrow-left"/>
            </TouchableOpacity>
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
          <Section style={styles.landmarksDetails}>
            <Text style={styles.landmarkTitle}>{landmark.landmarkName}</Text>
            <ScrollView style={styles.landmarkScrollDescription}>
              <Text style={styles.landmarksDescription}>{landmark.landmarkDescription}</Text>
            </ScrollView>
            <Button textStyle={styles.landmarkDetailsBtnText} buttonStyle={styles.landmarkDetailsBtn} onPress={() => this.props.navigation.navigate('BaseMap', {landmark, landmarksCount})} ><FontAwesome5 style={styles.landmarkDetailsBtnIcon} name={'map-marked-alt'} solid />  {Components.LandmarkDetails.buttonTitle}</Button>
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
