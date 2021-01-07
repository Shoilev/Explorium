import { colors, spacing, fonts, dimensions } from './base';

export const CitiesStyles = {
  citiesSlide: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: spacing.extraLarge,
    marginBottom: spacing.extraLarge * 2,
    marginLeft: spacing.small,
    marginRight: spacing.small,
    backgroundColor: colors.white,
    elevation: 6,
  },
  citiesSlideWrapper: {
    flex: 1,
    alignItems: 'center',
    width: dimensions.fullWidth
  },
  citiesBackgroundImg: {
    height: '40%',
    width: dimensions.fullWidth,
    alignItems: 'center',
    zIndex: 10,
    flex: 1,
  },
  citiesImage: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
    height: '100%'
  },
  citiesPoints: {
    position: 'absolute',
    bottom: spacing.medium * -1,
    fontSize: fonts.baseSize * 2.3,
    zIndex: 20
  },
  citiesDetails: {
    padding: spacing.extraLarge,
    paddingTop: spacing.extraLarge,
    maxHeight: '60%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  cititesTitle: {
    fontSize: fonts.baseSize * 4,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e324d',
    marginBottom: spacing.medium
  },
  citiesScrollableDescritpion: {
    height: '70%',
    paddingRight: spacing.medium
  },
  citiesDescriptions: {
    textAlign: 'justify',
    flex:1,
    color: '#1e324d',
    fontSize: fonts.baseSize * 2.5
  },
  citiesTextBtn: {
    color: colors.white,
  },
  citiesBtnStyle: {
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    marginTop: spacing.extraLarge
  }
}