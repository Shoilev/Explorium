import { colors, spacing, fonts, dimensions } from './base';

export const ExploreStyle = {
  exploreTextBtn: {
    color: colors.white
  },
  exploreBtnStyle: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 15,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    marginTop: spacing.medium
  },
  exploreBaseMapWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exploreBaseMap: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  exploreModel: {
    width: 230,
    height: 230,
    borderRadius: 230,
    backgroundColor: '#314367',
    overflow: 'hidden',
    opacity: 0
  },
  exploreModelLoaded: {
    width: 230,
    height: 230,
    borderRadius: 230,
    backgroundColor: '#314367',
    overflow: 'hidden',
    opacity: 1
  },
  exploreLoadingWrapper: {
    position:'absolute',
    top: '40%'
  },
  exploreLoadingMsg: {
    color: colors.white
  },
  exploreButtonSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreCheckInBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0078b4',
    padding: spacing.large,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    marginBottom: spacing.large,
    borderRadius: 20
  },
  exploreCheckInDisabledBtn: {
    backgroundColor: colors.gray,
  },
  exploreCheckInTextBtn: {
    color: colors.white,
    fontSize: fonts.baseSize * 4,
    fontWeight: 'bold',
  },
  exploreDirectionBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exploreDirectionBtnText: {
    color: colors.primeryBlue
  },
  exploreDirectionIcon: {
    width: 60,
    height: 60,
  },
  exploreCheckInIcon: {
    width: 40,
    height: 40,
    marginRight: spacing.small
  },
  exploreBackgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5
  },
  exploreIntroText: {
    fontSize: fonts.baseSize * 4,
    color: colors.white,
    marginBottom: spacing.extraLarge
  },
  exploreCountryText: {
    fontSize: fonts.baseSize * 8,
    color: colors.white,
    marginBottom: spacing.small,
    textAlign: 'center'
  },
  exploreIntroLogo: {
    position: 'absolute',
    top: 30,
    width: 100,
    height: 57,
    opacity: 0.5
  },
  exploreMessageAlertWrap: {
    position: 'absolute',
    left: '10%',
    bottom: 30,
    width: '100%'
  },
  exploreMessageAlert: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: spacing.medium,
    borderWidth: 2,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  exploreMessageTextBtn: {
    color: colors.black,
    padding: 0,
    margin: 0
  },
  exploreMessageBtn: {
    width: '50%',
    backgroundColor: colors.white,
    paddingBottom: 3,
    paddingTop: 3,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 0,
    marginTop: 3
  },
  exploreMessageText: {
    color: colors.white
  },
  exploreMap: {
    position:'absolute',
    top:0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  exploreMapContainer: {
    position: 'relative'
  },
  exploreItemWrapper: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 100,
    height: 150,
    bottom: 0,
    left: 20,
    width: dimensions.screenWidth - 40,
    backgroundColor: colors.black,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  exploreMapItemImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.yellow
  },
  exploreMapTitle: {
    width: '100%',
    color: colors.white,
    textAlign: 'center',
    position:'absolute',
    bottom:0,
    left: 0
  },
  exploreMapTitleText: {
    padding: 5,
    color: '#123c55',
    backgroundColor: 'rgba(205, 209, 213, 0.8);',
    textAlign: 'center'
  },
  exploreMapTexShadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.8);',
    color: colors.white
  },
  exploreMapPoints: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center',
    backgroundColor: colors.yellow,
    borderRadius: 30,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: fonts.baseSize * 2
  },
  exploreExploredLabelWrapper: {
    position:'absolute',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.exploredBlueOpacity
  },
  exploreExploredImage: {
    width: 25,
    height: 25,
    marginRight: spacing.small
  },
  exploreExploredLabel: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  exploreMapLandmarkButton: {
    position:'absolute',
    top: 10,
    left: 10,
    zIndex:12,
    backgroundColor: '#50ced3',
    borderRadius: 30,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium
  },
  exploreMapLandmarkShadowButton: {
    backgroundColor: colors.black
  },
  exploreMapButtonTitle: {
    color: colors.white
  },
  exploreErrorMessage: {
    padding: spacing.extraLarge,
    textAlign: 'center'
  },
  exploreBackBtn: {
    backgroundColor: '#50ced3',
    borderRadius: 30,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: spacing.large,
    paddingRight: spacing.large
  },
  exploreMarker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45
  },
  exploreMarkerImage: { 
    width: 45,
    height: 45
  }
}
