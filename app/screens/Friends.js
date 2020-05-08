import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Share, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import HeaderSearch from '../components/HeaderSearch';
import { HeaderBar } from '../components/common';
import { getFriends } from '../actions';
import FriendList from '../components/FriendList';
import { createStyles } from '../assets/styles';
import { FriendsStyle } from '../assets/styles/friends';
import { images } from '../assets/images';
import { isEmpty } from '../helpers';

const styles = createStyles(FriendsStyle);
const INVITE_MESSAGE = 'Join us and download our app!';

class Friends extends Component {
  componentWillMount() {
    this.props.getFriends();
  }

  globalShare = async () => {
    try {
      const result = await Share.share({
        title: 'Exploreum',
        message: INVITE_MESSAGE,
        url: 'https://exploreum.app/#download'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  renderItem(item, index, navigation) {
    if(item) {
      return <FriendList friend={item} appNavigation={navigation} friendIndex={index} />
    }
  }

  render() {
    const { friendsData, activeFriends, errorMessage } = this.props.friends;
    const { navigation } = this.props;

    if(!isEmpty(friendsData)) {
      return (
      <View style={styles.friendsContainer}>
        <HeaderBar headerBarNav={navigation}>{'Friends'}</HeaderBar>
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
        <TouchableOpacity activeOpacity={0.5} style={styles.friendsInviteBtn} onPress={()=>this.globalShare()}>
          <Image style={styles.friendsInviteIcon} source={images.linkIcon} />
        </TouchableOpacity>
      </View>
      );
    }
    else if(!isEmpty(errorMessage)) {
      return (
        <View style={styles.container}>
          <HeaderBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={navigation}>{'Friends'}</HeaderBar>
          <Text style={styles.friendErrroMessage}>{errorMessage}</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <HeaderBar headerBarStyle={{position:'absolute', top: 0, left: 0, right: 0}} headerBarNav={navigation}>{'Friends'}</HeaderBar>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      )
    }
  }
}

const mapStateToProps = ({friends}) => {
  return { friends };
};

export default connect(mapStateToProps, { getFriends })(Friends);
