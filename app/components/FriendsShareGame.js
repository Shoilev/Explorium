import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Share, Image, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HeaderSearch from './HeaderSearch';
import { HeaderCloseBar } from './common';
import { getFriends } from '../actions';
import FriendList from './FriendList';
import { createStyles } from '../assets/styles';
import { FriendsStyle } from '../assets/styles/friends';
import { images } from '../assets/images';
import { isEmpty } from '../helpers';

const styles = createStyles(FriendsStyle);

class FriendsShareGame extends Component {
  componentWillMount() {
    this.setState({
      userBoostShare: -1,
      allowBoost: true,
      loading: true
    });
  }

  componentDidMount() {
    const userUID = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(userUID)
    .get().then(doc => {
      if(doc.exists) {
        const boostShare = doc.data().boostShare;
        if(boostShare > 4) {
          this.setState({
            loading: false,
            allowBoost: false
          });
          return;
        }

        this.setState({
          loading: false,
          userBoostShare: boostShare || 0
        });
      }
    });

    this.props.getFriends();
  }

  renderItem(item, index, navigation) {
    if(item) {
      return <FriendList shareGame={true} friend={item} appNavigation={navigation} friendIndex={index} />
    }
  }

  renderShareBoostFriends(userBoostShare) {
    let renderItems = [];
    for (let index = 0; index < 5; index++) {
      if(index < userBoostShare) {
        renderItems.push(<View key={'boostFriends' + index.toString()} style={[styles.friendShareCircle, styles.friendShareCircleChecked]}><FontAwesome5 style={[styles.firendsShareUser, styles.firendsShareUserChecked]} name={'user-check'} solid /></View>);
      } else {
        renderItems.push(<View key={'boostFriends' + index.toString()} style={styles.friendShareCircle}><FontAwesome5 style={styles.firendsShareUser} name={'user'} solid /></View>);
      }
    }

    return renderItems;
  }

  render() {
    const { friendsData, activeFriends, errorMessage } = this.props.friends;
    const { navigation } = this.props;
    const userBoostShareNumber = this.state.userBoostShare;
    const allowBoost = this.state.allowBoost;

    if (this.state.loading) {
      return (
       <View style={styles.container}>
          <HeaderCloseBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={{navigation, redirect: false }}>{'Boost Your XP'}</HeaderCloseBar>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      )
    }
    else if(!isEmpty(friendsData) && allowBoost) {
      return (
      <View style={styles.friendsContainer}>
        <HeaderCloseBar headerBarNav={{navigation, redirect: true }}>{'Boost Your XP'}</HeaderCloseBar>
        <Text style={styles.friendsShareText}>Invite 5 of your friends and boost your experience x2 for one month.</Text>
        <View style={styles.friendsShareWrapper}>
          {this.renderShareBoostFriends(userBoostShareNumber)}
        </View>
        <FlatList
          data={activeFriends}
          renderItem={({item, index}) => this.renderItem(item,index,navigation)}
          keyExtractor={(friends, index)=> 'friendList' + index}
          ListHeaderComponent={<HeaderSearch title={"Friends"} data={friendsData} />}
          stickyHeaderIndices={[0]}
          initialNumToRender={friendsData.length}
          // updateCellsBatchingPeriod={100}
          // maxToRenderPerBatch = {friendsData.length}
          windowSize={Dimensions.get('window').height*2}
        />
      </View>
      );
    }
    else if(!allowBoost) {
      return (
        <View style={styles.container}>
          <HeaderCloseBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={{navigation, redirect: false }}>{'Boost Your XP'}</HeaderCloseBar>
          <Text style={styles.friendErrroMessage}>{'You have already boost your XP'}</Text>
        </View>
      )
    }
    else if(!isEmpty(errorMessage)) {
      return (
        <View style={styles.container}>
          <HeaderCloseBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={{navigation, redirect: false }}>{'Boost Your XP'}</HeaderCloseBar>
          <Text style={styles.friendErrroMessage}>{errorMessage}</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <HeaderCloseBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={{navigation, redirect: false }}>{'Boost Your XP'}</HeaderCloseBar>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      )
    }
  }
}

const mapStateToProps = ({friends}) => {
  return { friends };
};

export default connect(mapStateToProps, { getFriends })(FriendsShareGame);
