# FreeBlock 🪵

A minimalist, tactile sliding-block puzzle game built with React Native and Expo, based on [FreeBlock.md](file:///c:/Users/Sammad%20Raja%20Dhanyal/OneDrive/Desktop/FreeBlock/FreeBlock.md).

---

## 🎮 Features

- **Warm Wooden Aesthetic**: Rich cedar, oak, and ruby tones with 3D bevels, subtle drop shadows, wood grain grooves, and checkerboard grid cells.
- **Pure Logic Mechanics**: 6×6 board with horizontal and vertical sliding blocks. Drag pieces along their axis to free the target red block through the exit gate.
- **16 Verified Levels**: Handcrafted levels across three difficulty tiers (**Beginner**, **Intermediate**, and **Advanced**), each mathematically verified by a built-in BFS puzzle solver.
- **Dynamic BFS Hint System**: Solves any board configuration in real time using Breadth-First Search, highlighting the exact block to move with an animated directional arrow.
- **Three-Star & Crown Progression**:
  - ★★★: Match or beat the level's par move count.
  - ★★☆: 1–2 moves over par.
  - ★☆☆: 3+ moves over par.
  - 👑 **Crown**: Perfect 3-star rating with zero hints used.
- **Persistent Save System**: Automatic saving of unlocked levels, star ratings, best moves, hint tokens, and sound/haptic preferences via `@react-native-async-storage/async-storage`.
- **Tactile Audio & Haptics**: Wooden taps, snaps, scrapes, rejected thuds, marimba star chimes, and win fanfares powered by synthesized Web Audio and Expo Haptics.
- **Controls & Overlays**:
  - Undo stack for reversing moves.
  - Reset board button.
  - Pause modal with sound/haptics toggles.
  - Celebratory Win modal with staggered star reveals and crown animations.
  - "How to Play" interactive visual guide.

---

## 🚀 Running the App

### 1. In Local Browser (Web Preview)
The development server is running locally:
```bash
npm run web
# Opens at http://localhost:8081
```

### 2. On Mobile via Expo Go (iOS & Android)
Start the Expo Metro bundler:
```bash
npx expo start
```
Scan the QR code displayed in the terminal using:
- **Expo Go** on Android.
- **Camera App** on iOS (with Expo Go installed).

### 3. Type Checking & Diagnostics
```bash
npx tsc --noEmit     # TypeScript typecheck (0 errors)
npx expo-doctor      # 21/21 checks passing
```

### 4. Building Android APK (EAS Build)
To produce a standalone distributable APK for assignment submission:
```bash
npx eas-cli login
npx eas-cli build -p android --profile preview
```

---

## 📁 Project Architecture

- `src/constants/theme.ts`: Wood palette tokens, bevel colors, and shadow styles.
- `src/types/game.ts`: TypeScript models for blocks, levels, progress, and hints.
- `src/utils/solver.ts`: Fast BFS solver calculating shortest paths and par counts.
- `src/data/levels.ts`: 16 handcrafted levels with verified optimal solutions.
- `src/services/storage.ts`: Persistent storage service with AsyncStorage.
- `src/services/audio.ts`: Web Audio synthesis & Expo Haptics engine.
- `src/components/Board.tsx`: 6×6 wooden board with checkerboard tiles and exit gate.
- `src/components/BlockPiece.tsx`: Interactive draggable block with PanResponder.
- `src/components/WoodButton.tsx`: Tactile 3D wooden button component.
- `src/components/HUD.tsx`: Moves counter, par, stars, and level indicator.
- `src/components/ControlBar.tsx`: Pause, Hint, Reset, and Undo buttons.
- `src/components/Modals/`: PauseModal, WinModal, SettingsModal, and HowToPlayModal.
- `src/screens/`: SplashScreen, HomeScreen, LevelSelectScreen, and GameScreen.
- `App.tsx`: Root orchestrator managing navigation and persistent state.
