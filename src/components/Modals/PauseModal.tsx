import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { ArchedRibbon } from '../ArchedRibbon';
import { WoodPlankButton } from '../WoodPlankButton';
import { THEME } from '../../constants/theme';

interface PauseModalProps {
  visible: boolean;
  onResume: () => void;
  onSettings: () => void;
  onHome: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  visible,
  onResume,
  onSettings,
  onHome,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Top Arched Ribbon Banner (Image 3 Style) */}
          <ArchedRibbon title="MENU" variant="green" />

          {/* Wooden Plank Buttons Column (Image 3 Style) */}
          <View style={styles.buttonsStack}>
            <WoodPlankButton
              title="RESUME"
              variant="wood"
              onPress={onResume}
              style={styles.btn}
            />
            <WoodPlankButton
              title="SETTINGS"
              variant="wood"
              onPress={onSettings}
              style={styles.btn}
            />
            <WoodPlankButton
              title="MAIN MENU"
              variant="wood"
              onPress={onHome}
              style={styles.btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: THEME.colors.bgOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#351B0D',
    borderRadius: 20,
    borderWidth: 3.5,
    borderTopColor: '#6B3C1E',
    borderLeftColor: '#5C3419',
    borderRightColor: '#271206',
    borderBottomColor: '#1F0D04',
    paddingVertical: 22,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 10,
    elevation: 12,
  },
  buttonsStack: {
    width: '100%',
    gap: 14,
    marginTop: 10,
  },
  btn: {
    width: '100%',
  },
});
