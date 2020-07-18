import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import AchievementsRoute from '../components/AchievementsRoute';
import LeaderboardRoute from '../components/LeaderboardRoute';
import Friends from './Friends';
import { createStyles } from '../assets/styles';
import { AchievementsStyle } from '../assets/styles/achievements';

const styles = createStyles(AchievementsStyle);

const initialLayout = { width: Dimensions.get('window').width };

export default Achievements = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'leaderboard', title: 'Leaderboard' },
    { key: 'achievements', title: 'Achievements' },
    { key: 'friends', title: 'Friends' }
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'leaderboard':
        return <LeaderboardRoute/>;
      case 'achievements':
        return <AchievementsRoute />;
        case 'friends':
          return <Friends />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props =>
        <TabBar
            {...props}
            labelStyle={styles.tabBarLabel}
            indicatorStyle = {styles.tabBarIndicator}
            style={styles.tabHeaderView}
        />
    }
    />
  );
}
