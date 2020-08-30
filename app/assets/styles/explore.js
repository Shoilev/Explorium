import { colors, spacing, fonts, dimensions } from './base';

export const ExploreStyle = {
  exploreTextBtn: {
    color: colors.white,
    fontSize: fonts.baseSize * 3
  },
  exploreBtnStyle: {
    position: 'relative',
    zIndex: 100,
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingTop: 7,
    paddingBottom: 7,
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
    backgroundColor: colors.blue,
    padding: spacing.extraLarge * 2,
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium,
    marginBottom: spacing.extraLarge * 2.5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  exploreCheckInDisabledBtn: {
    backgroundColor: colors.gray,
  },
  exploreCheckInTextBtn: {
    color: colors.white,
    fontSize: fonts.baseSize * 3,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  exploreDirectionBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exploreDirectionBtnText: {
    color: colors.blue,
    fontWeight: '700'
  },
  exploreDirectionIcon: {
    fontSize: fonts.baseSize * 10,
    color: colors.blue
  },
  exploreCheckInIcon: {
    position: 'absolute',
    fontSize: fonts.baseSize * 12,
    color: colors.white,
    left: 10,
    opacity: 0.25
  },
  exploreIntroText: {
    fontSize: fonts.baseSize * 3,
    color: colors.white,
    marginBottom: spacing.extraLarge,
    backgroundColor: 'rgba(255, 126, 41, 0.8)'
  },
  exploreCountryText: {
    marginTop: spacing.extraLarge * 3,
    backgroundColor: 'rgba(255, 126, 41, 0.8)',
    fontSize: fonts.baseSize * 6,
    color: colors.white,
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    marginBottom: spacing.small,
    textAlign: 'center'
  },
  exploreMessageAlertWrap: {
    position: 'absolute',
    left: '5%',
    bottom: 40,
    width: '100%'
  },
  exploreMessageAlert: {
    elevation: 6,
    backgroundColor: colors.blue,
    borderRadius: 15,
    padding: spacing.medium,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.medium,
  },
  exploreMessageTextBtn: {
    color: colors.orange,
    fontSize: fonts.baseSize * 2.2,
    padding: 0,
    margin: 0
  },
  exploreMessageBtn: {
    backgroundColor: colors.transparent,
    paddingBottom: 3,
    paddingTop: 3,
    paddingRight: 8,
    paddingLeft: 8,
    marginBottom: 0,
    marginTop: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.orange
  },
  exploreMessageText: {
    textAlign: 'center',
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
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  exploreItemWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 100,
    height: 160,
    overflow: 'hidden',
    elevation: 6,
    marginBottom: spacing.extraLarge * 2,
    width: dimensions.screenWidth - 80,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  exploreMapImageWrappper: {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 6,
    width: '100%',
    height: 110,
    borderRadius: 12,
  },
  exploreMapItemImage: {
    width: '100%',
    height: 110,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.yellow
  },
  exploreMapTitle: {
    width: '100%',
    backgroundColor: colors.white,
    textAlign: 'center',
    marginTop: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  exploreMapTitleText: {
    padding: 5,
    color: colors.primeryBlue,
    backgroundColor: colors.white,
    textAlign: 'center'
  },
  exploreMapTexShadow: {
    backgroundColor: 'rgba(0, 0, 0, 0.8);',
    color: colors.white
  },
  exploreMapPoints: {
    marginTop: -9
  },
  exploreExploredLabelWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 110,
    borderRadius: 12,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.exploredBlueOpacity
  },
  exploreExploredLabelImage: {
    position:'absolute',
    flex:1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    backgroundColor: colors.exploredBlueOpacity,
    width: '100%',
    height: 100,
    borderRadius: 15,
    zIndex: 15
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
  exploreErrorMessage: {
    padding: spacing.extraLarge,
    textAlign: 'center'
  },
  exploreBackBtn: {
    backgroundColor: colors.orange,
    borderRadius: 12,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: spacing.large,
    paddingRight: spacing.large
  },
  exploreBackBtnText: {
    color: colors.white,
  },
  exploreMapBackBtn: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 20,
    backgroundColor: 'transparent'
  },
  exploreMapBackBtnIcon: {
    fontSize: fonts.baseSize * 8,
    color: colors.blue
  },
  exploreMapBackBtnText: {
    color: colors.blue,
    textAlign: 'center'
  },
  exploreMarker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45
  },
  exploreMarkerIndex: {
    marginTop: -30,
    color: colors.white,
    fontWeight: '700'
  },
  exploreMarkerImage: { 
    width: 45,
    height: 45
  },
  exploreMainImage: {
    alignItems: 'center',
    height: 260,
    width:'100%',
    backgroundColor: colors.orange,
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    marginBottom: spacing.large
  },
  exploreErrorMsg: {
    marginTop: spacing.extraLarge * 4,
    color: colors.white,
    backgroundColor: colors.orange,
    fontSize: fonts.baseSize * 4,
    paddingLeft: 5,
    paddingRight: 5
  },
  exploreBtnCountryWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 45,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: colors.orange
  },
  exploreBtnCountryTextStyle: {
    color: colors.white,
    fontSize: fonts.baseSize * 2
  },
  exploreIconCountry: {
    fontSize: fonts.baseSize * 5,
    color: colors.white
  },
  exploreCarouselItemWrapper: {
    flex: 1,
    height: 150,
    marginLeft: spacing.medium
  },
  exploreCarouselItem: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    textAlign: 'center'
  },
  exploreCarouselImage: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    backgroundColor: colors.orange
  },
  exploreCarouselPoints: {
    position:'absolute',
    top: 89,
    zIndex: 20
  },
  exploreCarouselTitle: {
    color: '#160442',
    textAlign: 'center',
    padding: spacing.medium
  },
  exploreAttractionTitle: {
    fontSize: fonts.baseSize * 4,
    fontWeight: 'bold',
    color: '#17034A',
    padding: 10,
    paddingBottom: 20
  },
  exploreBoostWrapper: {
    backgroundColor: colors.orange,
    padding: spacing.medium
  },
  exploreBaseMapBackBtn: {
    position:'absolute',
    top: 40,
    left: 0,
    width: 70,
    height: 45,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exploreBaseMapBackIcon: {
    fontSize: fonts.baseSize * 4,
    color: colors.white
  },
  exploreShadowMarkerIcon: {
    fontSize: fonts.baseSize * 6,
    color: colors.primeryBlue
  },
  exploreMarkerIcon: {
    fontSize: fonts.baseSize * 6,
    color: colors.orange,
  }
}
