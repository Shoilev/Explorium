import { colors, spacing, fonts } from './base';

export const ProfileStyle = {
  profileWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileBtn: {
    backgroundColor: colors.primeryBlue,
    borderRadius: 20,
    marginTop: spacing.extraLarge
  },
  profileBtnText: {
    color: colors.white,
  },
  profileBackgroundImage: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  profileImageFb: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginTop: 150,
    borderWidth: 1,
    borderColor: colors.white
  },
  profileImage: {
    width: 200,
    height: 200,
    marginTop: 150,
  },
  profileTitle: {
    color: colors.primeryBlue,
    marginBottom: spacing.extraLarge * 2
  },
  profileIcon: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  profileScore: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
    width: 200,
    backgroundColor: '#65c7d4',
    borderRadius: 20,
    padding: spacing.small
  },
  profileRightScore: {
    position: 'absolute',
    right: 20,
    fontWeight: '700'
  }
}