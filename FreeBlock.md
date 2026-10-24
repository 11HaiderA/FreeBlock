# FreeBlock — Full Theoretical Documentation

**Project Type:** Student Assignment — Mobile Slide Puzzle Game
**Engine / Stack:** React Native with Expo (tested via Expo Go, built to APK)
**IDE:** Antigravity
**Document Version:** 1.0
**Genre:** Casual Logic / Sliding Block Puzzle
**Orientation:** Portrait
**Target Audience:** Ages 4+, casual puzzle players

---

## 1. Executive Summary

FreeBlock is a minimalist sliding-block puzzle game in which the player must maneuver a distinct red block across a grid of wooden pieces and out through an exit gate. Every other block on the board can only slide along its own axis — horizontal blocks move left and right, vertical blocks move up and down — and each move must be made without colliding with other pieces or the board walls. The challenge lies not in reflexes or speed but in spatial reasoning and sequential planning. The game offers no timers, no lives, and no failure states; the only measure of success is the number of moves taken, and the only reward is the satisfaction of solving the puzzle cleanly.

The design philosophy is deliberate simplicity: a calm wooden aesthetic, unobtrusive sound, and frictionless controls that let the puzzle itself be the entire experience.

---

## 2. Design Pillars

Every decision in FreeBlock is filtered through four pillars:

1. **Zen Focus** — No countdowns, no pressure, no penalty for thinking. The player sets their own pace.
2. **Pure Logic** — Levels are deterministic. There is no randomness, no chance, and no hidden information. Every puzzle has a guaranteed solution.
3. **Tactile Satisfaction** — Dragging a block should feel physical, as though moving a real wooden tile across a table.
4. **Instant Clarity** — A new player should understand the goal within three seconds of opening the game, without reading any instructions.

---

## 3. Core Gameplay Concept

The player is presented with a square grid populated by wooden blocks of varying lengths and orientations. One block is colored red — this is the target. On the right side of the board, aligned with one specific row, there is an exit gate marked with a visual cue such as a pair of arrows.

The objective is to slide the red block horizontally until it reaches the exit gate. Because the red block itself is typically two cells wide and can only move sideways, the challenge comes from clearing the horizontal corridor ahead of it by repositioning the other blocks.

Blocks cannot rotate, cannot be lifted, and cannot jump over one another. They can only slide along their designated axis into empty space. Each legal slide counts as one move. When the red block reaches the exit, the level is complete.

---

## 4. Game Flow Overview

The player's journey through FreeBlock follows a linear, predictable path:

1. **Splash Screen** — Brief branded introduction that auto-advances after a short delay.
2. **Home Screen** — Central hub with options to play, browse levels, adjust settings, or visit the shop.
3. **Level Select Screen** — A scrollable grid of level tiles organized by difficulty tier, showing progress and star ratings.
4. **Gameplay Screen** — The main puzzle interface, including the board, the HUD, and the control bar.
5. **Popups** — Contextual overlays for pausing, winning, requesting hints, or handling edge cases.
6. **Progression** — After winning, the player advances to the next level, replays for a better score, or returns home.

---

## 5. Gameplay Mechanics — Detailed Theory

### 5.1 The Grid

The board is a perfect square grid, six cells wide by six cells tall, forming thirty-six cells in total. The grid is not merely a visual convenience; it is the fundamental unit of the game's logic. Every block occupies one or more cells in a rectangular shape, and every move shifts a block by exactly one cell. Partial-cell positions are not permitted at rest — a block either sits cleanly on the grid or snaps back into place.

### 5.2 Block Properties

Each block is defined by four essential characteristics:

- **Position** — Its top-left coordinate on the grid.
- **Dimensions** — Its width and height in cells.
- **Orientation** — Whether it is horizontal (moves left/right) or vertical (moves up/down).
- **Role** — Whether it is the target (red) block or a standard obstacle.

Blocks may be one, two, or three cells long, and they are always exactly one cell thick in the perpendicular direction. A horizontal block of length two occupies two cells side by side; a vertical block of length three occupies three cells stacked vertically.

### 5.3 Movement Rules

Movement is constrained by orientation. A horizontal block can only be dragged left or right; a vertical block can only be dragged up or down. Diagonal moves and rotations are impossible. This constraint is the entire source of the puzzle's depth — the player's task is to determine which blocks to shift, in what order, to open the corridor the red block needs.

