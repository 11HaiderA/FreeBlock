This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md

## Sound Design Ground Truth

All audio implementation and modifications must strictly follow [SOUND_THEORY.md](file:///c:/Users/Sammad%20Raja%20Dhanyal/OneDrive/Desktop/FreeBlock/SOUND_THEORY.md):
- **The Three Laws:** (1) Everything is wooden. (2) Nothing startles. (3) Sound serves feel, not spectacle.
- **The Six Sounds Only:** Menu Tap, Block Slide, Block Snap, Block Blocked, Victory, and Background Music.
- **Hierarchy of Loudness (quietest to loudest):**
  1. Background Music (ambient pad, barely there)
  2. Block Slide (gentle wood-on-wood scrape texture)
  3. Block Blocked (soft muted wooden thud)
  4. Menu Tap (crisp wooden flick/click)
  5. Block Snap (firm wooden tock)
  6. Victory (warm rising marimba/kalimba phrase)
- **The 10 AI Audio Implementation Rules:**
  1. Every menu interaction plays the Menu Tap. No exceptions.
  2. Block Slide loops cleanly: starts on drag begin, loops for duration, stops cleanly on drag end.
  3. Block Snap is instantaneous and never overlaps itself; if rapid successive moves occur, restart the sound.
  4. Block Blocked never plays on legal moves; only upon rejection/collision.
  5. Victory plays once per level completion; never repeats or overlaps.
  6. Background music loops indefinitely, fading in on entry and fading out on exit with no abrupt cuts.
  7. All sounds respect a global master volume / toggle settings.
  8. If an audio file is missing, the game logs a warning and continues without crashing.
  9. Sounds do not play when the app is backgrounded.
  10. The volume hierarchy must be preserved at all times. Nothing overpowers anything else.

