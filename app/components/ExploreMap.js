import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';

import {
  ProviderPropType,
  Animated as AnimatedMap,
  AnimatedRegion,
  Marker,
} from 'react-native-maps';
import { connect } from 'react-redux';
import PanController from '../controllers/PanController';
import { isUserAchieved, isEmpty } from '../helpers';
import { Section, Button } from './common';
import { getLandmarksByLocation, getAchievementsPerUser } from '../actions';
import { Screens } from '../resources/labels.json';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const DEFAULT_LATITUDE = 42.684617;
const DEFAULT_LONGITUDE = 23.318993;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);

let LATITUDE;
let LONGITUDE;

function getMarkerState(panX, panY, scrollY, i) {
  const xLeft = (-SNAP_WIDTH * i) + (SNAP_WIDTH / 2);
  const xRight = (-SNAP_WIDTH * i) - (SNAP_WIDTH / 2);
  const xPos = -SNAP_WIDTH * i;
  
  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const isNotIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const center = panX.interpolate({
    inputRange: [xPos - 10, xPos, xPos + 10],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const selected = panX.interpolate({
    inputRange: [xRight, xPos, xLeft],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const translateY = Animated.multiply(isIndex, panY);

  const translateX = panX;

  const anim = Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  }));

  const scale = Animated.add(ONE, Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, SCALE_END - 1],
    extrapolate: 'clamp',
  })));

  // [0 => 1]
  let opacity = scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // if i === index: [0 => 0]
  // if i !== index: [0 => 1]
  opacity = Animated.multiply(isNotIndex, opacity);


  // if i === index: [1 => 1]
  // if i !== index: [1 => 0]
  opacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  let markerOpacity = scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const markerScale = selected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return {
    translateY,
    translateX,
    scale,
    opacity,
    anim,
    center,
    selected,
    markerOpacity,
    markerScale,
  };
}

class ExploreMap extends React.Component {
  componentWillMount() {
    LATITUDE = LATITUDE ? LATITUDE : this.props.navigation.getParam('latitude', DEFAULT_LATITUDE);
    LONGITUDE = LONGITUDE ? LONGITUDE : this.props.navigation.getParam('longitude', DEFAULT_LONGITUDE);
    this.props.getAchievementsPerUser();

    //at least two elements to init the slider;
    let markers = [
      {
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        }
      },
      {
        coordinate: {
          latitude: LATITUDE,
          longitude: LONGITUDE
        }
      }
    ];


    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scale = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [1, 1.6],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -100],
      extrapolate: 'clamp',
    });

    let animations = markers.map((m, i) =>
    getMarkerState(panX, panY, scrollY, i));

    this.setState({
      panX,
      panY,
      animations,
      index: 0,
      canMoveHorizontal: true,
      scrollY,
      scrollX,
      scale,
      translateY,
      markers,
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    });

    this.props.getLandmarksByLocation(LATITUDE, LONGITUDE).then((landmarkResult)=>{
      markers = landmarkResult;

      animations = markers.map((m, i) =>
      getMarkerState(panX, panY, scrollY, i));

      this.setState({
        panX,
        panY,
        animations,
        index: 0,
        canMoveHorizontal: true,
        scrollY,
        scrollX,
        scale,
        translateY,
        markers,
        region: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    })
  }

  goToLandmark(landmarkData, isAchieved) {
    const { navigation } = this.props;

    navigation.navigate('LandmarkDetails',{landmark: landmarkData, isAchieved})
  }

  onStartShouldSetPanResponder = (e) => {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = screen.height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onMoveShouldSetPanResponder = (e) => {
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = screen.height - pageY;

    return topOfTap < topOfMainWindow;
  }

  onPanXChange = ({ value }) => {
    const { index } = this.state;
    const newIndex = Math.floor(((-1 * value) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  }

  onPanYChange = ({ value }) => {
    const { canMoveHorizontal, region, scrollY, scrollX, markers, index } = this.state;
    const shouldBeMovable = Math.abs(value) < 2;
    if (shouldBeMovable !== canMoveHorizontal) {
      this.setState({ canMoveHorizontal: shouldBeMovable });
      if (!shouldBeMovable) {
        const { coordinate } = markers[index];
        region.stopAnimation();
        region.timing({
          latitude: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [
              coordinate.latitude,
              coordinate.latitude - (LATITUDE_DELTA * 0.5 * 0.375),
            ],
            extrapolate: 'clamp',
          }),
          latitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          longitudeDelta: scrollY.interpolate({
            inputRange: [0, BREAKPOINT1],
            outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
            extrapolate: 'clamp',
          }),
          duration: 0,
        }).start();
      } else {
        region.stopAnimation();
        region.timing({
          latitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.latitude),
          }),
          longitude: scrollX.interpolate({
            inputRange: markers.map((m, i) => i * SNAP_WIDTH),
            outputRange: markers.map(m => m.coordinate.longitude),
          }),
          duration: 0,
        }).start();
      }
    }
  }

  onRegionChange(/* region */) {
    // this.state.region.setValue(region);
  }

  render() {
    const { landmarksData } = this.props.landmarks;
    const { achievementsData } = this.props.achievements;

    console.log(landmarksData)
    console.log(111111111111111)
    
    if(isEmpty(landmarksData)) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const { region, panX, panY, scrollX, markers, canMoveHorizontal, animations } = this.state;

      panX.addListener(this.onPanXChange);
      panY.addListener(this.onPanYChange);
  
      region.stopAnimation();
      region.timing({
        latitude: scrollX.interpolate({
          inputRange: markers.map((m, i) => i * SNAP_WIDTH),
          outputRange: markers.map(m => m.coordinate.latitude),
        }),
        longitude: scrollX.interpolate({
          inputRange: markers.map((m, i) => i * SNAP_WIDTH),
          outputRange: markers.map(m => m.coordinate.longitude),
        }),
        duration: 0,
      }).start();


    return (
        <PanController
          style={styles.exploreMap}
          vertical={false}
          horizontal={canMoveHorizontal}
          xMode="snap"
          snapSpacingX={SNAP_WIDTH}
          yBounds={[-1 * screen.height, 0]}
          xBounds={[-screen.width * (markers.length - 1), 0]}
          panY={panY}
          panX={panX}
          onStartShouldSetPanResponder={this.onStartShouldSetPanResponder}
          onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder}
        >
          <AnimatedMap
            provider={this.props.provider}
            style={styles.exploreAnimatedMap}
            region={region}
            onRegionChange={this.onRegionChange}
            showsUserLocation={true}
          >
            {markers.map((marker, i) => {
              const {
                selected,
                markerOpacity,
                markerScale,
              } = animations[i];

              return (
                <Marker
                  key={i}
                  coordinate={marker.coordinate}
                >
                  <Image style={{ width: 45, height: 45 }} source={require('../assets/images/pin-full.png')} />
                </Marker>
              );
            })}
          </AnimatedMap>
          <View style={styles.exploreContainer}>
            {markers.map((marker, i) => {
              const {
                translateY,
                translateX,
                scale,
                opacity,
              } = animations[i];

              let isAchieved = false;
              if(!isEmpty(achievementsData) && achievementsData.achievements) {
                isAchieved = isUserAchieved(achievementsData.achievements, marker);
              }

              return (
                <Animated.View
                  key={i}
                  style={[styles.exploreMapItem, {
                    opacity,
                    transform: [
                      { translateY },
                      { translateX },
                      { scale },
                    ],
                  }]}
                >
                  <Section style={styles.exploreItemWrapper}>
                    <Image style={styles.exploreMapItemImage} source={{uri:marker.landmarkImage}}/>
                    <View style={styles.exploreMapTitle}>
                      <Text style={styles.exploreMapTitleText}>{marker.landmarkName}</Text>
                    </View>
                    <Text style={styles.exploreMapPoints}>{marker.landmarkPoints + 'points'}</Text>

                    { isAchieved ?
                      <View style={styles.exploreExploredLabelWrapper}>
                        <Image style={styles.exploreExploredImage} source={require('../assets/images/checked-icon.png')} />
                        <Text style={styles.exploreExploredLabel}>
                          {Screens.Countries.Landmarks.exploredLabel}
                        </Text>
                      </View>
                      : null
                    }

                  </Section>
                  <Button onPress={this.goToLandmark.bind(this, marker, isAchieved)} buttonStyle={styles.exploreMapLandmarkButton}>
                    <Text style={styles.exploreMapButtonTitle}>{'Explore'}</Text>
                  </Button>
                </Animated.View>
              );
            })}
          </View>
        </PanController>
      );
    }
  }
}

