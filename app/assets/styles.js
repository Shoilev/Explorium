import { StyleSheet } from 'react-native'
import { colors, spacing, fonts, dimensions } from './styles/base';

const baseStyles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  yellowBackground: {
    backgroundColor: colors.yellow
  },
  yellowBackgroundOpacity: {
    backgroundColor: colors.yellowOpacity
  },
  orangeBackground: {
    backgroundColor: colors.orange
  },
  orangeBackgroundOpacity: {
    backgroundColor: colors.orangeOpacity
  },
  lightBlueBackground: {
    backgroundColor: colors.lightBlue
  },
  lightBlueBackgroundOpacity: {
    backgroundColor: colors.lightBlueOpacity
  },
  darkBlueBackground: {
    backgroundColor: colors.darkBlue
  },
  darkBlueBackgroundOpacity: {
    backgroundColor: colors.darkBlueOpacity
  },
  purpleBackground: {
    backgroundColor: colors.purple
  },
  purpleBackgroundOpacity: {
    backgroundColor: colors.purpleOpacity
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: colors.white
  },
  title: {
    fontSize: fonts.baseSize * 4,
    textAlign: 'center',
    margin: spacing.medium,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.gray,
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium,
    paddingLeft: spacing.extraLarge,
    paddingRight: spacing.extraLarge,
    marginBottom: spacing.large
  },
  textInput: {
    height: 40,
    borderWidth: 0,
    marginTop: spacing.medium,
    paddingLeft: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    color: colors.white,
    fontSize: fonts.baseSize * 3
  },
  searchInput: {
    color: colors.primeryBlue,
    height: 50,
    elevation: 10,
    paddingLeft: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: spacing.extraLarge,
    marginBottom: spacing.extraLarge,
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    fontSize: fonts.baseSize * 3
  },
  backgroundImage: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight
  },
  menuTab: {
    fontSize: fonts.baseSize * 8,
    color: colors.primeryBlue
  },
  headerBar: {
    height: 90,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBarTitle: {
    color: '#fff',
    fontSize: fonts.baseSize * 4,
    fontWeight: 'bold',
    marginTop: 25
  },
  headerBarBackIconWrapper: {
    position: 'absolute',
    top: '50%',
    left: 20
  },
  headerBarBackIcon: {
    color: colors.white,
    fontSize: fonts.baseSize * 4
  },
  explorePointsIcon: {
    fontSize: fonts.baseSize * 2.5,
    color: colors.white,
  }
}

export const createStyles = (overrides = {}) => {
  return StyleSheet.create({...baseStyles, ...overrides})
}
