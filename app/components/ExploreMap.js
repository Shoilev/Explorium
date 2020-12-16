import React from 'react';
import { View, Dimensions, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Animated as AnimatedMap, Marker} from 'react-native-maps';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isUserAchieved, isEmpty } from '../helpers';
import { Button } from './common';
import { getLandmarksByLocation, getAchievementsPerUser } from '../actions';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { Screens } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

let LATITUDE;
let LONGITUDE;

class ExploreMap extends React.Component {
  componentWillMount() {
    LATITUDE = this.props.latitude ? parseFloat(this.props.latitude) : this.props.navigation.getParam('latitude', 0);
    LONGITUDE = this.props.longitude ? parseFloat(this.props.longitude) : this.props.navigation.getParam('longitude', 0);
    this.props.getAchievementsPerUser();

    this.setState({
      selectedMarkerIndex: null,
      tracksViewChanges: true,
      isIframe: this.props.latitude ? true : false,
      markers: []
    })

    this.props.getLandmarksByLocation(LATITUDE, LONGITUDE).then((landmarkResult)=>{
      this.setState({
        markers: landmarkResult,
      })
    })
  }

  goToLandmark(landmarkData, isAchieved) {
    const { navigation, landmarks } = this.props;

    navigation.navigate('LandmarkDetails',{landmark: landmarkData, isAchieved, landmarksCount: landmarks.landmarksAllData.length})
  }

  gotBack() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  stopTrackingViewChanges = () => {
    this.setState(() => ({
      tracksViewChanges: false,
    }));
  }

  handlerMarkerIndex(sliderIndex) {
    var index = sliderIndex >= 0 ? sliderIndex : null;
    this.setState({
      selectedMarkerIndex: index,
    })
  }

  renderItemCard(marker, i) {
    const { achievementsData } = this.props.achievements;
    let isAchieved = false;
    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, marker);
    }

    return (
      <TouchableOpacity onPress={this.goToLandmark.bind(this, marker, isAchieved)} style={[styles.exploreItemWrapper, marker.isShadowLandmark ? styles.exploreShadowItemWrapper : '']}>
        <View style={styles.exploreMapImageWrappper}>
          <Image style={styles.exploreMapItemImage} borderRadius={12} source={{uri:marker.landmarkImage}}/>

          {isAchieved ? 
          <View style={styles.exploreExploredLabelWrapper}>
            <Image style={styles.exploreExploredImage} source={require('../assets/images/checked-icon.png')} />
            <Text style={styles.exploreExploredLabel}>
              {Screens.Countries.Landmarks.exploredLabel}
            </Text>
          </View>
          : null
          }

          <Text style={[styles.explorePoints, styles.exploreMapPoints]}>
            <Icon style={styles.explorePointsIcon} name="star"/> {marker.landmarkPoints + ' points'}
          </Text>
        </View>

        <View style={[styles.exploreMapTitle, marker.isShadowLandmark ? styles.exploreMapTexShadow : '']}>
          <Text style={[styles.exploreMapTitleText, marker.isShadowLandmark ? styles.exploreMapTexShadow : '']}>{i+1 + '. ' + marker.landmarkName || ''}</Text>
        </View>

      </TouchableOpacity>
    )
  }

  render() {
    const { landmarksData, landmarksAllData, error } = this.props.landmarks;
    const { markers, tracksViewChanges, selectedMarkerIndex, isIframe } = this.state;

    if(error) {
      return (
        <View style={styles.container}>
          <Text style={styles.exploreErrorMessage}>{error.errorMessage}</Text>
          {!isIframe ?
            <Button onPress={this.gotBack.bind(this)} buttonStyle={styles.exploreBackBtn}>
              <Text style={styles.exploreBackBtnText}>{'Explore'}</Text>
            </Button>
          : null }
        </View>
      )
    } else if(isEmpty(landmarksData) || isEmpty(landmarksAllData) && isEmpty(markers)) {
      return(
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      )
    } else {
      return (
        <View style={[styles.container, styles.exploreMapContainer]}>
          {!isIframe ?
            <Button onPress={this.gotBack.bind(this)} buttonStyle={styles.exploreMapBackBtn}>
              <Icon style={styles.exploreMapBackBtnIcon} name="arrow-circle-left"/>
              {"\n"}
              <Text style={styles.exploreMapBackBtnText}>{'Back'}</Text>
            </Button>
          : null }
          <AnimatedMap
            style={styles.exploreMap}
            initialRegion={
              {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            }
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
            moveOnMarkerPress={true}
            onPress={this.handlerMarkerIndex.bind(this)}
          >
            {markers.map((marker,i) => (
              <Marker
                key={i}
                coordinate={marker.coordinate}
                title={(i + 1) + '. ' + marker.landmarkName}
                tracksViewChanges={tracksViewChanges}
                zIndex={selectedMarkerIndex == i ? 2 : 1}
                onPress={()=>{ this.handlerMarkerIndex(i)}}
              >
                <View style={styles.exploreMarker}>
                  {/* <Image  onLoad={this.stopTrackingViewChanges} style={styles.exploreMarkerImage} source={marker.isShadowLandmark ? markerShadowImage : markerImage}/> */}
                  <FontAwesome5 onLoad={this.stopTrackingViewChanges} style={marker.isShadowLandmark ? styles.exploreShadowMarkerIcon : styles.exploreMarkerIcon} name={'map-marker'} solid />
                  <Text style={styles.exploreMarkerIndex}>{i+1}</Text>
                </View>
              </Marker>
            ))}
          </AnimatedMap>

         { selectedMarkerIndex !== null  ?
            this.renderItemCard( markers[selectedMarkerIndex], selectedMarkerIndex)
          : null} 
        </View>
      );
    }
  }
}

const mapStateToProps = ({landmarks, achievements}) => {
  return { landmarks, achievements };
};

export default connect(mapStateToProps, { getLandmarksByLocation, getAchievementsPerUser })(ExploreMap);
