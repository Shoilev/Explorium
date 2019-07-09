import { colors, spacing, fonts } from './base';

export const CheckedInStyle = {
  checkedInContainer: {
    paddingLeft: spacing.extraLarge,
    paddingRight: spacing.extraLarge
  },
  checkedInImage: {
    width: 250,
    height: 250
  },
  checkedInPoints: {
    backgroundColor: colors.yellow,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    fontSize: fonts.baseSize * 2.5,
    color: colors.white,
    borderRadius: 100,
    marginTop: spacing.extraLarge * -2.5
  },
  checkedInTitle: {
    fontSize: fonts.baseSize * 7,
    marginTop: spacing.medium,
    color: colors.grassGreen,
    fontWeight: '700'
  },
  checkedInDescription: {
    color: colors.grassGreen,
    fontSize: fonts.baseSize * 2.5,
    fontWeight: '700',
    marginBottom: spacing.medium
  },
  checkedInLandmark: {
    color: colors.primeryBlue,
    fontSize: fonts.baseSize * 4,
    textTransform: 'uppercase',
    marginBottom: spacing.large * 2,
    textAlign: 'center'
  },
  checkedInButton: {
    backgroundColor: colors.primeryBlue,
    borderRadius: 100,
    marginTop: spacing.extraLarge * 1.5
  },
  checkedInButtonText: {
    color: colors.white,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  checkedInShareIcon: {
    marginBottom: spacing.extraLarge * 1.5
  },
  checkedInShareText: {
    textTransform: 'uppercase',
    color: colors.primeryBlue,
    marginBottom: spacing.small
  }
}