A move is legal only if every cell the block would occupy after the move is either empty or already occupied by that same block. Any overlap with another block or any attempt to leave the board invalidates the move.

### 5.4 Input Handling

The player interacts by touching a block and dragging it in the direction they wish it to go. Because blocks move one cell at a time, the gesture is translated into a single-step shift once the drag passes a threshold. If the drag does not cross the threshold, the block returns to its original position without registering a move. If the drag points in an illegal direction, the block resists with a subtle animation and the move is rejected without penalty.

### 5.5 Move Counting

Each successful slide increments the move counter by one. A gesture that returns the block to its starting position does not count. An undo decrements the counter. The counter is a measure of efficiency, not a constraint — the player can take as many moves as they like, but fewer moves yield a better rating.

### 5.6 Win Condition

The level is won when the red block's rightmost edge reaches the exit column at the exit row. In practical terms, this means the red block has been pushed all the way to the right edge of the board and the row it occupies aligns with the exit gate. At that moment, the win sequence triggers.

---

## 6. Difficulty and Progression

### 6.1 Difficulty Tiers

The game organizes its puzzles into five tiers, each representing a step up in complexity:

- **Beginner** — Few blocks, generous space, solutions that can be found by trial and error.
- **Intermediate** — More blocks, tighter corridors, solutions that require planning two or three moves ahead.
- **Advanced** — Dense arrangements where nearly every move matters, requiring deliberate sequencing.
- **Expert** — Minimal empty space; solutions often involve temporary "wrong" moves that set up later ones.
- **Master** — Maximum complexity; puzzles designed to challenge even experienced players.

Each tier contains a large number of levels so that the player always has a next challenge waiting.

### 6.2 Star Rating

Every completed level is graded on a three-star scale based on move efficiency:

- **Three stars** — The player matched or beat the level's par move count.
- **Two stars** — The player took one or two moves more than par.
- **One star** — The player took three or more moves beyond par.

A perfect three-star rating combined with zero hints used also earns a **crown**, which is the game's highest honor for a level. Star ratings are stored persistently so the player can track their best performance on every level.

### 6.3 Level Unlocking

Levels unlock sequentially. Completing a level grants access to the next. The player can always revisit earlier levels to improve their score.

---

## 7. User Interface — Screen by Screen

### 7.1 Splash Screen

The splash screen is a brief branded moment lasting roughly a second and a half. It displays the game's logo against a dark wooden backdrop, fades in with a gentle scale animation, and then automatically transitions to the home screen. It can be skipped by tapping anywhere. A soft wooden tone accompanies its appearance. Its purpose is to establish tone and give the game a polished entry point rather than to provide any interaction.

### 7.2 Home Screen

The home screen is the game's central hub. It presents the game's logo at the top and a vertical stack of large wooden buttons below. Each button represents a major action: playing the game, browsing levels, opening settings, or visiting the shop. The buttons are styled to look like physical wooden tiles with bevels, drop shadows, and a satisfying press animation. A small footer displays the version number. The background is a warm wood texture with a subtle vignette, reinforcing the tactile, cozy theme.

### 7.3 Level Select Screen

The level select screen gives the player an overview of their progress. At the top sits a bar with a back button, the name of the current difficulty tier, and a summary of total stars earned. Below the bar is a horizontal set of tabs for switching between difficulty tiers. The main body of the screen is a scrollable grid of square level tiles, each showing its level number and star rating.

Tiles visually communicate their state at a glance:

- **Locked tiles** are dark with a padlock icon.
- **Unlocked but unplayed tiles** are light oak with just a number.
- **Completed tiles** show earned stars, and tiles with three stars glow faintly with gold.
- **The next level to play** pulses gently to draw the player's eye.

### 7.4 Gameplay Screen

The gameplay screen is the heart of the game. It is organized into three vertical zones:

**The HUD Panel (top)** — A wooden panel that displays, on the left, the current move count in large red numerals and the player's best move count beneath it in a smaller font. On the right, it shows the current difficulty tier and the level number. The panel's colors and borders match the wooden theme.

**The Board (center)** — A square wooden frame containing the six-by-six grid. The grid cells alternate between two shades of brown, creating a subtle checker pattern that helps the player track positions. The blocks sit on top of this grid, each rendered with a light oak or red gradient fill, a dark border, a bevel highlight on the top edge, and a soft shadow beneath to give a sense of depth. The exit gate on the right is marked with a recessed notch and animated chevrons to signal the goal direction.