ExploreMap.propTypes = {
  provider: ProviderPropType,
};

//TODO: move the styles in the styles folder
const styles = StyleSheet.create({
  exploreMap: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
    position: 'absolute',
    left: 0,
    bottom: 50,
    zIndex: 10
    // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
  exploreAnimatedMap: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
  exploreMapItem: {
    width: ITEM_WIDTH,
    height: ITEM_PREVIEW_HEIGHT,
    backgroundColor: 'rgba(4, 130, 178, 0.6)',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: '#000',
    position:'relative',
    zIndex: 10
  },
  exploreItemWrapper: {
    position:'relative',
    height: ITEM_PREVIEW_HEIGHT
  },
  exploreMapTitle: {
    width: '100%',
    color: '#ffffff',
    textAlign: 'center',
    position:'absolute',
    bottom:0,
    left: 0
  },
  exploreMapTitleText: {
    padding: 5,
    color: '#123c55',
    backgroundColor: 'rgba(205, 209, 213, 0.8);',
    textAlign: 'center'
  },
  exploreMapPoints: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: 'rgb(246, 202, 23)',
    borderRadius: 30,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 10
  },
  exploreMapItemImage: {
    flex: 1,
    width: '100%',
    height: ITEM_PREVIEW_HEIGHT
  },
  exploreExploredLabelWrapper: {
    position:'absolute',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(4, 130, 178, 0.6)'
  },
  exploreExploredImage: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  exploreExploredLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  exploreMapLandmarkButton: {
    position:'absolute',
    top: 10,
    left: 10,
    zIndex:12,
    backgroundColor: '#50ced3',
    borderRadius: 30,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12
  },
  exploreMapButtonTitle: {
    color: '#ffffff'
  }
});

const mapStateToProps = ({landmarks, achievements}) => {
  return { landmarks, achievements };
};

export default connect(mapStateToProps, { getLandmarksByLocation, getAchievementsPerUser })(ExploreMap);
