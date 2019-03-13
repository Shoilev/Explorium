import { colors, spacing, fonts } from './base';

export const FriendsStyle = {
  friendsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    right: spacing.extraLarge * 2
  },
  friendsBtnText: {
    color: colors.white,
    padding: 0,
    margin: 0,
    fontSize: fonts.baseSize * 2.2
  },
  friendsBtn: {
    backgroundColor: colors.orange,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    marginBottom: spacing.reset,
    marginTop: spacing.medium,
    borderRadius: 10
  }
}