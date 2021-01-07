import { colors, spacing, fonts } from './base';

export const LeaderboardStyle = {
  leaderboardTitle: {
    color: colors.primeryDarkBlue,
    fontSize: fonts.baseSize * 5,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: spacing.large,
    marginBottom: spacing.large
  },
  leaderboardWinWrapper: {
    flex:1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingBottom: 40
  },
  leaderboardCard: {
    flex: 1,
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
  },
  leaderboardWinItem: {
    position: 'relative',
    width: 90,
    height: 90,
    marginRight: spacing.extraLarge * 1.5
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.extraLarge,
    marginRight: spacing.extraLarge,
    borderBottomWidth: 1,
    borderBottomColor: colors.purpleOpacity,
    paddingBottom: spacing.medium,
    paddingTop: spacing.medium
  },
  leaderboardImageWrapper: {
    position:'relative',
    width: 90,
    height: 90
  },
  leaderboardAvatarDefault: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 90,
    height: 90,
    zIndex: 10
  },
  leaderboardAvatar: {
    position: 'relative',
    zIndex: 20,
    backgroundColor: colors.white
  },
  leaderboardPlace: {
    position: 'absolute',
    bottom: -10,
    zIndex: 30,
    backgroundColor: colors.orange,
    color: colors.white,
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: fonts.baseSize * 2.5,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  leaderboardFirstPlace: {
    backgroundColor: colors.yellow,
    fontSize: fonts.baseSize * 3,
    width: 26,
    height: 26,
    borderRadius: 13,
    bottom: -13
  },
  leaderboardName: {
    textAlign: 'center',
    color: colors.purple,
    fontWeight: '500',
    marginTop: spacing.medium
  },
  leaderboardRank: {
    color: colors.orange,
    textAlign: 'center',
    fontSize: fonts.baseSize * 2.5
  },
  leaderBoardRankIcon: {

  },
  leaderboardItemImageWrapper: {
    position: 'relative',
    width: 45,
    height: 45,
    marginLeft: spacing.large
  },
  leaderboardItemPosition: {
    fontSize: fonts.baseSize * 3.5,
    color: colors.purple,
    paddingLeft: spacing.small
  },
  leaderboardItemAvatar: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    left: 0
  },
  leaderboardItemInfo: {
    flex: 1,
    marginLeft: spacing.medium,
    flexDirection: 'column'
  },
  leaderboardItemName: {
    fontWeight: '500',
    fontSize: fonts.baseSize * 3,
    color: colors.purple
  },
  leaderboardItemLevel: {
    fontSize: fonts.baseSize * 2.5,
    color: colors.purple
  },
  leaderboardItemRank: {
    color: colors.orange,
    fontSize: fonts.baseSize * 2.5,
    paddingRight: spacing.small
  },
  leaderboarItemIcon: {
    textAlign: 'center',
    color: colors.orange,
    fontSize: fonts.baseSize * 4,
    paddingRight: spacing.small
  },
  leaderboardItemPointsWrapper: {
    justifyContent: 'center'
  },
  leaderboardInfoBtn: {
    position: 'absolute',
    backgroundColor: colors.blue,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    right: 20,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  leaderboarInfoIcon: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.baseSize * 7
  },
  leaderboardModalText: {
    backgroundColor: colors.blue,
    color: colors.white,
    borderRadius: 12,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    paddingRight: spacing.medium,
    paddingLeft: spacing.medium,
    fontSize: fonts.baseSize * 3,
    marginBottom: spacing.extraLarge * 1.5
  },
  leaderboarCloseIcon: {
    fontSize: fonts.baseSize * 8,
    color: colors.orange,
    fontWeight: '800'
  },
  leaderboardModalOpenButton: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  leaderboardWinner: {
    fontSize: fonts.baseSize * 3,
    color: colors.orange,
    marginBottom: spacing.extraLarge
  },
  leaderboardModalMessage: {
    marginTop: spacing.medium,
    color: colors.orange,
    fontSize: fonts.baseSize * 3.5
  },
  leaederboardModalInfo: {
  }
}