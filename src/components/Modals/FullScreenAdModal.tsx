import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME, FONTS } from '../../constants/theme';
import { AudioService } from '../../services/audio';
import { StorageService } from '../../services/storage';
import { AdReason } from '../../services/adService';

interface FullScreenAdModalProps {
  visible: boolean;
  reason: AdReason;
  onClose: () => void;
  onReward: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const FullScreenAdModal: React.FC<FullScreenAdModalProps> = ({
  visible,
  reason,
  onClose,
  onReward,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [canSkip, setCanSkip] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Background music control: pause when ad opens, restore when it closes
  useEffect(() => {
    if (visible) {
      AudioService.stopBackgroundMusic();
      setSecondsLeft(5);
      setCanSkip(false);
      progressAnim.setValue(0);

      // 5-second progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start();

      const timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      const settings = StorageService.getProgress().settings;
      if (settings.music) {
        AudioService.startBackgroundMusic();
      }
    }
  }, [visible, progressAnim]);

  // Gentle pulse animation for the showcase card
  useEffect(() => {
    if (visible) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.03,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [visible, pulseAnim]);

  const handleFinish = () => {
    AudioService.playWoodClick();
    onReward();
    onClose();
  };

  const getReasonInfo = () => {
    switch (reason) {
      case 'hint':
        return {
          title: 'FREE HINT UNLOCKED',
          subtitle: 'Watch ad to get your move solution step',
          badge: '💡 HINT REWARD',
        };
      case 'retry':
        return {
          title: 'LEVEL RETRY UNLOCKED',
          subtitle: 'Watch ad to restart fresh and beat par',
          badge: '🔄 RETRY REWARD',
        };
      case 'tier':
        return {
          title: 'TIER COMPLETED!',
          subtitle: 'Watch ad to unlock the next difficulty tier',
          badge: '🏆 TIER ADVANCE',
        };
      case 'timer':
      default:
        return {
          title: '15-MINUTE BREAK',
          subtitle: 'Thanks for playing FreeBlock — enjoy your puzzle!',
          badge: '⏱️ PLAYTIME BREAK',
        };
    }
  };

  const info = getReasonInfo();

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Top Header Bar with 5s countdown and Skip control */}
        <View style={styles.topBar}>
          <View style={styles.adLabelContainer}>
            <Text style={styles.adTagText}>SPONSORED</Text>
          </View>

          {/* Skip button (locked during first 5 seconds, active after) */}
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!canSkip}
            onPress={handleFinish}
            style={[styles.skipButton, canSkip && styles.skipButtonActive]}
          >
            {canSkip ? (
              <View style={styles.skipButtonContent}>
                <Text style={styles.skipTextActive}>SKIP AD</Text>
                <Ionicons name="close" size={18} color="#FFFFFF" />
              </View>
            ) : (
              <View style={styles.skipButtonContent}>
                <Text style={styles.skipTextCountdown}>
                  Skip in {secondsLeft}s
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 5-second countdown progress bar */}
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        {/* Central Ad Showcase Card */}
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.adCard,
              { transform: [{ scale: pulseAnim }] },
            ]}
          >
            {/* Reward Category Badge */}
            <View style={styles.rewardBadge}>
              <Text style={styles.rewardBadgeText}>{info.badge}</Text>
            </View>

            {/* Official Branded Wooden Puzzle Showcase */}
            <View style={styles.showcasePreview}>
              <Image
                source={require('../../../assets/opening_logo.jpg')}
                style={styles.showcaseLogo}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.adCardTitle}>{info.title}</Text>
            <Text style={styles.adCardSub}>{info.subtitle}</Text>
          </Animated.View>
        </View>

        {/* Bottom Action Footer */}
        <View style={styles.footer}>
          {canSkip ? (
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleFinish}
              style={styles.claimButton}
            >
              <Text style={styles.claimButtonText}>
                {reason === 'hint'
                  ? 'USE HINT NOW'
                  : reason === 'retry'
                  ? 'RETRY LEVEL'
                  : reason === 'tier'
                  ? 'ENTER NEXT TIER'
                  : 'CONTINUE PLAYING'}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          ) : (
            <View style={styles.waitingContainer}>
              <Text style={styles.waitingText}>
                Ad will finish in {secondsLeft} seconds...
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#120904',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 50 : 28,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 8,
  },
  adLabelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  adTagText: {
    fontFamily: FONTS.semiBold,
    color: '#FFE2B8',
    fontSize: 11,
    letterSpacing: 1.5,
  },
  skipButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  skipButtonActive: {
    backgroundColor: '#C87B2E',
    borderColor: '#FFD54F',
    shadowColor: '#FFD54F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  skipButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skipTextCountdown: {
    fontFamily: FONTS.regular,
    color: '#D4C4B4',
    fontSize: 12,
  },
  skipTextActive: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 13,
    letterSpacing: 1,
  },
  progressBarTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD54F',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  adCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#2A150A',
    borderRadius: 24,
    borderWidth: 3.5,
    borderTopColor: '#6B3C1E',
    borderLeftColor: '#5C3419',
    borderRightColor: '#241005',
    borderBottomColor: '#170903',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 12,
  },
  rewardBadge: {
    backgroundColor: '#D97706',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#FFE082',
  },
  rewardBadgeText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
  },
  showcasePreview: {
    width: 140,
    height: 140,
    backgroundColor: '#1E0E06',
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: '#5A2A10',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  showcaseLogo: {
    width: '100%',
    height: '100%',
  },
  adCardTitle: {
    fontFamily: FONTS.title,
    color: '#FFDEAA',
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginTop: 10,
  },
  adCardSub: {
    fontFamily: FONTS.regular,
    color: '#E0C8B0',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 12,
  },
  claimButton: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderTopColor: '#81C784',
    borderBottomColor: '#1B5E20',
    borderLeftColor: '#66BB6A',
    borderRightColor: '#1B5E20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 8,
  },
  claimButtonText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 2,
  },
  waitingContainer: {
    paddingVertical: 14,
  },
  waitingText: {
    fontFamily: FONTS.regular,
    color: '#BFA896',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
