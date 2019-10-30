import React from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  Animated as AnimatedMap,
  AnimatedRegion,
  Marker,
} from 'react-native-maps';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { isUserAchieved, isEmpty } from '../helpers';
import { Button } from './common';
import { getLandmarksByLocation, getAchievementsPerUser } from '../actions';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { Screens } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const screen = Dimensions.get('window');
const itemWidthValue = 1.3;
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let LATITUDE;
let LONGITUDE;

class ExploreMap extends React.Component {
  componentWillMount() {
    LATITUDE = this.props.navigation.getParam('latitude', 0);
    LONGITUDE = this.props.navigation.getParam('longitude', 0);
    this.props.getAchievementsPerUser();

    this.setState({
      selectedMarkerIndex: 0,
      markers: [],
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      viewport: {
        width: Dimensions.get('window').width
      }
    })

    this.props.getLandmarksByLocation(LATITUDE, LONGITUDE).then((landmarkResult)=>{
      this.setState({
        markers: landmarkResult,
      })
    })
  }

  goToLandmark(landmarkData, isAchieved) {
    const { navigation } = this.props;

    navigation.navigate('LandmarkDetails',{landmark: landmarkData, isAchieved})
  }

  gotBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  mapHandler(sliderIndex, triggerSlide) {
    const { markers } = this.state;
    let markerCoordinate = markers[sliderIndex].coordinate;

    if(triggerSlide) {
      this._carousel.snapToItem(sliderIndex, true, false);
    }

    this.setState({
      selectedMarkerIndex: sliderIndex,
      region: new AnimatedRegion({
        latitude: markerCoordinate.latitude,
        longitude: markerCoordinate.longitude,
        latitudeDelta: 0.03,
        longitudeDelta:  0.03 * ASPECT_RATIO,
      })
    });

    // this.state.region.timing({
    //   latitude: markerCoordinate.latitude,
    //   longitude: markerCoordinate.longitude,
    //   latitudeDelta: 0.03,
    //   longitudeDelta: 0.03 * ASPECT_RATIO,
    //   duration: 1000
    // }).start();
  }

  renderItem(marker, i) {
    const { achievementsData } = this.props.achievements;
    let isAchieved = false;
    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, marker);
    }

    return (
      <View style={styles.exploreItemWrapper}>
        <Image style={styles.exploreMapItemImage} source={{uri:marker.landmarkImage}}/>
        <View style={styles.exploreMapTitle}>
          <Text style={[styles.exploreMapTitleText, marker.isShadowLandmark ? styles.exploreMapTexShadow : '']}>{i+1 + '. ' + marker.landmarkName || ''}</Text>
        </View>
        <Text style={styles.exploreMapPoints}>{marker.landmarkPoints ? marker.landmarkPoints + ' points' : 'Loading...'}</Text>

        { isAchieved ?
          <View style={styles.exploreExploredLabelWrapper}>
            <Image style={styles.exploreExploredImage} source={require('../assets/images/checked-icon.png')} />
            <Text style={styles.exploreExploredLabel}>
              {Screens.Countries.Landmarks.exploredLabel}
            </Text>
          </View>
          : null
        }
        <Button onPress={this.goToLandmark.bind(this, marker, isAchieved)} buttonStyle={[styles.exploreMapLandmarkButton, marker.isShadowLandmark ? styles.exploreMapLandmarkShadowButton : '']}>
          <Text style={styles.exploreMapButtonTitle}>{'Explore'}</Text>
        </Button>
      </View>
    )
  }

  render() {
    const { landmarksData, landmarksAllData, error } = this.props.landmarks;
    const { region, markers } = this.state;

    if(error) {
      return (
        <View style={styles.container}>
          <Text style={styles.exploreErrorMessage}>{error.errorMessage}</Text>
          <Button onPress={this.gotBack.bind(this)} buttonStyle={styles.exploreBackBtn}>
            <Text style={styles.exploreBackBtnText}>{'Explore'}</Text>
          </Button>
        </View>
      )
    } else if(isEmpty(landmarksData) || isEmpty(landmarksAllData) && isEmpty(markers)) {
      return(
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={[styles.container, styles.exploreMapContainer]}>
          <AnimatedMap
            style={styles.exploreMap}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsCompass={false}
            showsScale={false}
            showsBuildings={false}
            showsTraffic={false}
            showsIndoors={false}
            showsIndoorLevelPicker={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
          >
            {markers.map((marker,i) => (
              <Marker
                key={i}
                coordinate={marker.coordinate}
                tracksViewChanges={false}
                zIndex={this.state.selectedMarkerIndex == i ? 2 : 1}
                // icon={marker.isShadowLandmark ? require('../assets/images/pin-full-shadow.png') : require('../assets/images/pin-full.png')}
                onPress={(e)=>{e.stopPropagation(); this.mapHandler(i , true)}}
              >
                  <Text style={[marker.isShadowLandmark ? styles.exploreMarkerShadowPin : styles.exploreMarkerPin, this.state.selectedMarkerIndex == i ? styles.exploreSelectedMarker: null]}>{i+1}</Text>
              </Marker>
            ))}
          </AnimatedMap>
          <View style={styles.exploreCarousel}
              onLayout={() => {
                this.setState({
                    viewport: {
                        width: Dimensions.get('window').width,
                    }
                });
              }}
            >
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={markers}
                renderItem={({item, index}) => this.renderItem(item,index)}
                sliderWidth={this.state.viewport.width}
                itemWidth={this.state.viewport.width / itemWidthValue}
                useScrollView={true}
                windowSize={1}
                onSnapToItem={(sliderIndex) => this.mapHandler(sliderIndex, false)}
              />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = ({landmarks, achievements}) => {
  return { landmarks, achievements };
};

export default connect(mapStateToProps, { getLandmarksByLocation, getAchievementsPerUser })(ExploreMap);
