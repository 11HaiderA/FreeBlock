import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WoodButton } from './WoodButton';

interface ControlBarProps {
  onPause: () => void;
  onHint: () => void;
  onReset: () => void;
  hintsRemaining: number;
  retryRequiresAd?: boolean;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  onPause,
  onHint,
  onReset,
  hintsRemaining,
  retryRequiresAd = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Pause Button */}
      <WoodButton
        size="square"
        variant="secondary"
        onPress={onPause}
        iconName="pause"
      />

      {/* Hint Button with Token Badge or AD Badge */}
      <WoodButton
        size="square"
        variant="gold"
        onPress={onHint}
        badge={hintsRemaining > 0 ? hintsRemaining : undefined}
        showAdBadge={hintsRemaining <= 0}
        iconName="hint"
      />

      {/* Reset Button with AD Badge if free retry is exhausted */}
      <WoodButton
        size="square"
        variant="secondary"
        onPress={onReset}
        showAdBadge={retryRequiresAd}
        iconName="reload"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
  },
});
