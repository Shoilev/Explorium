import { colors, spacing, fonts } from './base';

export const CheckedInStyle = {
  checkedInContainer: {
    paddingLeft: spacing.extraLarge,
    paddingRight: spacing.extraLarge,
    backgroundColor: colors.yellow,
    paddingTop: spacing.large * 1.4
  },
  checkedInCircleTop: {
    backgroundColor: colors.yellow,
    width: 250,
    height: 250,
    borderWidth: 40,
    borderColor: '#FECF39',
    position: 'absolute',
    top: -100,
    left: -100,
    borderRadius: 250/2
  },
  checkedInCircleBottom: {
    backgroundColor: colors.yellow,
    width: 250,
    height: 250,
    borderWidth: 40,
    borderColor: '#FECF39',
    position: 'absolute',
    bottom: -100,
    right: -100,
    borderRadius: 250/2
  },
  checkedInContent: {
    alignItems: 'center',
    width: '80%',
    backgroundColor: colors.white,
    elevation: 6,
    borderRadius: 42,
    paddingBottom: spacing.extraLarge * 1.5
  },
  checkedInLandmarkImage: {
    width: 160,
    height: 110,
    borderRadius: 12,
    marginTop: -40
  },
  checkedInPoints: {
    backgroundColor: colors.yellow,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: fonts.baseSize * 2,
    color: colors.white,
    borderRadius: 30,
  },
  exploredImageWrapper: {
    marginTop: -105,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100
  },
  exploredImageFirstCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 90/2,
    backgroundColor: 'rgba(54,67,255,0.3)'
  },
  exploredImageSecondCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 65/2,
    backgroundColor: 'rgba(54,67,255,0.6)'
  },
  exploredImageThirdCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 45/2,
    backgroundColor: 'rgb(54,67,255)'
  },
  exploredImageInCircle: {
    width: 25,
    height: 25
  },
  checkedInLandmark: {
    width: 150,
    color: colors.primeryBlue,
    fontSize: fonts.baseSize * 3,
    marginBottom: spacing.small,
    marginTop: spacing.small,
    textAlign: 'center'
  },
  checkedInTitle: {
    marginTop: spacing.medium,
    fontSize: fonts.baseSize * 6,
    color: colors.orange,
    fontWeight: '600'
  },
  checkedInDescription: {
    width: 180,
    color: colors.primeryDarkBlue,
    fontSize: fonts.baseSize * 3,
    fontWeight: '700',
    marginTop: spacing.medium,
    marginBottom: spacing.extraLarge * 1.3,
    textAlign: 'center'
  },
  checkedInShareText: {
    color: '#78849E',
    marginBottom: spacing.small
  },
  checkedInFBIcon: {
    color: '#1976D2',
    fontSize: fonts.baseSize * 10
  },
  checkedInButton: {
    backgroundColor: colors.blue,
    borderRadius: 10,
    marginTop: spacing.extraLarge * 1.5
  },
  checkedInButtonText: {
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    color: colors.white,
    textTransform: 'uppercase'
  },
  levelUpContent: {
    paddingTop: spacing.extraLarge,
    paddingBottom: spacing.extraLarge * 1.5
  },
  levelUpImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130
  },
  levelUpImageFirstCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 130/2,
    backgroundColor: 'rgba(54,67,255,0.3)'
  },
  levelUpImageSecondCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    borderRadius: 90/2,
    backgroundColor: 'rgba(54,67,255,0.6)'
  },
  levelUpImageThirdCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor: 'rgb(54,67,255)'
  },
  levelUpImageInCircle: {
    textAlign:'center',
    fontSize: fonts.baseSize * 6,
    color: colors.white
  },
  levelUpTitle: {
    color: colors.primeryDarkBlue,
    fontSize: fonts.baseSize * 5.5,
    marginBottom: spacing.small
  },
  levelUpNumber: {
    color: colors.orange,
    fontSize: fonts.baseSize * 6.5,
    fontWeight: '600'
  },
  levelUpShareText: {
    marginTop: spacing.extraLarge
  },
  levelUpPoints: {
    fontSize: fonts.baseSize * 2.5,
    marginBottom: spacing.large
  }
}