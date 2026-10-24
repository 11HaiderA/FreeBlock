# FreeBlock — Sound Design Theory

# FREEBLOCK SOUND THEORY — GROUND TRUTH

## The Sound Identity

FreeBlock is a wooden puzzle box. Every interactive sound in the game must sound like it was made of wood. Not metal, not plastic, not synthetic. Wood. Taps, tocks, scrapes, thuds, and warm wooden instruments. The audio world matches the visual world exactly.

The sound design obeys three laws:

**Law 1 — Everything is wooden.** If it isn't made of wood, it doesn't belong in this game.

**Law 2 — Nothing startles.** Sounds are soft, short, and warm. No harsh buzzers, no sudden loud hits, no aggressive audio.

**Law 3 — Sound serves feel, not spectacle.** Every sound exists to make the player's action feel physical and confirmed. Sound is feedback, not entertainment.

---

## The Six Sounds

The game has exactly six audio elements. Nothing more. Every one of them exists because removing it would make the game feel worse.

---

### Sound 1 — Menu Tap

**Concept:** The sound of tapping a wooden button on a wooden panel.

**Why it exists:** Every tap the player makes — every button, every tile, every popup action — must feel confirmed. Without this sound, taps feel silent and disconnected. The player can't tell if the app registered their input. This sound is the acknowledgment.

**Character:** A short, crisp wooden click. Like flicking a wooden block with a fingernail. Warm, immediate, satisfying.

**Feeling:** "The game heard me."

**When it plays:** Every time the player presses a button, taps a tile, opens a popup, closes a popup, or interacts with any tappable element. Universal across the entire game.

**What it must never be:** A metallic click, a synthetic beep, a bubble pop, or a cartoon sound. Wooden only.

---

### Sound 2 — Block Slide

**Concept:** The sound of a wooden tile sliding across a wooden board.

**Why it exists:** When the player drags a block, they must feel the block responding to them continuously, not just at the start and end. This sound is the thread that ties the whole gesture together. Without it, dragging feels floaty and unreal.

**Character:** A soft, low, continuous wood-on-wood scrape. Not a squeak, not a rasp. A gentle, smooth friction sound — the sound of polished wood moving across polished wood.

**Feeling:** "The block is moving with me."

**When it plays:** Starts the moment the player begins dragging a block, loops continuously for the entire drag, stops the instant they release. It is the texture of the core interaction.

**What it must never be:** Loud, harsh, or abrasive. This is the sound the player hears most often — it must never fatigue the ear.

**Special rules:** It is the quietest sound in the game. It must be present but almost invisible — you notice it more by its absence than its presence.

---

### Sound 3 — Block Snap

**Concept:** The sound of a wooden puzzle piece slotting perfectly into place.

**Why it exists:** The moment of committing a move is the reward moment of every interaction. This sound is the reward. It confirms that the block has landed, the move has registered, and the game has progressed. Without it, every move feels weightless.

**Character:** A firm wooden tock. Short, punchy, satisfying. The sound a well-made wooden puzzle piece makes when it clicks into its slot. Warm and final.

**Feeling:** "That worked."

**When it plays:** The instant a block commits to a new cell after a drag. Plays once per successful move.

**What it must never be:** A metallic clink, a synthetic thud, or an over-the-top success chime. This is the sound of wood, not the sound of a slot machine.

**Special rules:** It is louder than the slide sound because it is the reward. It should feel like a small punch of satisfaction every time.

---

### Sound 4 — Block Blocked

**Concept:** The sound of a wooden block bumping into something solid.

**Why it exists:** When a move is rejected, the player must immediately understand that the game received the input but the move was not possible. Without this sound, rejected moves feel like nothing happened — the player may think the app missed their input.

**Character:** A soft, muted wooden thud. Low, brief, dull. Like tapping a wooden block against a wooden wall.

**Feeling:** "That didn't work, and I know why."

**When it plays:** Only when a move is rejected — a wall, another block, or an invalid direction.

**What it must never be:** A buzzer, a harsh error tone, or anything that feels punishing. The player has not made a mistake; they've simply found a boundary. The sound informs; it does not scold.

**Special rules:** Softer than the snap. Never startling. It should feel almost neutral — like a door that simply didn't open.

---

### Sound 5 — Victory

**Concept:** The sound of a wooden puzzle being solved.

