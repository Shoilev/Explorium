import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import firebase, { auth } from 'react-native-firebase';
import { SvgUri } from 'react-native-svg';
import { HeaderBar } from './common';
import { createStyles } from '../assets/styles';
import { ProfileStyle } from '../assets/styles/profile';
import { images } from '../assets/images';

const styles = createStyles(ProfileStyle);

export default class AvatarList extends Component {
  componentWillMount() {

  }

  updateUserAvatar(avatarUrl) {
    const userUID = firebase.auth().currentUser.uid;

    return firebase.firestore().collection('users').doc(userUID).update({
      userAvatar: avatarUrl,
    }).then(()=> this.props.navigation.navigate('Profile'))
  }

  renderAvatars() {
    let renderItems = [];
    for (let index = 1; index < 21; index++) {
      let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/avatars%2Favatar-' + index.toString() + '.svg?alt=media';

      renderItems.push(
      <View style={{position: 'relative', width: 80, marginTop: 15, marginRight: 5}} key={'Avatar' + index.toString()}>
        <View style={[styles.profileImageWrapper, {width:80,height: 80, marginTop: 0}]}>
          <TouchableOpacity style={{ position: 'relative', zIndex: 20 }} onPress={()=>this.updateUserAvatar(imageUrl)}>
            <SvgUri
              width="80"
              height="80"
              uri={imageUrl}
            />
          </TouchableOpacity>
          <Image style={[styles.profileAvatarDefault, {width: 66, height: 68, left: 8, top: 8 }]} source={images.avatarDefault} />
        </View>
      </View>);
    }
    return renderItems;
  }

  render() {
    const { navigation } = this.props;

    return(
      <View style={{flex:1}}>
        <HeaderBar headerBarNav={navigation}>{'Choose Avatar'}</HeaderBar>
        <View style={{flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap'}}>
          {this.renderAvatars()}
        </View>
      </View>
    )
  }
}
