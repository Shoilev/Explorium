import { colors, spacing, fonts } from './base';

export const ExploreStyle = {
  exploreTextBtn: {
    color: colors.white
  },
  exploreBtnStyle: {
    backgroundColor: '#1e324d',
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
    width: '80%',
    backgroundColor: colors.primeryBlue,
  },
  exploreCheckInTextBtn: {
    color: colors.white,
    fontSize: fonts.baseSize * 4
  },
  exploreDirectionBtn: {
    backgroundColor: colors.orange
  },
  exploreDirectionBtnText: {
    color: colors.white
  }
}
