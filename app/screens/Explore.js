import React, { Component } from 'react';
import { ImageBackground, View, Text, Image, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import { requestLocationPermission } from '../actions';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { ExploreStyle } from '../assets/styles/explore';
import { Button } from '../components/common';
import { isEmpty } from '../helpers';
import { Screens, App } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const exploreumSrc = images.exploreumBackground;
const exploreWhiteLogo = images.whiteLogo;
let videoLoad;

const requestAdditionalUserData = (nav) => {
  const userUID = firebase.auth().currentUser.uid;

  return firebase.firestore().collection('users').doc(userUID)
  .get().then(doc => {
    if(doc.exists) {
      const userData = doc.data();

      if(!userData.userHomeLocale) {
        return  true;
      }

      return false;
    }
    return false;
  })
}

class Explore extends Component {
  state = {
    loader: false
  }

  onButtonPress() {
    const { navigation } = this.props;
    const { userLocation } = this.props.userGeoLocation;

    navigation.navigate('ExploreMap',{ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }

  componentWillMount() {
    videoLoad = <Video source={ {uri:'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/video%2Fintro.mp4?alt=media&token=6308c168-820c-4900-8654-6beaff5f84e1'} }   // Can be a URL or a local file.
    ref={(ref) => {
      this.player = ref
    }}
    muted={true}
    repeat={true}
    onReadyForDisplay={this.isVideoLoaded.bind(this)}
    resizeMode={"cover"}
    style={styles.exploreBackgroundVideo} />;

    const { navigation } = this.props;
    requestAdditionalUserData().then(premission=>{
      if(premission) {
        navigation.navigate('UserInfo')
      }
    })
    this.props.requestLocationPermission();
  }

  componentDidMount() {
  }

  isVideoLoaded() {
    this.setState({loader: true })
  }

  render() {
      return (
        // quests screen based on your location
        <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
          <View style={styles.container}>

            {videoLoad}

            <View style={styles.exploreLoadingWrapper}>
               {!this.state.loader ? <ActivityIndicator color="#ffffff" size="large" />: null}
            </View>

              {this.state.loader ? <Image style={styles.exploreIntroLogo} source={exploreWhiteLogo} /> : null }
              {this.state.loader ? <Text style={styles.exploreCountryText}>Explore Bulgaria</Text> : null }
              {this.state.loader ? <Text style={styles.exploreIntroText}>{Screens.Explore.introTitle}</Text> : null }

              <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
            </View>
          </ImageBackground>
      );
  }
}

const mapStateToProps = ({userGeoLocation}) => {
  return { userGeoLocation };
};

export default connect(mapStateToProps, { requestLocationPermission })(Explore);
