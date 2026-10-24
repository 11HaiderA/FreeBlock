/**
 * Web and non-native fallback stub for Google Mobile Ads.
 * On web, react-native-google-mobile-ads cannot be imported because it references
 * native-only codegen components.
 */

export function isNativeAdMobAvailable(): boolean {
  return false;
}

export function initNativeAdMob(): void {
  // No-op on web
}

export function showNativeInterstitial(_onClosed: () => void): boolean {
  // Not available on web, returns false so AdService uses in-app skippable ad modal
  return false;
}
