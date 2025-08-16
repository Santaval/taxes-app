import config from '@/config/env';
import { Platform } from 'react-native';
import mobileAds, {
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

// Initialize the Google Mobile Ads SDK
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log('Initialization complete!', adapterStatuses);
  });

// Test IDs for development
const TEST_INTERSTITIAL_ID = Platform.OS === 'ios'
  ? TestIds.INTERSTITIAL
  : TestIds.INTERSTITIAL;

// Production IDs - Replace these with your actual AdMob IDs
const PRODUCTION_INTERSTITIAL_ID = Platform.OS === 'ios'
  ? config.iosAdMobKey
  : config.androidAdMobKey;

// Use test IDs in development, production IDs in production
const INTERSTITIAL_ID = __DEV__ ? TEST_INTERSTITIAL_ID : PRODUCTION_INTERSTITIAL_ID;

export const showInterstitialAd = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['finance', 'taxes', 'business']
    });

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show();
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      resolve();
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
      console.error('Interstitial ad error:', error);
      reject(error);
    });

    interstitial.load();
  });
};

// Usage example:
// try {
//   await showInterstitialAd();
//   console.log('Ad was shown successfully');
// } catch (error) {
//   console.error('Error showing ad:', error);
// }
