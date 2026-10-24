import React from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { ArchedRibbon } from '../ArchedRibbon';
import { WoodPlankButton } from '../WoodPlankButton';
import { THEME, FONTS } from '../../constants/theme';

interface ExitConfirmModalProps {
  visible: boolean;
  onConfirmExit: () => void;
  onCancel: () => void;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  visible,
  onConfirmExit,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Top Arched Ribbon Banner */}
          <ArchedRibbon title="EXIT GAME" variant="green" />

          {/* Prompt Message */}
          <View style={styles.contentBox}>
            <Text style={styles.questionText}>
              Are you sure you want to exit?
            </Text>
          </View>

          {/* Wooden Plank Buttons Column (Image 3 Style) */}
          <View style={styles.buttonColumn}>
            <WoodPlankButton
              title="YES"
              variant="red"
              onPress={onConfirmExit}
              style={styles.btnSpacing}
            />
            <WoodPlankButton
              title="NO"
              variant="wood"
              onPress={onCancel}
              style={styles.btnSpacing}
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
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 10,
    elevation: 12,
  },
  contentBox: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  questionText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFE2B3',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonColumn: {
    width: '100%',
    gap: 12,
    marginTop: 6,
  },
  btnSpacing: {
    width: '100%',
  },
});
