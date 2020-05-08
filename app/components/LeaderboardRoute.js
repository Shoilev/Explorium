import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { getLeaderboard } from '../actions';
import { createStyles } from '../assets/styles';
import { Section } from '../components/common';
import { isEmpty } from '../helpers';
import { LeaderboardStyle } from '../assets/styles/leaderboard';
import { Screens } from '../resources/labels.json';
import { images } from '../assets/images';

const styles = createStyles(LeaderboardStyle);

class LeaderboardRoute extends Component {
  componentWillMount() {
    this.props.getLeaderboard();
  }

  renderItem(item, index) {
    return  <Section style={styles.leaderboardCard}>
              {item.photoURL ? 
                <Image style={{width: 50, height: 50}} source={{uri: item.photoURL + '?type=large'}} />
                :
                <Image style={{width: 50, height: 50}} source={images.userProfile} />
              }
              <Text>{index + 1}</Text>
              <Text>{item.userNickname}</Text>
              <Text>{item.userRank}</Text>
            </Section>
  }
    
  render() {
    const { leaderboardData, error, errorMessage } = this.props.leaderboard;

    if(!isEmpty(leaderboardData)) {
      return (
        <FlatList
          data={leaderboardData}
          renderItem={({item, index}) => this.renderItem(item,index)}
          keyExtractor={index => { return 'leaderboard' + index.toString() + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}}
          ListHeaderComponent={<View><Text>{Screens.Leaderboard.title}</Text></View>}
          stickyHeaderIndices={[0]}
        />
       )
    } else if (error) {
      return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
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

const mapStateToProps = ({leaderboard}) => {
  return { leaderboard };
};

export default connect(mapStateToProps, { getLeaderboard })(LeaderboardRoute);
