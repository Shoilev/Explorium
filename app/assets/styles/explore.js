import { colors, spacing } from './base';

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
  exploreBaseMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  }
}