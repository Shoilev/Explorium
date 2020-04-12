import React, { Component } from 'react';
import { ImageBackground, View, Text, Image, Animated, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import SplashScreen from 'react-native-splash-screen';
import { requestLocationPermission, getMessageAlert } from '../actions';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { ExploreStyle } from '../assets/styles/explore';
import { Button } from '../components/common';
import { isEmpty } from '../helpers';
import { Screens, App } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const exploreumSrc = images.exploreumBackground;
const exploreWhiteLogo = images.whiteLogo;

class Explore extends Component {
  state = {
    loader: false,
    loadFallbackVideo: false,
    animateButton: new Animated.Value(0),
    animateText: new Animated.Value(0)
  }

  onButtonPress() {
    const { navigation } = this.props;
    const { userLocation } = this.props.userGeoLocation;

    navigation.navigate('ExploreMap',{ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }

  componentWillMount() {
    this.props.requestLocationPermission(true);
    this.props.getMessageAlert();
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  handleScreenInformation() {
    this.setState({loader: true});
  }

  loadFallbackVideo() {
    this.setState({loadFallbackVideo : true});
  }

  render() {
    const { userLocatioVideoUri, userLocation } = this.props.userGeoLocation;
    const { message, link } = this.props.messagesAlert;
    let { animateButton, animateText } = this.state;

    if(!isEmpty(userLocation)) {
      Animated.timing(
        animateButton,
        {
          toValue: 1,
          duration: 800,
        }
      ).start();
    }

    if(this.state.loader) {
      Animated.timing(
        animateText,
        {
          toValue: 1,
          duration: 800,
        }
      ).start();
    }

      return (
        // quests screen based on your location
        <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
          <View style={styles.container}>

            { !isEmpty(userLocatioVideoUri) && !this.state.loadFallbackVideo ?
              <Video source={ {uri:userLocatioVideoUri.videoURI} }
              ref={(ref) => {
                this.player = ref
              }}
              muted={true}
              repeat={true}
              onLoadStart={this.handleScreenInformation.bind(this)}
              onError={this.loadFallbackVideo.bind(this)}
              resizeMode={"cover"}
              style={styles.exploreBackgroundVideo} />
              : null
            }

            { this.state.loadFallbackVideo ? 
              <Video source={ {uri:'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/video%2Fintro.mp4?alt=media&token=6308c168-820c-4900-8654-6beaff5f84e1'} }
              ref={(ref) => {
                this.player = ref
              }}
              muted={true}
              repeat={true}
              onError={this.loadFallbackVideo.bind(this)}
              resizeMode={"cover"}
              style={styles.exploreBackgroundVideo} /> 
              :
              null
            }

            <View style={styles.exploreLoadingWrapper}>
               { !this.state.loader ? <ActivityIndicator color="#ffffff" size="large" />: null }
            </View>

            <Animated.View style={[styles.exploreIntroLogo, {opacity: animateText}]}>
              { this.state.loader ? <Image style={styles.exploreIntroLogo} source={exploreWhiteLogo} /> : null }
            </Animated.View>

            <Animated.View style={{opacity: animateText}}>
              { this.state.loader ? <Text style={styles.exploreCountryText}>{'Explore ' + userLocatioVideoUri.videoCountry}</Text> : null }
            </Animated.View>

            <Animated.View style={{opacity: animateText}}>
              { this.state.loader ? <Text style={styles.exploreIntroText}>{Screens.Explore.introTitle}</Text> : null }
            </Animated.View>

            <Animated.View style={{opacity: animateButton}}>
              <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
            </Animated.View>

            {message ? 
              <Animated.View style={[{opacity: animateText}, styles.exploreMessageAlertWrap]}>
                <View style={styles.exploreMessageAlert}>
                  <Text style={styles.exploreMessageText}>{message}</Text>
                  {link ? 
                    <Button textStyle={styles.exploreMessageTextBtn} buttonStyle={styles.exploreMessageBtn} onPress={()=>{this.props.navigation.navigate(link)}}>Check here</Button>
                  : null
                  }
                </View>
              </Animated.View>
            : null }
          </View>
        </ImageBackground>
      );
  }
}

const mapStateToProps = ({userGeoLocation, messagesAlert}) => {
  return { userGeoLocation, messagesAlert };
};

export default connect(mapStateToProps, { requestLocationPermission, getMessageAlert })(Explore);
