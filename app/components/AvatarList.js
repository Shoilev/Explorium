import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import firebase, { auth } from 'react-native-firebase';
import { SvgUri } from 'react-native-svg';
import { HeaderBar } from './common';

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
      <View style={{width: 80, marginTop: 15, marginRight: 5}} key={'Avatar' + index.toString()}>
        <TouchableOpacity onPress={()=>this.updateUserAvatar(imageUrl)}>
          <SvgUri
            width="80"
            height="80"
            uri={imageUrl}
          />
        </TouchableOpacity>
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
