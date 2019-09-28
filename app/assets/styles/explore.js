import { colors, spacing, fonts } from './base';

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
  }
}
