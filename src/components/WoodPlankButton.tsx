import React, { useRef } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
  TextStyle,
  Pressable,
} from 'react-native';
import { FONTS } from '../constants/theme';
import { AudioService } from '../services/audio';

interface WoodPlankButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'wood' | 'green' | 'red';
  disabled?: boolean;
}

export const WoodPlankButton: React.FC<WoodPlankButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  variant = 'wood',
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleAnim, {
      toValue: 0.94,
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

  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return {
          container: styles.greenPlank,
          text: styles.greenText,
        };
      case 'red':
        return {
          container: styles.redPlank,
          text: styles.redText,
        };
      case 'wood':
      default:
        return {
          container: styles.woodPlank,
          text: styles.woodText,
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        style={[styles.plankBase, vStyles.container]}
      >
        <Text style={[styles.titleText, vStyles.text, textStyle]}>
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  plankBase: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 5,
    elevation: 6,
  },
  woodPlank: {
    backgroundColor: '#DFC49B',
    borderTopColor: '#FFF4E0',
    borderLeftColor: '#F2D7B4',
    borderRightColor: '#9C7245',
    borderBottomColor: '#6B4A28',
    borderBottomWidth: 3.5,
    borderRightWidth: 2.5,
  },
  greenPlank: {
    backgroundColor: '#2E7D32',
    borderTopColor: '#81C784',
    borderLeftColor: '#66BB6A',
    borderRightColor: '#1B5E20',
    borderBottomColor: '#0D3810',
    borderBottomWidth: 3.5,
    borderRightWidth: 2.5,
  },
  redPlank: {
    backgroundColor: '#C62828',
    borderTopColor: '#FFCDD2',
    borderLeftColor: '#EF5350',
    borderRightColor: '#8E0000',
    borderBottomColor: '#5C0000',
    borderBottomWidth: 3.5,
    borderRightWidth: 2.5,
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  woodText: {
    color: '#3B1F0B',
    textShadowColor: 'rgba(255, 255, 255, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  greenText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  redText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
});
