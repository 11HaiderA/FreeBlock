/* eslint-disable @typescript-eslint/no-require-imports */
import { TurboModuleRegistry } from 'react-native';

/**
 * Native implementation for Google Mobile Ads on iOS and Android.
 * Metro resolves this file exclusively on native runtimes.
 */

export const ADMOB_APP_ID = 'ca-app-pub-8090216489030865~3376119637';
export const PRODUCTION_INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-8090216489030865/3874939391';

export function isNativeAdMobAvailable(): boolean {
  try {
    const nativeModule = TurboModuleRegistry.get('RNGoogleMobileAdsModule');
    return !!nativeModule;
  } catch {
    return false;
  }
}

let isInitialized = false;
let interstitialAdInstance: any = null;
let isInterstitialLoaded = false;
let isLoading = false;

function loadInterstitial(): void {
  if (!isNativeAdMobAvailable() || isLoading) return;

  try {
    const mobileAdsModule = require('react-native-google-mobile-ads');
    const { InterstitialAd, TestIds, AdEventType } = mobileAdsModule;
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : PRODUCTION_INTERSTITIAL_AD_UNIT_ID;

    isLoading = true;
    interstitialAdInstance = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const loadedUnsub = interstitialAdInstance.addAdEventListener(AdEventType.LOADED, () => {
      isInterstitialLoaded = true;
      isLoading = false;
      loadedUnsub();
    });

    const errorUnsub = interstitialAdInstance.addAdEventListener(AdEventType.ERROR, (error: any) => {
      console.warn('AdMob Interstitial failed to load:', error);
      isInterstitialLoaded = false;
      isLoading = false;
      errorUnsub();
    });

    interstitialAdInstance.load();
  } catch (err) {
    console.warn('Error creating InterstitialAd:', err);
    isInterstitialLoaded = false;
    isLoading = false;
  }
}

export function initNativeAdMob(): void {
  if (!isNativeAdMobAvailable() || isInitialized) return;

  try {
    const mobileAdsModule = require('react-native-google-mobile-ads');
    const mobileAds = mobileAdsModule.default;

    mobileAds()
      .initialize()
      .then(() => {
        isInitialized = true;
        loadInterstitial();
      })
      .catch((err: any) => {
        console.warn('AdMob initialization error:', err);
      });
  } catch {
    // Graceful fallback
  }
}

export function showNativeInterstitial(onClosed: () => void): boolean {
  if (!isNativeAdMobAvailable() || !isInterstitialLoaded || !interstitialAdInstance) {
    return false;
  }

  try {
    const { AdEventType } = require('react-native-google-mobile-ads');

    let closed = false;
    const handleClose = () => {
      if (closed) return;
      closed = true;
      isInterstitialLoaded = false;
      // Preload next interstitial for subsequent transitions
      loadInterstitial();
      onClosed();
    };

    const closeUnsub = interstitialAdInstance.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        closeUnsub();
        handleClose();
      }
    );

    const errorUnsub = interstitialAdInstance.addAdEventListener(
      AdEventType.ERROR,
      () => {
        errorUnsub();
        handleClose();
      }
    );

    interstitialAdInstance.show();
    return true;
  } catch {
    return false;
  }
}
