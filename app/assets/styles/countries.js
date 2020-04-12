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
  countryListCardOffline: {
    opacity: 0.5
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
    fontSize: fonts.baseSize * 2.5,
    color: colors.white,
    borderRadius: 10
  },
  countryListOfflineLabel: {
    color: colors.white,
    fontSize: fonts.baseSize * 3,
    marginBottom: spacing.medium,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
}