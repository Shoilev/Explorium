import { colors, spacing, fonts } from './base';

export const AchievementsStyle = {
  achievementsListCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.large,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    backgroundColor: colors.lightGray,
    height: 100,
    overflow: 'hidden',
    textAlign: 'center'
  },
  achievementsListTitle: {
    marginTop: spacing.medium,
    marginLeft: spacing.large,
    color: colors.primeryBlue,
    textAlign: 'left',
    fontSize: fonts.baseSize * 3,
    fontWeight: 'bold'
  },
  achievementsItemRank: {
    color: colors.orange,
    fontSize: fonts.baseSize * 2.5,
    paddingRight: spacing.small
  },
  achievementsItemIcon: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: fonts.baseSize * 4,
    paddingRight: spacing.small
  },
  achievementsItemPointsWrapper: {
    justifyContent: 'center'
  },
  achievementsDate: {
    marginTop: spacing.medium,
    marginLeft: spacing.large,
    fontSize: fonts.baseSize * 2
  },
  achievementsDateIcon: {
    fontSize: fonts.baseSize * 2.5,
    color: colors.primeryBlue
  },
  achievementsHeaderText: {
    color: colors.primeryDarkBlue,
    fontSize: fonts.baseSize * 5,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: spacing.large,
  },
  achievementsSubTitle: {
    color: colors.darkGray,
    fontSize: fonts.baseSize * 2.5,
    textAlign: 'center',
    marginBottom: spacing.large
  },
  tabHeaderView: {
    height: 100,
    justifyContent: 'flex-end',
    backgroundColor: colors.orange,
  },
  tabBarLabel: {
    textTransform: 'capitalize',
    fontSize: fonts.baseSize * 2.8,
  },
  tabBarIndicator: {
    backgroundColor: colors.yellow,
    height: 4
  },
  achievementUserWrapper: {
    flex: 1,
    margin: spacing.medium,
    padding: spacing.large,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    backgroundColor: '#FFF4CF'
  },
  achievementsUserInfo: {
    marginLeft: spacing.extraLarge
  },
  achievementsUserName: {
    color: colors.primeryDarkBlue,
    fontSize: fonts.baseSize * 4,
    fontWeight: '700'
  },
  achievementsUserPoints: {
    marginTop: spacing.medium
  }
}