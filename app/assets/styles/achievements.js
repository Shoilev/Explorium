import { colors, spacing, fonts } from './base';
import { auth } from 'react-native-firebase';

export const AchievementsStyle = {
  achievementsListCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    height: 80,
    borderRadius: 15,
    overflow: 'hidden',
    textAlign: 'center'
  },
  achievementsIndexText: {
    color: colors.white,
    opacity: 0.6,
    fontWeight: 'bold'
  },
  achievementsListTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fonts.baseSize * 3,
    fontWeight: 'bold'
  },
  achievementsListPoints: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small / 1.5,
    paddingBottom: spacing.small / 1.5,
    marginTop: spacing.small / 1.5,
    fontSize: fonts.baseSize * 2,
    color: colors.white,
    borderRadius: 10
  },
  achievementsHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.large,
    borderBottomWidth: 1,
    borderColor: colors.primeryBlue,
    marginBottom: spacing.small
  },
  achievementsHeaderText: {
    color: colors.primeryBlue,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}