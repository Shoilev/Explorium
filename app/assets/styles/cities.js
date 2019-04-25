import { colors, spacing, fonts, dimensions } from './base';

export const CitiesStyles = {
  citiesSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
    borderRadius:30,
    overflow: 'hidden',
    textAlign: 'center',
    marginTop: spacing.extraLarge,
    marginBottom: spacing.extraLarge * 2,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    elevation: 6,
  },
  citiesImageWrap: {
    width: dimensions.fullWidth,
    height: '40%',
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: colors.yellow,
    overflow: 'hidden'
  },
  citiesDetails: {
    padding: spacing.extraLarge * 2,
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
  citiesPoints: {
    position: 'absolute',
    bottom: spacing.medium,
    color: colors.white,
    backgroundColor: colors.yellow,
    fontSize: fonts.baseSize * 2,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 10
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