import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import AchievementsRoute from '../components/AchievementsRoute';
import LeaderboardRoute from '../components/LeaderboardRoute';
import Friends from './Friends';

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
    />
  );
}
