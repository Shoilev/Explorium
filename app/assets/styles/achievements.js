import { colors, spacing, fonts } from './base';
import { auth } from 'react-native-firebase';

export const AchievementsStyle = {
  achievementsList: {
    padding: spacing.large
  },
  achievementListCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: spacing.large
  },
  achievementsImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: spacing.large
  },
  achievementTextIndex: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.large
  },
  achievementsPoints: {
    backgroundColor: colors.yellow,
    borderRadius: 10,
    padding: spacing.small,
    fontSize: fonts.baseSize * 2
  },
  achievementsRightSection: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
}