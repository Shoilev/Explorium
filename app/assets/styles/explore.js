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
    height: 150
  },
  exploreCarouselItem: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    textAlign: 'center'
  },
  exploreCarouselImage: {
    width: '95%',
    height: 100,
    borderRadius: 15,
    backgroundColor: colors.orange
  },
  exploreCarouselPoints: {
    position:'absolute',
    top: 89,
    color: colors.white,
    fontWeight:'bold',
    fontSize: fonts.baseSize * 2.5,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small - 2,
    paddingBottom: spacing.small - 2,
    backgroundColor: colors.yellow,
    borderRadius: 10
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
  }
}
