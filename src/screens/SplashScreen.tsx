import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  ImageBackground,
  Easing,
  StatusBar,
} from 'react-native';
import { FONTS } from '../constants/theme';
import { AudioService } from '../services/audio';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL_SEGMENTS = 10;

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [filledCount, setFilledCount] = useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.75)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const textScaleAnim = useRef(new Animated.Value(0.85)).current;
  const textPulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Entrance Animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        useNativeDriver: true,
      }),
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 42,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(180),
        Animated.spring(textScaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 2. Smooth Floating Bobbing for Logo
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -7,
          duration: 1700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    floatLoop.start();

    // 3. Gentle Breathing Text Pulse
    const textPulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(textPulseAnim, {
          toValue: 1.025,
          duration: 1350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(textPulseAnim, {
          toValue: 1,
          duration: 1350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    textPulseLoop.start();

    // 4. Realistic Segmented Wooden Loading Bar Progress (0% -> 100% over 4.2 seconds)
    const listenerId = progressAnim.addListener(({ value }) => {
      const currentSegment = Math.min(
        TOTAL_SEGMENTS,
        Math.floor((value / 100) * TOTAL_SEGMENTS)
      );
      setFilledCount((prev) => {
        if (currentSegment > prev) {
          AudioService.playWoodClick();
          return currentSegment;
        }
        return prev;
      });
    });

    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 4200,
      easing: Easing.bezier(0.22, 0.61, 0.36, 1),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setFilledCount(TOTAL_SEGMENTS);
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            onFinish();
          });
        }, 450);
      }
    });

    return () => {
      floatLoop.stop();
      textPulseLoop.stop();
      progressAnim.removeListener(listenerId);
    };
  }, [fadeAnim, logoScaleAnim, floatAnim, textScaleAnim, textPulseAnim, progressAnim, onFinish]);

  // Build the 10 wooden block segments for the loading bar (Image 2 style)
  const segments = [];
  for (let i = 0; i < TOTAL_SEGMENTS; i++) {
    const isFilled = i < filledCount;
    const isLeading = i === filledCount - 1;
    segments.push(
      <View
        key={`loading-segment-${i}`}
        style={[
          styles.segmentSlot,
          isFilled ? styles.segmentFilled : styles.segmentEmpty,
          isLeading && styles.segmentLeading,
        ]}
      >
        {isFilled && (
          <>
            {/* Top specular highlight curve */}
            <View style={styles.segmentTopHighlight} />
            {/* Dark wood grain accent */}
            <View style={styles.segmentFissure} />
          </>
        )}
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/wood_bg.jpg')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A0D06" />
      <View style={styles.overlayVignette}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          {/* Top & Center Showcase */}
          <View style={styles.centerStage}>
            {/* Floating Logo Badge (Image 1 Style - natural wood without glow or background text) */}
            <Animated.View
              style={[
                styles.logoWrapper,
                {
                  transform: [
                    { scale: logoScaleAnim },
                    { translateY: floatAnim },
                  ],
                },
              ]}
            >
              <View style={styles.logoFrame}>
                <Image
                  source={require('../../assets/opening_logo.jpg')}
                  style={styles.logoImage}
                  resizeMode="cover"
                />
              </View>
            </Animated.View>

            {/* Smooth Animated "FreeBlock" Title Text */}
            <Animated.View
              style={[
                styles.titleWrapper,
                {
                  transform: [
                    { scale: textScaleAnim },
                    { scale: textPulseAnim },
                  ],
                },
              ]}
            >
              <View style={styles.titleRow}>
                <Text style={styles.titleFree}>Free</Text>
                <Text style={styles.titleBlock}>Block</Text>
              </View>
            </Animated.View>
          </View>

          {/* Bottom Showcase: Authentic Wooden Loading Sign (Image 2 Style) */}
          <View style={styles.loadingSection}>
            <View style={styles.loadingSign}>
              {/* Top Wooden Ribbon Banner ("LOADING") */}
              <View style={styles.ribbonWrapper}>
                <View style={styles.ribbonTailLeft} />
                <View style={styles.ribbonBody}>
                  <Text style={styles.ribbonText}>LOADING</Text>
                </View>
                <View style={styles.ribbonTailRight} />
              </View>

              {/* Wooden Billboard Plank with Side Fissure Notches */}
              <View style={styles.plankBoard}>
                {/* Carved Side Notches matching Image 2 */}
                <View style={[styles.plankNotch, styles.plankNotchLeft]} />
                <View style={[styles.plankNotch, styles.plankNotchRight]} />

                {/* Inset Recessed Cavity Track */}
                <View style={styles.cavityTrack}>
                  {/* Row of 10 Wooden Block Segments filling up */}
                  <View style={styles.segmentsRow}>{segments}</View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayVignette: {
    flex: 1,
    backgroundColor: 'rgba(16, 8, 3, 0.74)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 56,
    paddingHorizontal: 20,
  },
  centerStage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoFrame: {
    width: 136,
    height: 136,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#4A2107',
    overflow: 'hidden',
    backgroundColor: '#7A3F17',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 8,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleFree: {
    fontFamily: FONTS.title,
    fontSize: 44,
    color: '#FFD700',
    letterSpacing: 2,
    textShadowColor: 'rgba(35, 12, 3, 0.95)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  titleBlock: {
    fontFamily: FONTS.title,
    fontSize: 44,
    color: '#FFF8EC',
    letterSpacing: 2,
    textShadowColor: 'rgba(35, 12, 3, 0.95)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  loadingSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingSign: {
    width: Math.min(SCREEN_WIDTH * 0.82, 300),
    alignItems: 'center',
    position: 'relative',
  },
  ribbonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
    zIndex: 10,
  },
  ribbonTailLeft: {
    width: 14,
    height: 24,
    backgroundColor: '#2E1508',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginRight: -4,
  },
  ribbonBody: {
    backgroundColor: '#4E240D',
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#733714',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 6,
  },
  ribbonTailRight: {
    width: 14,
    height: 24,
    backgroundColor: '#2E1508',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -4,
  },
  ribbonText: {
    fontFamily: FONTS.title,
    fontSize: 13,
    color: '#FFE8C2',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  plankBoard: {
    width: '100%',
    backgroundColor: '#82461D',
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#431F0A',
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 8,
  },
  plankNotch: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#431F0A',
    transform: [{ rotate: '45deg' }],
  },
  plankNotchLeft: {
    left: -4,
    top: '52%',
  },
  plankNotchRight: {
    right: -4,
    top: '52%',
  },
  cavityTrack: {
    width: '100%',
    height: 30,
    backgroundColor: '#231006',
    borderRadius: 7,
    borderWidth: 1.8,
    borderColor: '#3D1A08',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  segmentsRow: {
    flexDirection: 'row',
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
  },
  segmentSlot: {
    flex: 1,
    height: '100%',
    borderRadius: 3.5,
    position: 'relative',
    overflow: 'hidden',
  },
  segmentEmpty: {
    backgroundColor: 'rgba(16, 7, 2, 0.45)',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 26, 8, 0.4)',
  },
  segmentFilled: {
    backgroundColor: '#DF9329',
    borderWidth: 1,
    borderColor: '#733706',
  },
  segmentLeading: {
    backgroundColor: '#EAA030',
    borderColor: '#FFE082',
  },
  segmentTopHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 245, 205, 0.45)',
  },
  segmentFissure: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 2,
    height: 4,
    backgroundColor: 'rgba(70, 28, 4, 0.6)',
  },
});
