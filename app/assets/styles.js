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
    width: '90%',
    height: 40,
    borderWidth: 0,
    color: '#78849E',
    fontSize: fonts.baseSize * 3
  },
  searchInput: {
    color: colors.primeryBlue,
    height: 45,
    elevation: 10,
    paddingLeft: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: spacing.large,
    marginBottom: spacing.large,
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
    height: 80,
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
  headerBarMapIconWrapper: {
    position: 'absolute',
    top: '50%',
    right: 20,
    alignItems: 'center'
  },
  headerBarMapText: {
    color: colors.white,
    fontSize: fonts.baseSize * 2.2
  },
  headerBarBackIcon: {
    color: colors.white,
    fontSize: fonts.baseSize * 4
  },
  headerBarCloseIconWrapper: {
    position: 'absolute',
    top: '50%',
    right: 20
  },
  headerBarCloseIcon: {
    color: colors.white,
    fontSize: fonts.baseSize * 5
  },
  explorePointsIcon: {
    fontSize: fonts.baseSize * 2.5,
    color: colors.white,
  },
  explorePoints: {
    textAlign: 'center',
    color: colors.white,
    fontWeight:'bold',
    fontSize: fonts.baseSize * 2.2,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: colors.yellow,
    borderRadius: 10
  },
  exploreBoostText: {
    fontSize: fonts.baseSize * 3,
    color: colors.orange,
    marginBottom: spacing.small,
    fontWeight: '700',
    textAlign:'center'
  },
  exploreBoostIcon: {
    fontSize: fonts.baseSize * 4,
    color: colors.orange
  }
}

export const createStyles = (overrides = {}) => {
  return StyleSheet.create({...baseStyles, ...overrides})
}
