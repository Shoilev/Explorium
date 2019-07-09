import React, { Component } from 'react';
import { Text, View, Linking, TouchableNativeFeedback } from 'react-native';
import { Section, Button } from './common';
import { createStyles } from '../assets/styles';
import { FriendsStyle } from '../assets/styles/friends';
import { countryColors } from '../settings/global.json';

const styles = createStyles(FriendsStyle);

export default class FriendList extends React.PureComponent {
  inviteFriend(phoneNumber) {
    Linking.openURL('whatsapp://send?text=Join us and download our app!&phone='+ phoneNumber.toString());
  };

  render() {
    const { friend, friendIndex, appNavigation } = this.props;
    const friendColor = countryColors[friendIndex % countryColors.length] + 'Background';
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
      <Section style={{alignItems: 'flex-start'}}>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#fff')} onPress={()=>this.inviteFriend(friend.phoneNumbers[0].number)}>
          <View style={styles.friendsList}>
              <View style={[styles.frendsItemLeft, styles[friendColor]]}>
                <Text style={styles.friendsText}>{friendShortName}</Text>
              </View>
            <View>
              <Text>{friendName}</Text>
              <Text style={styles.friendsItemNumber}>{ friend.phoneNumbers && friend.phoneNumbers.length > 0 ? friend.phoneNumbers[0].number: 'None'}</Text>
            </View>
            <View style={styles.friendsRightBtn}>
              <Button textStyle={styles.friendsBtnText} buttonStyle={styles.friendsBtn} onPress={()=>this.inviteFriend(friend.phoneNumbers[0].number)}>Invite</Button>
            </View>
          </View>
        </TouchableNativeFeedback>
      </Section>
    );
  }
}