**The Control Bar (bottom)** — A row of four square wooden buttons: pause, hint, reset, and undo. Each button uses a simple symbol — a pair of bars, a lightbulb, a circular arrow, and a curved arrow respectively — rendered in a dark color against the light wood. The hint button optionally displays a badge showing the remaining hint count. The undo button is dimmed when there is nothing to undo.

### 7.5 Pause Popup

When the player pauses, a semi-transparent dark overlay appears over the gameplay screen, and a wooden panel rises into view with a gentle scale animation. The panel displays the word "PAUSED" at the top and three large buttons: resume, restart, and return home. The player can dismiss the popup by tapping resume.

### 7.6 Win Popup

The win popup is the most celebratory screen in the game. A dark overlay appears with a warm gold radial glow behind the panel. The panel itself is a tall wooden rectangle. At the top, three star slots are visible. If the player earned stars, they fly in one by one from above, accompanied by a rising musical tone, so the reward feels earned and satisfying. If all three stars are earned, a crown appears above them. Below the stars, the panel displays the level number, the move count, and the player's best. Three buttons sit at the bottom: next level, replay, and home.

### 7.7 Hint Popup

When the player requests a hint, the game highlights the correct next move by pulsing the relevant cells or block. The hint costs one hint token. If the player has none remaining, a dialog appears offering to visit the shop.

### 7.8 Additional Popups

Additional popups handle edge cases: a "stuck" popup appears if the game detects no legal solution from the current state (rare, but possible in some puzzles); a "no hints left" popup directs the player to the shop; a confirmation popup asks the player to confirm abandoning a level in progress.

---

## 8. Visual Identity

### 8.1 Art Direction

The visual identity is built around a warm, tactile, wooden aesthetic. Every surface — background, panel, button, block, and board — feels like it could be carved from wood. There are no flat colors, no neon, and no gradients that don't resemble natural grain. The goal is to make the game feel like a handcrafted puzzle box rather than a digital app.

### 8.2 Color Palette

The palette is dominated by warm browns and creams:

- **Deep wood browns** form the background and board interior, creating depth.
- **Mid-tone oak browns** form the standard blocks and buttons.
- **Light cream highlights** appear on the top edges of every physical element, imitating light catching a bevel.
- **Gold** is reserved for stars, crowns, and celebratory accents.
- **Red** is used exclusively for the target block and the move counter, making both instantly identifiable.

### 8.3 Typography

Typography is bold, rounded, and readable, using a heavy sans-serif family with generous letter spacing. Labels like "MOVES" and "LEVEL" are uppercase and slightly spaced out, giving a clean, labels-on-a-panel look. Numbers are large and emphasized, particularly the move count. Text colors alternate between dark brown for text on light panels and cream for text on dark backgrounds.

### 8.4 Iconography

All icons — pause, hint, undo, reset, star, crown, padlock, exit chevrons — are simple, geometric, and monochrome, rendered in dark brown against wooden backgrounds. They are designed to be instantly readable at a glance and to feel consistent with the physical theme.

### 8.5 Animation Philosophy

Animations exist to reinforce the physicality of the game. Blocks lift slightly when touched, snap firmly into place when released, and jiggle gently when a move is rejected. Buttons compress on press and spring back. Popups scale in from slightly smaller than full size with a soft overshoot. The win sequence uses staggered star reveals and light confetti. Everything is short — most animations last less than a quarter of a second — so the game never feels sluggish.

---

## 9. Audio Design

The sound design supports the calm, tactile feel of the game. Every sound is soft, wooden, and unobtrusive. There are no loud effects, no harsh synths, and no cartoonish "boing" sounds.

The sound palette includes:

- **A soft wood tap** when the player touches a block.
- **A subtle wood-on-wood scrape** during a drag, providing continuous tactile feedback.
- **A firm wooden "tock"** when a block snaps into place.
- **A muted thud** when a move is rejected.
- **A gentle wood click** for all UI button presses.
- **A rising series of marimba notes** — C, E, and G — for each of the three stars as they appear on the win popup.
- **A warm, short fanfare** when the win popup opens.
- **A soft, low background music loop** on the home screen and gameplay screen, mixed at a volume low enough to be ambient rather than dominant.

