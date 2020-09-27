import { colors, spacing, fonts, dimensions } from './base';

export const ProfileStyle = {
  profileWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: dimensions.fullHeight
  },
  profileBtn: {
    // position: 'absolute',
    // bottom: 50,
    // left: '50%',
    backgroundColor: colors.orange,
    borderRadius: 20,
    marginTop: spacing.extraLarge
  },
  profileBtnText: {
    color: colors.white,
  },
  backgroundCover: {
    height: 280,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
  },
  backgroundCirle: {
    position: 'absolute',
    top: -45,
    left: -45,
    width: 180,
    height: 180,
    borderRadius: 180/2,
    borderWidth: 30,
    borderColor: '#FECF39'
  },
  backgroundCirleTwo: {
    position: 'absolute',
    top: 15,
    left: 200,
    width: 60,
    height: 60,
    borderRadius: 60/2,
    borderWidth: 15,
    borderColor: '#FECF39'
  },
  backgroundCirleThree: {
    position: 'absolute',
    top: 70,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 120/2,
    borderWidth: 30,
    borderColor: '#FECF39'
  },
  profileInnerContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: -150,
    width: dimensions.screenWidth - 80,
    elevation: 6
  },
  profileSettingsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 70,
    width: 70,
    height: 45,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: colors.orange
  },
  profileSettingsIcon: {
    color: colors.white,
    fontSize: fonts.baseSize * 4
  },
  profileSettingsLabel: {
    color: colors.white,
    fontSize: fonts.baseSize * 2
  },
  profileEditIcon: {
    color: colors.orange,
    fontSize: fonts.baseSize * 3
  },
  profileEditTitle: {
    fontSize: fonts.baseSize
  },
  profileWelcomeTitle: {
    color: colors.primeryBlue,
    fontSize: fonts.baseSize * 3,
    marginBottom: 0
  },
  profileTitle: {
    color: colors.primeryBlue,
    marginBottom: spacing.extraLarge,
    fontSize: fonts.baseSize * 5,
    marginTop: -5,
    marginBottom: spacing.medium
  },
  profileTotalPoints: {
    marginBottom: spacing.medium
  },
  profilePointsInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.medium
  },
  profilePointsInfoIcon: {
    fontSize: fonts.baseSize * 6,
    color: colors.orange,
    textAlign: 'center'
  },
  profilePointsInfoLabel: {
    color: colors.orange,
    fontSize: fonts.baseSize * 2.5,
    fontWeight: '700',
    textAlign: 'center'
  },
  profilePointsInfoLeft: {
    marginRight: spacing.extraLarge * 3
  },
  profilePointsLabel: {
    textAlign: 'center',
    marginBottom: 3,
    color: colors.navGray,
    fontSize: fonts.baseSize * 2.5
  },
  profileXPWrapper: {
    flex: 1,
    width: '100%',
    position: 'relative'
  },
  profileXPStatusBar: {
    width: 250,
    height: 15,
    flexDirection: 'row',
    backgroundColor: colors.orange,
    borderRadius: 10,
    marginBottom: spacing.small,
  },
  profileXPProgress: {
    backgroundColor: colors.yellow,
    borderRadius: 10
  },
  profileXPTarget: {
    position: 'absolute',
    right: 0,
    top: 10
  },
  profileXPTarget: {
    position: 'absolute',
    top: -2,
    width: '100%',
  },
  profileXPTargetText: {
    textAlign: 'center',
    color: colors.white
  },
  profileBadgesWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.screenWidth,
    marginTop: spacing.extraLarge * 1.5,
    paddingLeft: spacing.extraLarge,
    paddingRight: spacing.extraLarge,
    marginBottom: spacing.extraLarge * 1.5
  },
  profileBadgesTitle: {
    textAlign: 'left',
    width: '100%',
    fontSize: fonts.baseSize * 3.5,
    color: colors.primeryBlue
  },
  profileBadges: {
    flex: 1,
    width: dimensions.screenWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.medium
  },
  profileBadgeLabel: {
    textAlign: 'center',
    color: colors.primeryBlue,
    marginTop: spacing.small
  },
  settingsWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  settingsList: {
    width: dimensions.screenWidth,
    marginTop: 80,
    justifyContent: 'flex-start'
  },
  settingsListItem: {
    fontSize: fonts.baseSize * 3,
    padding: spacing.medium,
    paddingLeft: spacing.extraLarge,
    borderBottomWidth: 2,
    borderBottomColor: colors.gray
  },
  settingsLogoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.screenWidth
  },
  settingsInfoWrapper: {
    position: 'absolute',
    width: dimensions.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40
  },
  settingsInfo: {
    textAlign: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    position: 'relative',
    zIndex: 20
  },
  profileImageWrapper: {
    position:'relative',
    width: 90,
    height: 90,
    marginTop: -45,
  },
  profileAvatarDefault: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 80,
    height: 80,
    zIndex: 10
  },
  profileAvatar: {
    position: 'relative',
    zIndex: 20,
    backgroundColor: colors.white
  },
}