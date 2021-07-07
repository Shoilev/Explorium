import React, { Component, useState } from 'react';
import { Text, View, ActivityIndicator, Image, TouchableOpacity, TouchableHighlight, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SvgUri } from 'react-native-svg';
import { getLeaderboard } from '../actions';
import { getGameRules } from '../actions';
import { createStyles } from '../assets/styles';
import { isEmpty } from '../helpers';
import { LeaderboardStyle } from '../assets/styles/leaderboard';
import { images } from '../assets/images';

const styles = createStyles(LeaderboardStyle);

class LeaderboardRoute extends Component {
  componentWillMount() {
    this.props.getLeaderboard();
    this.props.getGameRules();
    this.setState({
      modalVisible: false
    });
  }

  renderItem(item, index) {
    if(this.props.leaderboard.leaderboardData.length < 3) {
      if(index === 0) {
        return  <View style={styles.container}>
                <Text>Leaderboard is inactive. Please try again later.</Text>
              </View>
      } else {
        return;
      }
    }
    else if( index === 0 ) {
      const landmarkData = this.props.leaderboard.leaderboardData;
      const firstPlaceData = landmarkData[0];
      const secondPlaceData = landmarkData[1];
      const thirdPlaceData = landmarkData[2];
      const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/avatars%2FavatarDefault.svg?alt=media';

      return <View style={styles.leaderboardWinWrapper}>
              <View style={[styles.leaderboardWinItem, { width: 60, height: 60, marginTop: 50}]}>
                <Text style={styles.leaderboardPlace}>{2}</Text>
                <View style={[styles.leaderboardImageWrapper, {width:60,height: 60}]}>
                  <SvgUri
                    width="60"
                    height="60"
                    uri={!isEmpty(secondPlaceData.userAvatar) ? secondPlaceData.userAvatar : defaultAvatar}
                    style={styles.leaderboardAvatar}
                  />
                  <Image style={[styles.leaderboardAvatarDefault, {width: 60, height: 60, left: 0, top: 0 }]} source={images.avatarDefault} />
                </View>
                <Text style={styles.leaderboardName}>{secondPlaceData.userNickname || secondPlaceData.userName}</Text>
                <Text style={styles.leaderboardRank}><Icon style={styles.leaderBoardRankIcon} name="star"/> {secondPlaceData.userRank}</Text>
              </View>

              <View style={styles.leaderboardWinItem}>
                <Text style={[styles.leaderboardPlace, styles.leaderboardFirstPlace]}>{1}</Text>
                <View style={styles.leaderboardImageWrapper}>
                  <SvgUri
                    width="90"
                    height="90"
                    uri={!isEmpty(firstPlaceData.userAvatar) ? firstPlaceData.userAvatar : defaultAvatar}
                    style={styles.leaderboardAvatar}
                  />
                  <Image style={styles.leaderboardAvatarDefault} source={images.avatarDefault} />
                </View>
                <Text style={styles.leaderboardName}>{firstPlaceData.userNickname || firstPlaceData.userName}</Text>
                <Text style={styles.leaderboardRank}><Icon style={styles.leaderBoardRankIcon} name="star"/> {firstPlaceData.userRank}</Text>
              </View>

              <View style={[styles.leaderboardWinItem, { width: 60, height: 60, marginTop: 50, marginRight: 0}]}>
                <Text style={styles.leaderboardPlace}>{3}</Text>
                <View style={[styles.leaderboardImageWrapper, {width:60,height: 60}]}>
                  <SvgUri
                    width="60"
                    height="60"
                    uri={!isEmpty(thirdPlaceData.userAvatar) ? thirdPlaceData.userAvatar : defaultAvatar}
                    style={styles.leaderboardAvatar}
                  />
                  <Image style={[styles.leaderboardAvatarDefault, {width: 60, height: 60, left: 0, top: 0 }]} source={images.avatarDefault} />
                </View>
                <Text style={styles.leaderboardName}>{thirdPlaceData.userNickname || thirdPlaceData.userName}</Text>
                <Text style={styles.leaderboardRank}><Icon style={styles.leaderBoardRankIcon} name="star"/> {thirdPlaceData.userRank}</Text>
              </View>
            </View>;
    } else if(index < 3){
      return;
    } else {
      const userAvatar = !isEmpty(item.userAvatar) ? item.userAvatar : 'https://firebasestorage.googleapis.com/v0/b/explorium-3dde2.appspot.com/o/avatars%2FavatarDefault.svg?alt=media';
      return  <View style={styles.leaderboardItem}>
                <Text style={styles.leaderboardItemPosition}>{index + 1}</Text>
                <View style={styles.leaderboardItemImageWrapper}>
                  <SvgUri
                    width="45"
                    height="45"
                    uri={userAvatar}
                    style={styles.leaderboardAvatar}
                  >
                  </SvgUri>
                  <Image style={styles.leaderboardItemAvatar} source={images.avatarDefault} />
                </View>
                <View style={styles.leaderboardItemInfo}>
                  <Text style={styles.leaderboardItemName}>{item.userNickname}</Text>
                  <Text style={styles.leaderboardItemLevel}>Level: {item.level}</Text>
                </View>
                
                <View style={styles.leaderboardItemPointsWrapper}>
                  <Icon style={styles.leaderboarItemIcon} name="star"/>
                  <Text style={styles.leaderboardItemRank}> {item.userRank} points</Text>
                </View>
              </View>
    }
  }
  
  render() {
    const { leaderboardData, error, errorMessage } = this.props.leaderboard;
    const { rules, winners } = this.props.gameRules;
    const winnerData = winners.replace(/\\n/g, '\n');
    const rulesData = rules.replace(/\\n/g, '\n');
    

    if(!isEmpty(leaderboardData)) {
      return (
        <View style={{flex:1}}>
          <Text style={styles.leaderboardTitle}>Monthly Ranking</Text>
          <FlatList
            data={leaderboardData}
            renderItem={({item, index}) => this.renderItem(item,index)}
            keyExtractor={index => { return 'leaderboard' + index.toString() + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}}
            style={styles.leaderboardCard}
            // stickyHeaderIndices={[0]}
          />

          <TouchableOpacity activeOpacity={0.5} style={styles.leaderboardInfoBtn} onPress={()=>{ this.setState({ modalVisible: true }) }}>
            <Icon style={styles.leaderboarInfoIcon} name="info"/>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.exploreModalCenteredView}>
              <View style={styles.exploreModalView}>
                <Text style={[styles.exploreModalText, styles.leaderboardModalText]}>GAME RULES</Text>
                <Text>The winners for the last month are:</Text><Text style={styles.leaderboardWinner}>{winnerData}</Text>
                <Text style={styles.leaederboardModalInfo}>{rulesData}</Text>
                <Text style={styles.leaderboardModalMessage}>Good luck!!!</Text>

                <TouchableHighlight
                  style={styles.leaderboardModalOpenButton}
                  onPress={() => {
                    this.setState({ modalVisible: false })
                  }}
                >
                  <Icon style={styles.leaderboarCloseIcon} name="close"/>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
       )
    } else if (error) {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator color='rgb(255, 126, 41)' size='large'/>
        </View>
      )
    }
  }
}

const mapStateToProps = ({leaderboard, gameRules}) => {
  return { leaderboard, gameRules };
};

export default connect(mapStateToProps, { getLeaderboard, getGameRules })(LeaderboardRoute);
