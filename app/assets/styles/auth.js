import { colors, spacing, fonts, dimensions } from './base';

export const Auth = {
  loginInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.black,
    paddingBottom: 10,
    width: dimensions.width75,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    marginTop: spacing.small,
  },
  introText: {
    color: colors.white,
    marginBottom: spacing.large
  },
  loginLogo: {
    width: dimensions.width70,
    maxWidth: 239
  },
  loginTextBtn: {
    textTransform: 'uppercase',
    fontSize: fonts.baseSize * 3,
    color: colors.white
  },
  loginBtnStyle: {
    width: dimensions.width75,
    backgroundColor: colors.darkGreyOpacity,
    marginTop: spacing.extraLarge,
  },
  signBtnStyle: {
    backgroundColor: 'transparent',
    paddingLeft: spacing.reset,
    paddingTop: spacing.reset,
    paddingBottom: spacing.reset,
  },
  signTextBtn: {
    color: colors.white
  },
  emailIcon: {
    fontSize: fonts.baseSize * 5,
    paddingTop: 18,
    color: colors.white
  },
  lockIcon: {
    fontSize: fonts.baseSize * 5,
    paddingTop: 18,
    color: colors.white
  },
  registerTitle: {
    color: colors.white,
    fontSize: fonts.baseSize * 9,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '100'
  }
}
