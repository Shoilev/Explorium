import { colors, spacing, fonts, dimensions } from './base';

export const CitiesStyles = {
  citiesSlide: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: spacing.extraLarge,
    marginBottom: spacing.extraLarge * 2,
    marginLeft: spacing.medium,
    marginRight: spacing.extraLarge,
    backgroundColor: colors.white,
    elevation: 6,
  },
  citiesSlideWrapper: {
    flex: 1,
    alignItems: 'center',
    width: dimensions.fullWidth
  },
  citiesImage: {
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
    height: '40%'
  },
  citiesPoints: {
    position: 'absolute',
    bottom: spacing.medium * -1,
    color: colors.white,
    backgroundColor: colors.yellow,
    fontSize: fonts.baseSize * 2.5,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10,
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
    color: colors.orange,
  },
  citiesBtnStyle: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.orange,
    borderRadius: 15,
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: spacing.extraLarge
  }
}