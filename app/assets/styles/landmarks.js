import { colors, spacing, fonts, dimensions } from './base';
const COLUMNS_NUM = 2;

export const LandmarksStyles = {
  landmarksRow: {
    flex: 1,
    marginTop: spacing.large,
    marginLeft: spacing.extraLarge,
    marginRight: spacing.extraLarge
  },
  landmarksBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.small,
    marginRight: spacing.small,
    marginBottom: spacing.extraLarge
  },
  landmarkImage: {
    height: (dimensions.screenWidth - 60) / COLUMNS_NUM,
    borderRadius: 20,
    overflow: 'hidden',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    elevation: 6
  },
  landmarksPointsWrap: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.yellow,
  },
  landmarkPoints: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fonts.baseSize * 3
  },
  landmarksText: {
    height: 40,
    overflow: 'hidden',
    textAlign: 'center',
    color: colors.primeryBlue,
    marginTop: spacing.medium,
    fontSize: fonts.baseSize * 3
  },
  landmarksDetails: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: spacing.extraLarge
  },
  landmarksDetailsPointsWrap: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 20,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    borderRadius: 20,
    backgroundColor: colors.yellow,
  },
  landmarkDetailsImage: {
    flex: 1,
    height: '20%',
    maxHeight: '30%',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems:'center',
    justifyContent:'center',
    elevation: 6
  },
  landmarkDetailsPoints: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fonts.baseSize * 3
  },
  landmarkDetailsBtn: {
    backgroundColor: colors.orange,
    borderRadius: 5,
    marginTop: spacing.large
  },
  landmarkDetailsBtnText: {
    color: colors.white
  }
}