Haptic feedback — subtle vibrations from the phone — accompanies block snaps and button presses to further reinforce the physical feel.

---

## 10. Technical Overview (Conceptual)

### 10.1 Application Structure

The application is organized around four primary screens — splash, home, level select, and gameplay — plus a set of popup overlays. Navigation between screens uses a standard mobile navigation pattern, with the gameplay screen receiving a level identifier as its input.

### 10.2 Core Data Model

The game's logic is built on two simple structures: the grid model (a two-dimensional occupancy map that tracks which block, if any, occupies each cell) and the block list (an array of block descriptors, each specifying position, size, orientation, and role). Every action the player takes is evaluated against the current state of these structures.

### 10.3 Level Representation

Levels are stored as structured data rather than images or hand-drawn layouts. Each level is defined by its difficulty tier, its par move count, its exit row, and a list of blocks with their coordinates, dimensions, and orientations. Because levels are pure data, they can be authored, tweaked, and extended without touching any code.

### 10.4 Save System

Player progress — including unlocked levels, star ratings, best move counts, hint inventory, and settings — is stored persistently on the device using local storage. The save is lightweight and can be reset from the settings menu.

### 10.5 Sound and Music Playback

Audio is managed through the Expo audio library. Short effects are preloaded into memory at startup so that playback is instantaneous. Background music loops are streamed or preloaded depending on the platform.

### 10.6 Testing and Distribution

During development, the game is tested in real time on physical devices using Expo Go, which allows rapid iteration without rebuilding. Once the game is stable, it is compiled into an APK for Android using Expo's build service. This produces a distributable file suitable for the assignment submission.

---

## 11. Player Experience Goals

By the time a player finishes ten levels, they should feel three things:

1. **Competent** — the puzzles are fair and the rules are clear, so success is earned.
2. **Curious** — each new level offers a fresh arrangement, encouraging "just one more."
3. **Calm** — nothing in the game pressures, rushes, or punishes the player.

The game is designed to be playable in short sessions — a commute, a coffee break, a few minutes before bed — but its depth rewards longer sessions for players who enjoy marathoning puzzles.

---

## 12. Scope and Deliverables

### 12.1 Minimum Viable Product

The MVP includes: four screens (splash, home, level select, gameplay), one fully playable level, all core mechanics (movement, collision, win detection, move counting, undo, reset), and the win popup. This is the smallest version of the game that is recognizable and satisfying.

### 12.2 Full Assignment Deliverable

The full deliverable adds: ten to twenty handcrafted levels across at least two difficulty tiers, a proper star system with persistence, a hint system, all popups, complete audio, polished animations, and a signed APK.

### 12.3 Stretch Goals

If time permits, the project can be extended with: procedurally generated levels, a daily challenge mode, cloud save, leaderboards, additional grid sizes (seven-by-seven, eight-by-eight), localization, and a shop for hint packs and cosmetic themes.

---

## 13. Risks and Mitigations

Several risks commonly affect projects of this type:

- **Gesture handling in React Native is finicky.** Mitigation: use the modern gesture handler library and treat drags as discrete single-step moves rather than continuous motion.
- **Asset licensing.** Copying assets from the reference game is a legal risk. Mitigation: design original visuals using code and free, license-clear audio.
- **Build failures during APK compilation.** Mitigation: test on Expo Go throughout development, and use cloud builds to avoid local toolchain issues.
- **Scope creep.** Mitigation: ship the MVP first, then layer features.
- **Performance on lower-end devices.** Mitigation: keep the visual style flat and lightweight, avoid heavy image assets, and rely on simple shapes and gradients.

---

## 14. Conclusion

FreeBlock is a compact, focused puzzle game whose challenge comes entirely from logic rather than reflex. Its simple rules hide real depth, its calm presentation respects the player's attention, and its technical foundation is small enough to be fully understood by a student developer while still supporting a polished, complete product. Every decision — from the wooden aesthetic to the absence of timers — is in service of one experience: the quiet satisfaction of clearing a path and watching the red block slide home.

The game is designed to be built incrementally, tested continuously, and delivered in a form that is genuinely playable, not merely a proof of concept. With the documentation above as a guide, the project can move from concept to completed APK without guesswork, and without sacrificing the polish that separates a hobby project from a real game.