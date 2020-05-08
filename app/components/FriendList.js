import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Section, Button } from './common';
import { createStyles } from '../assets/styles';
import { images } from '../assets/images';
import { inviteWAFriend, inviteSMSFriend } from '../helpers';
import { FriendsStyle } from '../assets/styles/friends';
import { countryColors } from '../settings/global.json';

const styles = createStyles(FriendsStyle);

export default class FriendList extends React.PureComponent {

  render() {
    const { friend, friendIndex, appNavigation, shareGame } = this.props;
    const friendColor = countryColors[friendIndex % countryColors.length] + 'Background';
    const firendShareGame = shareGame || false;
    let friendName = '';
    let friendShortName = '';

    if(friend.givenName) {
      friendName += friend.givenName;
      friendShortName += friend.givenName[0];
    }
    if (friend.middleName) {
      friendName += (" " + friend.middleName)
      friendShortName += friend.middleName[0];
    }
    if(friend.familyName) {
      friendName += (" " + friend.familyName);
      friendShortName += friend.familyName[0];
    }

    return (
      <View style={{alignItems: 'flex-start'}}>
        <TouchableNativeFeedback activeOpacity={0.5} onPress={()=>this.inviteWAFriend(friend.phoneNumbers[0].number, firendShareGame)} background={TouchableNativeFeedback.Ripple('#fff')}>
          <View style={styles.friendsList}>
              <View style={[styles.frendsItemLeft, styles[friendColor]]}>
                <Text style={styles.friendsText}>{friendShortName}</Text>
              </View>
            <View>
              <Text>{friendName}</Text>
              <Text style={styles.friendsItemNumber}>{ friend.phoneNumbers && friend.phoneNumbers.length > 0 ? friend.phoneNumbers[0].number: 'None'}</Text>
            </View>
            <View style={styles.friendsRightBtn}>
              <TouchableOpacity style={styles.friendsBtn} activeOpacity={0.5} onPress={()=>inviteSMSFriend(friend.phoneNumbers[0].number, firendShareGame, appNavigation)}>
                <FontAwesome5 style={styles.friendsSMSIcon} name={'sms'} solid />
              </TouchableOpacity>
              <TouchableOpacity style={styles.friendsBtn} activeOpacity={0.5} onPress={()=>inviteWAFriend(friend.phoneNumbers[0].number, firendShareGame, appNavigation)}>
                <Image style={styles.friendsWAIcon} source={images.whatsAppIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
