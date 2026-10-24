import { Platform } from 'react-native';
import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';
import { StorageService } from './storage';

// Real acoustic sound assets
const SOUND_SOURCES = {
  click: require('../../assets/sounds/wood_click.wav'),
  slide: require('../../assets/sounds/block_slide.wav'),
  snap: require('../../assets/sounds/block_snap.wav'),
  thud: require('../../assets/sounds/reject_thud.wav'),
  star1: require('../../assets/sounds/star_chime_1.wav'),
  star2: require('../../assets/sounds/star_chime_2.wav'),
  star3: require('../../assets/sounds/star_chime_3.wav'),
  win: require('../../assets/sounds/win_fanfare.wav'),
  music: require('../../assets/sounds/bg_music.wav'),
};

type SoundKey = keyof typeof SOUND_SOURCES;

// Audio player instances cache
const sfxPlayers: Partial<Record<SoundKey, AudioPlayer>> = {};
let bgMusicPlayer: AudioPlayer | null = null;
let isAudioModeConfigured = false;
let isMusicPlaying = false;

// Configure global audio settings for mobile devices
async function configureAudioSession() {
  if (isAudioModeConfigured) return;
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: 'mixWithOthers',
      shouldPlayInBackground: false,
    });
    isAudioModeConfigured = true;
  } catch (_) {
    // Graceful fallback if unsupported
  }
}

// Get or lazily instantiate an AudioPlayer
function getPlayer(key: SoundKey): AudioPlayer | null {
  try {
    if (!sfxPlayers[key]) {
      const player = createAudioPlayer(SOUND_SOURCES[key]);
      sfxPlayers[key] = player;
    }
    return sfxPlayers[key] || null;
  } catch (_) {
    return null;
  }
}

// Web Audio API context fallback (for browser testing environments)
let webAudioCtx: any = null;
function getWebAudioContext() {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass && !webAudioCtx) {
      webAudioCtx = new AudioContextClass();
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume();
    }
    return webAudioCtx;
  }
  return null;
}

// Fallback synth for web environments
function playWebFallback(key: SoundKey) {
  const ctx = getWebAudioContext();
  if (!ctx) return;

  try {
    if (key === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } else if (key === 'snap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.075);
    } else if (key === 'thud') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    }
  } catch (_) {}
}

export const AudioService = {
  /**
   * Play sound effect with volume and settings check
   */
  playSound(key: SoundKey, volume = 1.0) {
    const settings = StorageService.getProgress().settings;
    if (!settings.sound) return;

    configureAudioSession();

    const player = getPlayer(key);
    if (player) {
      try {
        player.volume = volume;
        player.seekTo(0);
        player.play();
        return;
      } catch (_) {}
    }

    playWebFallback(key);
  },

  // Wood button or block touch tap
  playWoodClick() {
    this.playSound('click', 0.85);
  },

  // Block sliding friction
  playBlockSlide() {
    this.playSound('slide', 0.65);
  },

  // Solid wooden block snap into grid
  playBlockSnap() {
    this.playSound('snap', 0.95);
  },

  // Rejected move or wall collision
  playRejectThud() {
    this.playSound('thud', 0.75);
  },

  // Crystalline marimba chime for star rating (0 = C5, 1 = E5, 2 = G5)
  playStarNote(noteIndex: number) {
    const starKeys: SoundKey[] = ['star1', 'star2', 'star3'];
    const key = starKeys[noteIndex % starKeys.length];
    this.playSound(key, 0.9);
  },

  // Win celebration fanfare
  playWinFanfare() {
    this.playSound('win', 0.95);
  },

  /**
   * Ambient peaceful background music (loops smoothly)
   */
  startBackgroundMusic() {
    const settings = StorageService.getProgress().settings;
    if (!settings.music) return;
    if (isMusicPlaying && bgMusicPlayer) {
      try {
        if (!bgMusicPlayer.playing) {
          bgMusicPlayer.play();
        }
        return;
      } catch (_) {}
    }

    configureAudioSession();

    try {
      if (!bgMusicPlayer) {
        bgMusicPlayer = createAudioPlayer(SOUND_SOURCES.music);
        bgMusicPlayer.loop = true;
      }
      bgMusicPlayer.volume = 0.35; // Gentle relaxing ambient level
      bgMusicPlayer.play();
      isMusicPlaying = true;
    } catch (_) {}
  },

  stopBackgroundMusic() {
    isMusicPlaying = false;
    try {
      if (bgMusicPlayer) {
        bgMusicPlayer.pause();
      }
    } catch (_) {}
  },

  setMusicEnabled(enabled: boolean) {
    if (enabled) {
      this.startBackgroundMusic();
    } else {
      this.stopBackgroundMusic();
    }
  },
};
