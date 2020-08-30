import { colors, spacing, fonts, dimensions } from './base';

export const Auth = {
  loginInput: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingBottom: 10,
    borderRadius: 12,
    width: '80%',
    height: 40,
    marginBottom: spacing.large,
  },
  introText: {
    color: colors.white,
    marginBottom: spacing.large
  },
  loginLogo: {
    width: 86,
    height: 93
  },
  loginTextBtn: {
    textTransform: 'uppercase',
    fontSize: fonts.baseSize * 3,
    color: colors.white
  },
  loginBtnStyle: {
    width: dimensions.width75,
    backgroundColor: colors.blue,
    marginTop: spacing.extraLarge,
    borderRadius: 12,
    elevation: 6
  },
  loginBtn: {
    backgroundColor: colors.orange,
    marginTop: spacing.small,
    width: 'auto',
    paddingRight: spacing.extraLarge * 2,
    paddingLeft: spacing.extraLarge * 2
  },
  signBtnStyle: {
    backgroundColor: 'transparent',
    paddingLeft: spacing.reset,
    paddingTop: spacing.reset,
    paddingBottom: spacing.reset,
    marginTop: spacing.large
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
    fontSize: fonts.baseSize * 4,
    marginTop: 9,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 8,
    color: '#78849E',
    borderRightWidth: 1,
    borderRightColor: '#F4F4F6'
  },
  registerTitle: {
    color: colors.white,
    fontSize: fonts.baseSize * 9,
    textAlign: 'center',
    marginBottom: spacing.large,
    fontWeight: '100',
    paddingRight: spacing.large,
    paddingLeft: spacing.large
  },
  loginBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    position: 'relative'
  },
  loginTextIcon: {
    fontSize: fonts.baseSize * 4,
    color: colors.white,
  },
  loginOrText: {
    color: colors.white,
    fontSize: fonts.baseSize * 3,
    marginBottom: spacing.large
  },
  loginInputWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.extraLarge,
    paddingBottom: spacing.extraLarge,
    backgroundColor: '#FECF39',
    borderRadius: 16
  },
  logingSignUpBtn: {
    color: colors.blue,
    fontSize: fonts.baseSize * 3.2,
    borderBottomColor: colors.blue,
    borderWidth: 1
  },
  loginLogoCircle: {
    width: 190,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 25,
    borderColor: '#FECF39',
    borderRadius: 95
  },
  backgroundCirle: {
    position: 'absolute',
    top: -45,
    left: -70,
    width: 180,
    height: 180,
    borderRadius: 180/2,
    borderWidth: 30,
    borderColor: '#FECF39'
  },
  backgroundCirleTwo: {
    position: 'absolute',
    top: 70,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 120/2,
    borderWidth: 30,
    borderColor: '#FECF39'
  }
}
