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
    height: 100,
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
  countryListOfflineLabel: {
    color: colors.white,
    fontSize: fonts.baseSize * 3,
    marginBottom: spacing.medium,
    fontWeight: '700',
    textTransform: 'uppercase'
  }
}