**Why it exists:** Reaching the exit is the emotional peak of every level. This is the moment the player has earned. The sound is the reward. Without it, winning feels flat and anticlimactic.

**Character:** A short, warm musical phrase played on wooden instruments — marimba, kalimba, or soft bells. Three or four notes that rise and resolve. Not epic, not orchestral, not triumphant in a grand sense. Just warm and complete — a soft, satisfying "there it is."

**Feeling:** "I did it, and it feels good."

**When it plays:** The moment the red block reaches the exit gate. Plays once.

**What it must never be:** A stadium cheer, an epic orchestral swell, a cartoon celebration, or any sound that feels louder than the moment deserves. This game is calm. The victory must be satisfying but restrained.

**Special rules:** This is the only sound in the game that is melodic. Every other sound is a texture or a hit. This one is a small musical moment. It should feel earned, not given.

---

### Sound 6 — Background Music

**Concept:** Ambient warmth that fills the silence between moves.

**Why it exists:** A puzzle game without any background audio feels cold and empty. Silence between moves makes the game feel like a test rather than an experience. Ambient music transforms the game from a mechanical interaction into a calm, welcoming space.

**Character:** Soft, low, warm ambient pad with occasional gentle wooden accents — soft kalimba, soft marimba, maybe a very light percussion. No strong melody. No vocals. No tempo the player can tap their foot to. Just atmosphere.

**Feeling:** "I'm somewhere calm and warm."

**When it plays:** Continuously during gameplay. Starts when the player enters the game, fades out when they leave or pause.

**What it must never be:** Catchy, melodic, fast, loud, or distracting. If the player notices the music, it's too loud. The music should be felt more than heard.

**Special rules:** This is the quietest sound in the game. It sits underneath everything. It should be capable of looping seamlessly for hours without becoming irritating. Ambient, meditative, unobtrusive.

---

## The Relationship Between Sounds

Every sound plays a role in the emotional arc of a single move:

1. Player **taps a button** → Menu Tap confirms the input.
2. Player **grabs a block** → Block Slide begins, looping.
3. Player **drags the block** → Block Slide continues, providing continuous texture.
4. Player **releases the block** → either Block Snap (success) or Block Blocked (rejection).
5. Player **reaches the exit** → Victory plays. Music stops or fades under it.
6. Player **returns to menu** → Music fades. Menu Tap on next button press.

The rhythm of these six sounds is the rhythm of the game. When they work together, the game feels physical, warm, and alive. When any one of them is missing or wrong, the whole feel breaks.

---

## The Hierarchy of Loudness

Not all sounds are equal. From quietest to loudest:

1. **Background music** — barely there, atmosphere only
2. **Block Slide** — a texture, not a statement
3. **Block Blocked** — soft, informative
4. **Menu Tap** — clear and present
5. **Block Snap** — noticeable, satisfying
6. **Victory** — the loudest, because it's the peak

This hierarchy is deliberate. The louder a sound is, the more important the moment it marks.

---

## The Rules for the AI

When implementing sound, the AI must respect these rules:

1. Every menu interaction plays the Menu Tap. No exceptions.
2. Block Slide loops. It does not restart, replay, or stutter. It starts on drag begin and stops on drag end, cleanly.
3. Block Snap is instantaneous and never overlaps itself. If two moves happen in quick succession, the second snap restarts the first.
4. Block Blocked never plays on legal moves. Only on rejection.
5. Victory plays once per level completion. Never repeats, never overlaps with itself.
6. Background music loops indefinitely. It fades in on entry, fades out on exit. It never cuts abruptly.
7. All sounds respect a global master volume.
8. If an audio file is missing, the game logs a warning and continues — it never crashes.
9. Sounds do not play when the app is backgrounded.
10. The volume hierarchy above is preserved at all times. Nothing overpowers anything else.

---

## The Emotional Goal

When the player finishes a level, they should feel three things:

1. **The wood under their fingers** — reinforced by the slide, snap, and tap sounds.
2. **The satisfaction of solving** — reinforced by the victory fanfare.
3. **The calm of the experience** — reinforced by the ambient music.

If the sounds achieve those three feelings, the sound design is correct.

If the player notices the sound design as "sound design" rather than as a natural part of the game, the sound design is too loud, too clever, or too present. Good sound design in a game like this is invisible. The player only notices it when it's wrong.

---

That is the entire theory of FreeBlock's sound. Six sounds, one identity, one emotional goal. Everything else is implementation.
