import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FONTS } from '../constants/theme';

interface FreeBlockLogoProps {
  size?: number;
}

export const FreeBlockLogo: React.FC<FreeBlockLogoProps> = ({ size = 96 }) => {
  const scale = size / 96;

  return (
    <View
      style={[
        styles.outerRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {/* Outer Metallic Gold Border */}
      <View
        style={[
          styles.innerMedallion,
          {
            width: size - 8 * scale,
            height: size - 8 * scale,
            borderRadius: (size - 8 * scale) / 2,
          },
        ]}
      >
        {/* Subtle radial wood grain rings */}
        <View style={styles.woodBackdrop} />

        {/* 3D Red Block Cube in Center */}
        <View style={[styles.cubeContainer, { transform: [{ scale }] }]}>
          {/* Top Face of 3D Red Cube */}
          <View style={styles.cubeTopFace} />
          {/* Front Face */}
          <View style={styles.cubeFrontFace}>
            <View style={styles.cubeReflection} />
          </View>
          {/* Right Face */}
          <View style={styles.cubeRightFace} />
        </View>

        {/* Brand Ribbon text */}
        <View style={[styles.brandBanner, { transform: [{ scale }] }]}>
          <Text style={styles.brandText}>FREEBLOCK</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: '#C79A00',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  innerMedallion: {
    backgroundColor: '#351A0D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6F3E1E',
    overflow: 'hidden',
    position: 'relative',
  },
  woodBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A1308',
    opacity: 0.9,
  },
  cubeContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cubeTopFace: {
    width: 28,
    height: 14,
    backgroundColor: '#EF5350',
    transform: [{ rotate: '45deg' }, { scaleY: 0.6 }],
    borderWidth: 1,
    borderColor: '#FF8A80',
    zIndex: 3,
    marginBottom: -4,
  },
  cubeFrontFace: {
    width: 22,
    height: 20,
    backgroundColor: '#D32F2F',
    borderBottomLeftRadius: 3,
    borderWidth: 1,
    borderColor: '#B71C1C',
    position: 'absolute',
    left: 4,
    top: 18,
    zIndex: 2,
    overflow: 'hidden',
  },
  cubeReflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  cubeRightFace: {
    width: 16,
    height: 20,
    backgroundColor: '#9A0007',
    borderBottomRightRadius: 3,
    borderWidth: 1,
    borderColor: '#5F0909',
    position: 'absolute',
    right: 4,
    top: 18,
    zIndex: 1,
  },
  brandBanner: {
    position: 'absolute',
    bottom: 6,
    backgroundColor: '#1E0E06',
    paddingHorizontal: 8,
    paddingVertical: 1.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  brandText: {
    color: '#FFE082',
    fontFamily: FONTS.title,
    fontSize: 8.5,
    letterSpacing: 1,
  },
});
