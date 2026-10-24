import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AudioService } from '../services/audio';
import { FONTS } from '../constants/theme';

export type WoodButtonIconName =
  | 'play'
  | 'sound'
  | 'sound-off'
  | 'search'
  | 'menu'
  | 'reload'
  | 'next'
  | 'music'
  | 'help'
  | 'star'
  | 'close'
  | 'arrow'
  | 'check'
  | 'settings'
  | 'pause'
  | 'home'
  | 'info'
  | 'undo'
  | 'hint'
  | 'back';

interface WoodButtonProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconName?: WoodButtonIconName;
  iconSize?: number;
  badge?: number | string;
  showAdBadge?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'danger' | 'gold' | 'icon';
  size?: 'small' | 'medium' | 'large' | 'square' | 'circle';
}

export const WoodButton: React.FC<WoodButtonProps> = ({
  onPress,
  title,
  subtitle,
  icon,
  iconName,
  iconSize = 28,
  badge,
  showAdBadge = false,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
  size = 'medium',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      speed: 40,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      speed: 30,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    AudioService.playWoodClick();
    onPress();
  };

  // Map iconName to Ionicons glyph name
  const getIoniconsGlyph = (name: WoodButtonIconName): keyof typeof Ionicons.glyphMap => {
    switch (name) {
      case 'play':
        return 'play';
      case 'sound':
        return 'volume-high';
      case 'sound-off':
        return 'volume-mute';
      case 'search':
        return 'search';
      case 'menu':
        return 'menu';
      case 'reload':
        return 'reload';
      case 'next':
        return 'play-forward';
      case 'music':
        return 'musical-note';
      case 'help':
        return 'help';
      case 'star':
        return 'star';
      case 'close':
        return 'close';
      case 'arrow':
        return 'arrow-forward';
      case 'back':
        return 'arrow-back';
      case 'check':
        return 'checkmark';
      case 'settings':
        return 'settings-sharp';
      case 'pause':
        return 'pause';
      case 'home':
        return 'home';
      case 'info':
        return 'information';
      case 'undo':
        return 'arrow-undo';
      case 'hint':
        return 'bulb';
      default:
        return 'play';
    }
  };

  // Sizing styles
  const isSquare = size === 'square' || size === 'circle' || variant === 'icon';

  const getSizeDimensions = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, minWidth: 90, height: 42, borderRadius: 14 };
      case 'large':
        return { paddingVertical: 12, paddingHorizontal: 24, minWidth: 210, height: 60, borderRadius: 20 };
      case 'square':
      case 'circle':
        return { width: 58, height: 58, borderRadius: 18, padding: 0 };
      case 'medium':
      default:
        return { paddingVertical: 10, paddingHorizontal: 20, minWidth: 140, height: 50, borderRadius: 18 };
    }
  };

  const dims = getSizeDimensions();

  // Color schemes (based directly on user's attached squircle wood UI)
  const getColors = () => {
    switch (variant) {
      case 'gold':
        return {
          bg: '#E29528',
          border: '#5C2809',
          topHighlight: 'rgba(255, 250, 210, 0.55)',
          bottomShadow: '#783A05',
          titleColor: '#FFFDF6',
          subtitleColor: '#FFE0A8',
          carvedCavity: '#421C04',
        };
      case 'danger':
        return {
          bg: '#C93B3B',
          border: '#4E1111',
          topHighlight: 'rgba(255, 200, 200, 0.45)',
          bottomShadow: '#5A0B0B',
          titleColor: '#FFFFFF',
          subtitleColor: '#FFCDD2',
          carvedCavity: '#420606',
        };
      case 'secondary':
        return {
          bg: '#B56826',
          border: '#4E2105',
          topHighlight: 'rgba(255, 235, 195, 0.40)',
          bottomShadow: '#4C1F05',
          titleColor: '#FFF8EC',
          subtitleColor: '#F5D0A2',
          carvedCavity: '#3E1903',
        };
      case 'icon':
      case 'primary':
      default:
        return {
          bg: '#C87B2E',
          border: '#542509',
          topHighlight: 'rgba(255, 245, 215, 0.45)',
          bottomShadow: '#5A2607',
          titleColor: '#FFFDF8',
          subtitleColor: '#FDE4B8',
          carvedCavity: '#3F1A04',
        };
    }
  };

  const colors = getColors();

  // Render the carved icon with engraved bevel shadow
  const renderCarvedIcon = () => {
    if (iconName) {
      const glyph = getIoniconsGlyph(iconName);
      return (
        <View style={styles.carvedIconWrapper}>
          {/* Bottom bevel engraved highlight */}
          <Ionicons
            name={glyph}
            size={iconSize}
            color="rgba(255, 245, 220, 0.42)"
            style={[styles.carvedIconBevel, { transform: [{ translateY: 1.5 }] }]}
          />
          {/* Deep carved cavity fill */}
          <Ionicons
            name={glyph}
            size={iconSize}
            color={colors.carvedCavity}
            style={styles.carvedIconMain}
          />
        </View>
      );
    }
    return icon || null;
  };

  return (
    <Animated.View
      style={[
        styles.outerContainer,
        {
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[
          styles.squircleBody,
          dims,
          {
            backgroundColor: colors.bg,
            borderColor: colors.border,
            borderBottomColor: colors.bottomShadow,
          },
        ]}
      >
        {/* Glossy top-left specular highlight curve (matches user image) */}
        <View style={[styles.topHighlightLine, { backgroundColor: colors.topHighlight }]} />
        <View style={[styles.leftHighlightLine, { backgroundColor: colors.topHighlight }]} />

        {/* Hand-carved organic wood fissures / notches on edges */}
        <View style={[styles.notchLeft, { backgroundColor: colors.border }]} />
        <View style={[styles.notchRight, { backgroundColor: colors.border }]} />

        {/* Button Content */}
        <View style={styles.contentRow}>
          {renderCarvedIcon()}
          {title ? (
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.buttonTitle,
                  {
                    color: colors.titleColor,
                    textShadowColor: 'rgba(40, 16, 2, 0.9)',
                  },
                  (icon || iconName) && title ? { marginLeft: 8 } : null,
                  textStyle,
                ]}
              >
                {title}
              </Text>
              {subtitle ? (
                <Text style={[styles.buttonSubtitle, { color: colors.subtitleColor }]}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>

        {/* Badge counter or Ad badge */}
        {badge !== undefined && badge !== null && badge !== 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : showAdBadge ? (
          <View style={styles.adBadge}>
            <Ionicons name="videocam" size={10} color="#FFFFFF" style={{ marginRight: 2 }} />
            <Text style={styles.adBadgeText}>AD</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({
          cursor: 'pointer',
          userSelect: 'none',
        } as any)
      : {}),
  },
  squircleBody: {
    borderWidth: 2.5,
    borderBottomWidth: 3.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#2B1203',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 4,
  },
  topHighlightLine: {
    position: 'absolute',
    top: 3,
    left: 6,
    right: 8,
    height: 3,
    borderRadius: 2,
  },
  leftHighlightLine: {
    position: 'absolute',
    top: 6,
    left: 3,
    width: 2.5,
    height: 18,
    borderRadius: 2,
  },
  notchLeft: {
    position: 'absolute',
    left: 0,
    top: '46%',
    width: 4,
    height: 2,
    borderRadius: 1,
  },
  notchRight: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    width: 4,
    height: 2,
    borderRadius: 1,
  },
  carvedIconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carvedIconBevel: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  carvedIconMain: {
    zIndex: 2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontFamily: FONTS.button,
    fontSize: 18,
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  buttonSubtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    letterSpacing: 0.8,
    textAlign: 'center',
    marginTop: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E53935',
    borderRadius: 11,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    elevation: 6,
    zIndex: 10,
  },
  badgeText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 11,
  },
  adBadge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: '#D97706',
    borderRadius: 10,
    height: 19,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF8E1',
    elevation: 6,
    zIndex: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
  },
  adBadgeText: {
    fontFamily: FONTS.bold,
    color: '#FFFFFF',
    fontSize: 9.5,
    letterSpacing: 0.5,
  },
});
