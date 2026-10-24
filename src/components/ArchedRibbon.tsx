import React from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { FONTS } from '../constants/theme';

interface ArchedRibbonProps {
  title: string;
  variant?: 'green' | 'red' | 'wood';
  style?: StyleProp<ViewStyle>;
}

export const ArchedRibbon: React.FC<ArchedRibbonProps> = ({
  title,
  variant = 'green',
  style,
}) => {
  const isRed = variant === 'red';
  const isWood = variant === 'wood';

  const bodyStyle = isRed
    ? styles.redBody
    : isWood
    ? styles.woodBody
    : styles.greenBody;

  const tailStyle = isRed
    ? styles.redTail
    : isWood
    ? styles.woodTail
    : styles.greenTail;

  return (
    <View style={[styles.wrapper, style]}>
      {/* Left Notched Tail */}
      <View style={[styles.tail, styles.tailLeft, tailStyle]} />

      {/* Center Ribbon Body */}
      <View style={[styles.body, bodyStyle]}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* Right Notched Tail */}
      <View style={[styles.tail, styles.tailRight, tailStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 12,
  },
  tail: {
    width: 20,
    height: 32,
    zIndex: 1,
  },
  tailLeft: {
    marginRight: -6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  tailRight: {
    marginLeft: -6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  body: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 6,
  },
  greenBody: {
    backgroundColor: '#1E6B47',
    borderColor: '#4E9E78',
  },
  greenTail: {
    backgroundColor: '#12482E',
  },
  redBody: {
    backgroundColor: '#9E2424',
    borderColor: '#D45D5D',
  },
  redTail: {
    backgroundColor: '#611111',
  },
  woodBody: {
    backgroundColor: '#6B3C1B',
    borderColor: '#A8683B',
  },
  woodTail: {
    backgroundColor: '#42220D',
  },
  titleText: {
    fontFamily: FONTS.title,
    fontSize: 20,
    color: '#FFE29A',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
});
