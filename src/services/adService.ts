import { AudioService } from './audio';
import { StorageService } from './storage';
import {
  isNativeAdMobAvailable,
  initNativeAdMob,
  showNativeInterstitial,
} from './nativeAds';

export type AdReason = 'hint' | 'retry' | 'tier' | 'timer';

export interface ShowAdOptions {
  reason: AdReason;
  onComplete: () => void;
}

type FallbackAdModalHandler = (options: ShowAdOptions) => void;

let fallbackModalHandler: FallbackAdModalHandler | null = null;

// 15-minute consecutive active play tracker (900 seconds)
const FIFTEEN_MINUTES_SECONDS = 900;
let consecutivePlaySeconds = 0;
let playtimeTimer: any = null;
let onPlaytimeTriggerCallback: (() => void) | null = null;

export const AdService = {
  /**
   * Register the UI component that renders the full-screen 5s skippable ad
   * when native AdMob is not active (Expo Go, Web, offline, or fallback).
   */
  registerFallbackModalHandler(handler: FallbackAdModalHandler | null) {
    fallbackModalHandler = handler;
  },

  /**
   * Initializes AdMob if on native runtime and module exists
   */
  init() {
    initNativeAdMob();
  },

  /**
   * Show an ad for a given reason (hint, retry, tier completion, or 15-min timer).
   * All ads are full-screen and can be skipped after 5 seconds.
   */
  showAd(options: ShowAdOptions) {
    const { reason, onComplete } = options;

    const prevMusicEnabled = StorageService.getProgress().settings.music;

    // Try showing native AdMob interstitial
    const handledNatively = showNativeInterstitial(() => {
      if (prevMusicEnabled) {
        AudioService.startBackgroundMusic();
      }
      onComplete();
    });

    if (handledNatively) {
      AudioService.stopBackgroundMusic();
      return;
    }

    // Fallback: Show full-screen in-app ad modal (5s skippable)
    if (fallbackModalHandler) {
      fallbackModalHandler({
        reason,
        onComplete,
      });
    } else {
      // If no UI handler registered yet, complete immediately to avoid freezing game
      onComplete();
    }
  },

  // -------------------------------------------------------------
  // 15-Minute Consecutive Active Gameplay Timer
  // -------------------------------------------------------------
  startPlaytimeTracker(onTriggerAd: () => void) {
    onPlaytimeTriggerCallback = onTriggerAd;
    if (playtimeTimer) {
      clearInterval(playtimeTimer);
    }

    playtimeTimer = setInterval(() => {
      consecutivePlaySeconds += 1;
      if (consecutivePlaySeconds >= FIFTEEN_MINUTES_SECONDS) {
        consecutivePlaySeconds = 0;
        if (onPlaytimeTriggerCallback) {
          onPlaytimeTriggerCallback();
        }
      }
    }, 1000);
  },

  pausePlaytimeTracker() {
    if (playtimeTimer) {
      clearInterval(playtimeTimer);
      playtimeTimer = null;
    }
  },

  resetPlaytimeTracker() {
    consecutivePlaySeconds = 0;
  },

  getConsecutivePlaySeconds(): number {
    return consecutivePlaySeconds;
  },
};

export { isNativeAdMobAvailable };
