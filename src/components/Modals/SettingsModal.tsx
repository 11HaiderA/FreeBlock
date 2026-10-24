import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import { WoodButton } from '../WoodButton';
import { ArchedRibbon } from '../ArchedRibbon';
import { WoodPlankButton } from '../WoodPlankButton';
import { THEME, FONTS } from '../../constants/theme';
import { GameSettings } from '../../types/game';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  settings: GameSettings;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onToggleHaptics: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  settings,
  onToggleSound,
  onToggleMusic,
  onToggleHaptics,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleResetPress = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4500);
    } else {
      onResetProgress();
      setConfirmReset(false);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {/* Same wood puzzle logo floating cleanly ABOVE the settings panel */}
        <View style={styles.logoWrapper}>
          <View style={styles.modalLogoFrame}>
            <Image
              source={require('../../../assets/opening_logo.jpg')}
              style={styles.modalLogoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.dialog}>
          {/* Top-Right Dismiss 'X' Button */}
          <WoodButton
            size="square"
            variant="secondary"
            iconName="close"
            iconSize={18}
            onPress={onClose}
            style={styles.closeXBtn}
          />

          {/* Top Arched Ribbon Banner (Image 3 Style) */}
          <ArchedRibbon title="SETTINGS" variant="green" />

          {/* Settings Options List */}
          <View style={styles.optionsList}>
            {/* Sound Toggle */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={onToggleSound}
              activeOpacity={0.8}
            >
              <View style={styles.labelCol}>
                <Text style={styles.optionLabel}>Sound Effects</Text>
                <Text style={styles.optionSub}>Tap & snap sounds</Text>
              </View>
              {/* iOS-Style 52x32px Toggle */}
              <View
                style={[
                  styles.switchTrack,
                  settings.sound && styles.switchTrackActive,
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    settings.sound && styles.switchThumbActive,
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* Background Music Toggle */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={onToggleMusic}
              activeOpacity={0.8}
            >
              <View style={styles.labelCol}>
                <Text style={styles.optionLabel}>Background Music</Text>
                <Text style={styles.optionSub}>Relaxing ambient melodies</Text>
              </View>
              {/* iOS-Style 52x32px Toggle */}
              <View
                style={[
                  styles.switchTrack,
                  settings.music && styles.switchTrackActive,
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    settings.music && styles.switchThumbActive,
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* Haptics Toggle */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={onToggleHaptics}
              activeOpacity={0.8}
            >
              <View style={styles.labelCol}>
                <Text style={styles.optionLabel}>Haptics & Vibration</Text>
                <Text style={styles.optionSub}>Tactile snap feedback</Text>
              </View>
              {/* iOS-Style 52x32px Toggle */}
              <View
                style={[
                  styles.switchTrack,
                  settings.haptics && styles.switchTrackActive,
                ]}
              >
                <View
                  style={[
                    styles.switchThumb,
                    settings.haptics && styles.switchThumbActive,
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Reset Progress Section: Confirmation dialog */}
          <View style={styles.resetContainer}>
            <TouchableOpacity
              style={[
                styles.resetBtn,
                confirmReset && styles.resetBtnConfirming,
              ]}
              onPress={handleResetPress}
              activeOpacity={0.8}
            >
              <Text style={styles.resetBtnText}>
                {confirmReset ? 'CONFIRM: WIPE ALL DATA?' : 'RESET PROGRESS'}
              </Text>
            </TouchableOpacity>
            {confirmReset && (
              <Text style={styles.warningText}>
                Tap again to reset all completed levels and scores.
              </Text>
            )}
          </View>

          {/* Primary Action Button: DONE (Image 3 Wood Plank Button) */}
          <WoodPlankButton
            title="DONE"
            variant="wood"
            onPress={onClose}
            style={styles.doneBtn}
          />
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
    padding: 20,
  },
  logoWrapper: {
    marginBottom: -24,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalLogoFrame: {
    width: 68,
    height: 68,
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: '#4A2107',
    overflow: 'hidden',
    backgroundColor: '#7A3F17',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  modalLogoImage: {
    width: '100%',
    height: '100%',
  },
  dialog: {
    width: '88%',
    maxWidth: 330,
    backgroundColor: '#351B0D',
    borderRadius: 22,
    borderWidth: 3.5,
    borderTopColor: '#7D4522',
    borderLeftColor: '#68391A',
    borderRightColor: '#261208',
    borderBottomColor: '#1A0C05',
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    ...THEME.shadows.board,
    position: 'relative',
  },
  closeXBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    zIndex: 15,
  },
  headerPlate: {
    backgroundColor: '#6A3716',
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#4A2306',
    marginBottom: 16,
    ...THEME.shadows.block,
  },
  title: {
    color: '#FFFDF8',
    fontSize: 18,
    fontFamily: FONTS.title,
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(50, 20, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  optionsList: {
    width: '100%',
    backgroundColor: '#261309',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: '#4A2713',
    gap: 14,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelCol: {
    flex: 1,
    paddingRight: 10,
  },
  optionLabel: {
    color: '#FFF2DF',
    fontSize: 15,
    fontFamily: FONTS.bold,
  },
  optionSub: {
    color: '#DEAF7E',
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginTop: 2,
  },
  switchTrack: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A2814',
    padding: 3,
    borderWidth: 1.5,
    borderColor: '#683A1E',
    justifyContent: 'center',
  },
  switchTrackActive: {
    backgroundColor: '#C87B2E',
    borderColor: '#FFD700',
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#B58B65',
  },
  switchThumbActive: {
    backgroundColor: '#FFE082',
    alignSelf: 'flex-end',
  },
  resetContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 14,
  },
  resetBtn: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: 'rgba(198, 40, 40, 0.18)',
    borderWidth: 1.5,
    borderColor: '#7A2222',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resetBtnConfirming: {
    backgroundColor: '#C62828',
    borderColor: '#FF8A80',
  },
  resetBtnText: {
    color: '#FF8A80',
    fontSize: 12,
    fontFamily: FONTS.bold,
    letterSpacing: 1,
  },
  warningText: {
    color: '#FFAB91',
    fontSize: 11,
    fontFamily: FONTS.regular,
    marginTop: 6,
    textAlign: 'center',
  },
  doneBtn: {
    width: '100%',
  },
});
