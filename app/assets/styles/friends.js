import { colors, spacing, fonts } from './base';

export const FriendsStyle = {
  friendsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    marginLeft: spacing.extraLarge,
    marginRight: spacing.medium,
    overflow: 'hidden',
    textAlign: 'center',
    width: '100%'
  },
  frendsItemLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: spacing.large
  },
  friendsText: {
    color: colors.white
  },
  friendsItemNumber: {
    color: colors.gray,
    fontWeight: 'normal',
    fontSize: 12
  },
  friendsRightBtn: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    right: spacing.extraLarge * 2
  },
  friendsWAIcon: {
    width: 30,
    height: 30,
  },
  friendsSMSIcon: {
    fontSize: fonts.baseSize * 5.5,
    color: colors.orange,
    marginRight: spacing.medium
  },
  friendsContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  friendsInviteBtn: {
    position: 'absolute',
    backgroundColor: colors.white,
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
  friendsInviteIcon: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  friendsShareText: {
    width: '90%',
    marginLeft: '5%',
    marginTop: spacing.large,
    textAlign: 'center',
    fontSize: fonts.baseSize * 3
  },
  friendsShareWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: spacing.large
  },
  friendShareCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: spacing.extraLarge
  },
  friendShareCircleChecked: {
    backgroundColor: colors.orange
  },
  firendsShareUser: {
    fontSize: fonts.baseSize * 4,
    color: colors.white
  },
  firendsShareUserChecked: {
    marginLeft: spacing.small
  },
  friendErrroMessage: {
    fontSize: fonts.baseSize * 4
  },
  friendsBtnCountryWrapper: {
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: spacing.medium
  },
  friendsBtnCountryTextStyle: {
    color: colors.white,
    fontSize: fonts.baseSize * 3
  },
}