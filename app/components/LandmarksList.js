import React, { Component } from 'react';
import { View, FlatList, Text, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStyles } from '../assets/styles';
import { LandmarksStyles } from '../assets/styles/landmarks';
import { getLandmarks } from '../actions';

const styles = createStyles(LandmarksStyles);

class LandmarksList extends Component {

  componentWillMount() {
    const country = this.props.navigation.getParam('country', '');
    const city = this.props.navigation.getParam('city', '');
    this.props.getLandmarks(country, city);
  }

  renderItem(item, index, navigation) {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.landmarksBox} onPress={()=>navigation.navigate('LandmarkDetails',{landmark: item})}>
          <ImageBackground source={{uri: item.landmarkImage}} style={[styles.backgroundImage, styles.landmarkImage]}>
            <View style={styles.landmarksPointsWrap}><Text style={styles.landmarkPoints}>50pt</Text></View>
          </ImageBackground>
          <Text style={styles.landmarksText}>{item.landmarkName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    //activeLandmarks is available if we decide to implement live search in the near future.
    const { landmarksData } = this.props.landmarks;
    const { navigation } = this.props;

    if(landmarksData && landmarksData.length) {
      return (

        <FlatList
          data={landmarksData}
          style={styles.landmarksRow}
          renderItem={({item, index}) => this.renderItem(item,index,navigation)}
          keyExtractor={(item, index)=> 'landmarkKey' + index}
          numColumns={2}
        />
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

const mapStateToProps = ({landmarks}) => {
  return { landmarks };
};

export default connect(mapStateToProps, { getLandmarks })(LandmarksList);
