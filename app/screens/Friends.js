import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Share, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import HeaderSearch from '../components/HeaderSearch';
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
        url: 'https://www.google.com'
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
    const { friendsData, activeFriends } = this.props.friends;
    const { navigation } = this.props;

    if(friendsData && friendsData.length > 0) {
      return (
      <View style={styles.friendsContainer}>
        <FlatList
          data={activeFriends}
          renderItem={({item, index}) => this.renderItem(item,index,navigation)}
          keyExtractor={(friends, index)=> 'friendList' + index}
          ListHeaderComponent={<HeaderSearch title={"Friends"} data={friendsData} />}
          stickyHeaderIndices={[0]}
          initialNumToRender={100}
          updateCellsBatchingPeriod={600}
          maxToRenderPerBatch = {(friendsData.length - 100) / 2}
          windowSize={Dimensions.get('window').height*2}
        />
        <TouchableOpacity activeOpacity={0.5} style={styles.friendsInviteBtn} onPress={()=>this.globalShare()}>
          <Image style={styles.friendsInviteIcon} source={images.linkIcon} />
        </TouchableOpacity>
      </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }
  }
}

const mapStateToProps = ({friends}) => {
  return { friends };
};

export default connect(mapStateToProps, { getFriends })(Friends);
