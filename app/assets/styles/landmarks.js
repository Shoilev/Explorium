import { colors, spacing, fonts, dimensions } from './base';
const COLUMNS_NUM = 2;

export const LandmarksStyles = {
  landmarksHeaderBarActive: {
    backgroundColor: colors.shadowDarkBlue
  },
  landmarksContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative'
  },
  landmarksShadowCities: {
    position: 'absolute',
    right: 0,
    top: spacing.extraLarge * 2,
    justifyContent: 'flex-end',
    flexDirection:'row',
    marginTop: 0,
    position: 'relative',
    height: 20,
    zIndex: 100
  },
  landmarkShadowIconButton: {
    width: 83,
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: colors.orange,
    paddingLeft: spacing.medium,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    marginBottom: 0,
    zIndex: 120
  },
  landmarkShadowButtonActive: {
    backgroundColor: colors.shadowDarkBlue
  },
  landmarkShadowIcon: {
    fontSize: fonts.baseSize * 5,
    color: colors.white
  },
  landmarkShadowActiveIcon: {
    color: colors.orange
  },
  shadowCitiesLabel: {
    color: colors.white,
    fontSize: fonts.baseSize * 2.2,
    lineHeight: fonts.baseSize * 2.2,
    width: 50,
    textAlign: 'center'
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
    marginBottom: spacing.extraLarge,
    elevation: 6,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.white
  },
  landmarkBoxShadowActive: {
    backgroundColor: colors.darkGray
  },
  landmarkBoxSpace: {
    marginRight: spacing.extraLarge
  },
  landmarkImage: {
    height: (dimensions.screenWidth - 60) / 3,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    zIndex: 10,
    backgroundColor: colors.orange
  },
  landmarksPointsWrap: {
    flex:1,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: spacing.medium * -1,
    borderRadius: 30,
    zIndex: 20,
    backgroundColor: colors.yellow,
  },
  landmarksText: {
    height: 40,
    overflow: 'hidden',
    textAlign: 'center',
    color: colors.primeryBlue,
    marginTop: spacing.large,
    marginBottom: spacing.medium,
    fontSize: fonts.baseSize * 3
  },
  landmarksTextShadowActive: {
    color: colors.white
  },
  landmarkTitle: {
    color: colors.orange,
    marginTop: spacing.medium,
    marginBottom: spacing.medium,
    fontSize: fonts.baseSize * 4
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
    bottom: spacing.medium * -1,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small - 2,
    paddingBottom: spacing.small - 2,
    borderRadius: 20,
    zIndex: 20,
    backgroundColor: colors.yellow,
  },
  landmarkDetailsImage: {
    height: 220,
    width:'100%',
    borderBottomRightRadius: 44,
    borderBottomLeftRadius: 44,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.yellow,
    elevation: 6,
  },
  landmarkDetailsPoints: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fonts.baseSize * 2.5
  },
  landmarkDetailsBtn: {
    backgroundColor: colors.orange,
    borderRadius: 10,
    marginTop: spacing.large
  },
  landmarkDetailsBtnText: {
    color: colors.white,
    fontWeight: 'bold'
  },
  landmarkDetailsBtnIcon: {
    color: colors.white,
    fontSize: fonts.baseSize * 4
  },
  landmarkExploredLabelWrapper: {
    position:'absolute',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(4, 130, 178, 0.6)'
  },
  landmarkDetailedExploredWrapper: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
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
    backgroundColor: colors.shadowBlue
  },
  landmarkHeaderBar: {
    backgroundColor: 'transparent'
  },
  landmarkHeaderBarIcon: {
    position: 'absolute',
    top: 40,
    left: 0,
    zIndex: 30,
    backgroundColor: colors.orange,
    width: 70,
    height: 45,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
}