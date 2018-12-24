import { colors, spacing, fonts } from './base';

export const CountriesStyles = {
  countryListCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    height: 120,
    borderRadius:20,
    overflow: 'hidden',
    textAlign: 'center'
  },
  countryListTitle: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fonts.baseSize * 6,
    fontWeight: 'bold'
  },
  countryListPoints: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    fontSize: fonts.baseSize * 2,
    color: colors.white,
    borderRadius: 10
  }
}