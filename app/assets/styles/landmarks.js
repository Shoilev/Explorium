import { colors, spacing, fonts, dimensions } from './base';
const COLUMNS_NUM = 2;

export const LandmarksStyles = {
  landmarksContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  landmarksShadowCities: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection:'row',
    marginTop: spacing.extraLarge
  },
  landmarksShdowCitiesInner: {
    width: 170,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.primeryBlue,
    borderRadius: 50,
    marginBottom: spacing.large,
  },
  shadowCitiesLabel: {
    color: colors.white
  },
  landmarksRow: {
    flex: 1,
    paddingRight: spacing.large,
    paddingLeft: spacing.large
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
    elevation: 6,
    position: 'relative',
    backgroundColor: colors.yellow
  },
  landmarksPointsWrap: {
    flex:1,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 20,
    borderRadius: 30,
    backgroundColor: colors.yellow,
  },
  landmarkPoints: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.baseSize * 2.5,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8
  },
  landmarksText: {
    height: 40,
    overflow: 'hidden',
    textAlign: 'center',
    color: colors.primeryBlue,
    marginTop: spacing.medium,
    fontSize: fonts.baseSize * 3
  },
  landmarksDescription: {
    textAlign: 'center',
    color: colors.primeryBlue,
    marginTop: spacing.medium,
    fontSize: fonts.baseSize * 3
  },
  landmarkScrollDescription: {
    height: '15%',
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
    backgroundColor: colors.yellow,
    elevation: 6,
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
  },
  landmarkExploredLabelWrapper: {
    position:'absolute',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(4, 130, 178, 0.6)'
  },
  landmarkExploredImage: {
    width: 25,
    height: 25,
    marginRight: 2
  },
  landmarkExploredImageLarge: {
    width: 40,
    height: 40,
  },
  landmarkExploredLabel: {
    padding: spacing.small,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  landmarkExploredLabelLarge: {
    fontSize: fonts.baseSize * 3
  },
  landmarkShadowActive: {
    backgroundColor: '#1f1f1f'
  }
}