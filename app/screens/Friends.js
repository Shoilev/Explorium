import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HeaderSearch from '../components/HeaderSearch';
import { getFriends } from '../actions';
import FriendList from '../components/FriendList';
import { createStyles } from '../assets/styles';
import { isEmpty } from '../helpers';

const styles = createStyles();

class Friends extends Component {
  componentWillMount() {
    this.props.getFriends();
  }

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
      <FlatList
        data={activeFriends}
        renderItem={({item, index}) => this.renderItem(item,index,navigation)}
        keyExtractor={(friends, index)=> 'friendList' + index}
        ListHeaderComponent={<HeaderSearch title={"Friends"} data={friendsData} />}
        stickyHeaderIndices={[0]}
        initialNumToRender={friendsData.length }
        updateCellsBatchingPeriod={20}
        onEndReachedThreshold={0.5}
      />
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
