import React, { Component } from 'react';
import { ImageBackground, Image, View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { ModelView } from 'react-native-3d-model-view';
import { requestLocationPermission } from '../actions';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { ExploreStyle } from '../assets/styles/explore';
import { Button } from '../components/common';
import { isEmpty } from '../helpers';
import { Screens, App } from '../resources/labels.json';

const styles = createStyles(ExploreStyle);
const exploreumSrc = images.exploreumBackground;
const exploreumSecondSrc = images.exploreumSecondBackground;
const exploreEarth = images.earth;

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
    modelLoaded: false,
    reloadScreen: false
  }

  modelView = null;

  onLoadModelStart = () => {
    console.log('[react-native-3d-model-view]:', 'Load model start.')
  }

  onLoadModelSuccess = () => {
    this.setState({modelLoaded: true })
    console.log('[react-native-3d-model-view]:', 'Load model success.')
  }

  onLoadModelError = (error) => {
    console.log('[react-native-3d-model-view]:', 'Load model error.')
  }

  onButtonPress() {
    const { navigation } = this.props;
    const { userLocation } = this.props.userGeoLocation;

    navigation.navigate('ExploreMap',{ latitude: userLocation.latitude, longitude: userLocation.longitude });
  }

  componentWillMount() {
    // this.load() // only first time
    const { navigation } = this.props;
    requestAdditionalUserData().then(premission=>{
      if(premission) {
        navigation.navigate('UserInfo')
      }
    })
    this.props.navigation.addListener('willFocus', this.load);
    this.props.requestLocationPermission();
  }
  
  componentDidMount() {
  }

  load = () => {
    if(this.modelView && this.state.modelLoaded) {
      this.modelView = null;
      this.setState({reloadScreen: true})
    }
  }

  render() {
    const { modelLoaded, reloadScreen } = this.state;

    if (reloadScreen) {
      return (
        // quests screen based on your location
        <ImageBackground source={exploreumSrc} style={styles.backgroundImage}>
          <View style={styles.container}>
            <Image source={exploreEarth}/>
            <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
          </View>
        </ImageBackground>
      );
    } else {
      
      const modelStyle = modelLoaded ? styles.exploreModelLoaded : styles.exploreModel;

      return (
        <ImageBackground source={exploreumSecondSrc} style={styles.backgroundImage}>
          <View style={styles.container}>
          
            <View style={styles.exploreLoadingWrapper}>
              {!modelLoaded ? <ActivityIndicator color="#ffffff" size="large" />: null}
            </View>
            
            <ModelView
              ref={modelView => { this.modelView = modelView }}
              scale={2.8}
              style={modelStyle}
              source={{
                model: require('../assets/images/earthOriginal.obj'),
                texture: require('../assets/images/textureOriginal2k.jpg')
                // or
                // model: 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/3d%2FearthOriginal.obj?alt=media&token=b6694f8f-4ade-43a0-a3f9-daf340e1e3fd',
                // texture: 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/3d%2FtextureOriginal2k.jpg?alt=media&token=f776b5a7-55ec-4c80-99ff-0cbaec501c78'
              }}
              onLoadModelStart={this.onLoadModelStart}
              onLoadModelSuccess={this.onLoadModelSuccess}
              onLoadModelError={this.onLoadModelError}>
            </ModelView>

            <Button textStyle={styles.exploreTextBtn} buttonStyle={styles.exploreBtnStyle} onPress={this.onButtonPress.bind(this)}>{Screens.Explore.buttonTitle}</Button>
          </View>
        </ImageBackground>
      );
    }
  }
}

const mapStateToProps = ({userGeoLocation}) => {
  return { userGeoLocation };
};

export default connect(mapStateToProps, { requestLocationPermission })(Explore);
