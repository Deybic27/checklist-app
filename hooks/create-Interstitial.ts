import { InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

export function createInterstitial() {
  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-5841346931351630/3776573682';

  return InterstitialAd.createForAdRequest(adUnitId);
}