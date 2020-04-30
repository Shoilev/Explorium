import React, { Component } from 'react';
import { ImageBackground, Image, View, Text, Dimensions, Animated, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-location';
import SplashScreen from 'react-native-splash-screen';
import Carousel from 'react-native-snap-carousel';
import { requestLocationPermission, getMessageAlert, getLandmarksByLocation, getAchievementsPerUser } from '../actions';
import { createStyles } from '../assets/styles';
import { ExploreStyle } from '../assets/styles/explore';
import { Button } from '../components/common';
import { isEmpty, isUserAchieved } from '../helpers';
import { Screens, App } from '../resources/labels.json';
import { DefaultLocationData  } from '../settings/global.json';

const styles = createStyles(ExploreStyle);

class Explore extends Component {
  state = {
    animateButton: new Animated.Value(1),
    animatedMessageBox: new Animated.Value(40) //-20
  }

  goToLandmark(landmarkData, isAchieved) {
    const { navigation, landmarks } = this.props;

    navigation.navigate('LandmarkDetails', {landmark: landmarkData, isAchieved, landmarksCount: landmarks.landmarksAllData.length})
  }

  onButtonPress() {
    const { navigation } = this.props;
    const { userLocation } = this.props.userGeoLocation;

    navigation.navigate('ExploreMap',{ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }

  componentWillMount() {
    this.props.requestLocationPermission(true);
    this.props.getMessageAlert();

    this.setState({
      viewport: {
        width: Dimensions.get('window').width
      }
    });
    this.props.getAchievementsPerUser();

    Geolocation.getLatestLocation({ timeout: 6000 }).then(location => {
      this.props.getLandmarksByLocation(location.latitude, location.longitude);
    }).catch((error) => {
      this.props.getLandmarksByLocation(DefaultLocationData.latitude, DefaultLocationData.longitude); // Sofia
    })

  }

  componentDidMount() {
    SplashScreen.hide();
  }

  _onError = () => { this.setState({ exploreBackgroundImageFailed: true }); }

  _renderItem (item, index, navigation) {
    const { achievementsData } = this.props.achievements;
    let isAchieved = false;
    if(!isEmpty(achievementsData) && achievementsData.achievements) {
      isAchieved = isUserAchieved(achievementsData.achievements, item);
    }

    return (
      <View style={styles.exploreCarouselItemWrapper}>
        <TouchableOpacity onPress={()=>{this.goToLandmark(item, isAchieved)}} style={styles.exploreCarouselItem}>
          <Image imageStyle={{ borderRadius: 15 }} style={styles.exploreCarouselImage} source={{uri: item.landmarkImage}}/>
          <Text style={[styles.explorePoints, styles.exploreCarouselPoints]}><Icon style={styles.explorePointsIcon} name="star"/>{' ' + item.landmarkPoints + ' points'}</Text>
          <Text style={styles.exploreCarouselTitle}>{item.landmarkName}</Text>

          { isAchieved ?
          <View style={styles.exploreExploredLabelImage}>
            <Image style={styles.exploreExploredImage} source={require('../assets/images/checked-icon.png')} />
            <Text style={styles.exploreExploredLabel}>
              {Screens.Countries.Landmarks.exploredLabel}
            </Text>
          </View>
          : null
          }
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { userLocatioImageUri, userLocation } = this.props.userGeoLocation;
    const { message, link } = this.props.messagesAlert;
    const { landmarksData, landmarksAllData, error } = this.props.landmarks;
    const exploreBackgroundImage = this.state.exploreBackgroundImageFailed ? userLocatioImageUri.defaultImageURI: userLocatioImageUri.imageURI;
    let { animateButton, animatedMessageBox } = this.state;

    if(!isEmpty(userLocation) && !isEmpty(userLocatioImageUri)) {
      Animated.timing(
        animateButton,
        {
          toValue: 1,
          duration: 800,
        }
      ).start();
    }

    if(!isEmpty(message)) {
      Animated.timing(
        animatedMessageBox,
        {
          toValue: 40,
          duration: 600,
        }
      ).start();
    }

      return (
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <StatusBar translucent backgroundColor={'transparent'}/>
          <ImageBackground source={{uri: exploreBackgroundImage}} onError={this._onError} imageStyle={{ borderBottomLeftRadius: 44, borderBottomRightRadius: 44 }} style={styles.exploreMainImage}>

            {userLocatioImageUri.errorMsg && userLocatioImageUri.errorMsg.length >= 0 ? <Text style={styles.exploreErrorMsg}>{userLocatioImageUri.errorMsg}</Text> : null }

            <View style={styles.exploreLoadingWrapper}>
                { !userLocatioImageUri.imageURI ? <ActivityIndicator color="#ffffff" size="large" />: null }
            </View>

            {/* <Animated.View style={{opacity: animateText}}>
              { !userLocatioImageUri.errorMsg ? <Text style={styles.exploreCountryText}>{'Explore ' + userLocatioImageUri.imageCountry}</Text> : null }
            </Animated.View> */}

            {/* <Animated.View style={{opacity: animateText}}>
              { !userLocatioImageUri.errorMsg ? <Text style={styles.exploreIntroText}>{Screens.Explore.introTitle}</Text> : null }
            </Animated.View> */}

            <Animated.View style={{zIndex: 20, position:'absolute', right: 0, top: 70, opacity: animateButton}}>
              {!userLocatioImageUri.errorMsg ?
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{this.props.navigation.navigate('Countries')}} style={styles.exploreBtnCountryWrapper}>
                  <FontAwesome5 style={styles.exploreIconCountry} name={'globe-europe'} solid />
                  <Text style={styles.exploreBtnCountryTextStyle}>
                    {Screens.Countries.title}
                  </Text>
                </TouchableOpacity>
              : null }
            </Animated.View>

            <Animated.View style={{zIndex: 20, position:'absolute', bottom: 20, opacity: animateButton}}>
              {!userLocatioImageUri.errorMsg && userLocatioImageUri.imageCity ?
                <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.title + ' ' + userLocatioImageUri.imageCity}</Button>
              : null }
            </Animated.View>
          </ImageBackground>

          {!isEmpty(landmarksAllData) ?
            <View
              onLayout={() => {
                this.setState({
                    viewport: {
                        width: Dimensions.get('window').width,
                    }
                });
              }}
            >
              <Text style={styles.exploreAttractionTitle}>{error.errorMessage ? 'We recommend you to visit ' + DefaultLocationData.city : 'Top attractions in ' + userLocatioImageUri.imageCity}</Text>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={landmarksAllData}
                layout={'default'}
                renderItem={({item, index}) => this._renderItem(item,index,this.props.navigation)}
                sliderWidth={this.state.viewport.width}
                itemWidth={this.state.viewport.width / 2.5}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                itemHeight={150}
                windowSize={1}
                loop={true}
                firstItem={0}
              />
            </View>
          : 
          <View style={{height: 140, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color="rgb(255, 126, 41)" size="large" />
          </View>
          }

          <Animated.View style={[styles.exploreMessageAlertWrap, {bottom: animatedMessageBox}]}>
            <View style={styles.exploreMessageAlert}>
              <Text style={styles.exploreMessageText}>{message}</Text>
              {link ? 
                <Button textStyle={styles.exploreMessageTextBtn} buttonStyle={styles.exploreMessageBtn} onPress={()=>{this.props.navigation.navigate(link)}}>Check here</Button>
              : null
              }
            </View>
          </Animated.View>
        </View>
      );
  }
}

const mapStateToProps = ({userGeoLocation, messagesAlert, landmarks, achievements}) => {
  return { userGeoLocation, messagesAlert, landmarks, achievements };
};

export default connect(mapStateToProps, { requestLocationPermission, getMessageAlert, getLandmarksByLocation, getAchievementsPerUser })(Explore);
