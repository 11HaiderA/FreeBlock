import fs from 'fs';
import path from 'path';

const SAMPLE_RATE = 44100;

function createWavBuffer(samples, numChannels = 1, sampleRate = SAMPLE_RATE) {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22); // NumChannels
  buffer.writeUInt32LE(sampleRate, 24); // SampleRate
  buffer.writeUInt32LE(byteRate, 28);    // ByteRate
  buffer.writeUInt16LE(blockAlign, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34);          // BitsPerSample

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i++) {
    // Clamp to -1.0 .. 1.0
    const s = Math.max(-1, Math.min(1, samples[i]));
    const int16 = s < 0 ? Math.floor(s * 32768) : Math.floor(s * 32767);
    buffer.writeInt16LE(int16, 44 + i * 2);
  }

  return buffer;
}

const soundsDir = path.resolve('assets', 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// 1. wood_click.wav - crisp percussive carved wooden tap
{
  const duration = 0.055;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const decay = Math.exp(-t * 95);
    // Transient click noise
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 350) * 0.4;
    // Wooden cavity tones (1350Hz + 580Hz)
    const tone1 = Math.sin(2 * Math.PI * 1350 * t) * 0.45;
    const tone2 = Math.sin(2 * Math.PI * 580 * t) * 0.45;
    const tone3 = Math.sin(2 * Math.PI * 220 * t) * 0.25;

    samples[i] = (noise + (tone1 + tone2 + tone3) * decay) * 0.9;
  }
  fs.writeFileSync(path.join(soundsDir, 'wood_click.wav'), createWavBuffer(samples));
  console.log('Created wood_click.wav');
}

// 2. block_slide.wav - tactile wooden sliding friction
{
  const duration = 0.11;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.sin((t / duration) * Math.PI) * Math.exp(-t * 12);
    // Low friction rumble + soft resonance
    const noise = (Math.random() * 2 - 1) * 0.35;
    const body = Math.sin(2 * Math.PI * 240 * t) * 0.3 + Math.sin(2 * Math.PI * 420 * t) * 0.2;

    samples[i] = (noise + body) * env * 0.7;
  }
  fs.writeFileSync(path.join(soundsDir, 'block_slide.wav'), createWavBuffer(samples));
  console.log('Created block_slide.wav');
}

// 3. block_snap.wav - solid deep wooden thunk locking into place
{
  const duration = 0.095;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const decay = Math.exp(-t * 60);
    // Pitch drops rapidly from 240Hz down to 80Hz (wood impact)
    const freq = 80 + 160 * Math.exp(-t * 70);
    const phase = 2 * Math.PI * (80 * t - (160 / 70) * (Math.exp(-t * 70) - 1));
    const tone = Math.sin(phase) * 0.6;
    const sub = Math.sin(2 * Math.PI * 95 * t) * 0.35;
    const transient = (Math.random() * 2 - 1) * Math.exp(-t * 220) * 0.45;

    samples[i] = (tone + sub + transient) * decay * 0.9;
  }
  fs.writeFileSync(path.join(soundsDir, 'block_snap.wav'), createWavBuffer(samples));
  console.log('Created block_snap.wav');
}

// 4. reject_thud.wav - muted wooden boundary thud
{
  const duration = 0.085;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const decay = Math.exp(-t * 50);
    const tone = Math.sin(2 * Math.PI * 110 * t) * 0.6 + Math.sin(2 * Math.PI * 55 * t) * 0.4;
    const thud = (Math.random() * 2 - 1) * Math.exp(-t * 180) * 0.3;

    samples[i] = (tone + thud) * decay * 0.8;
  }
  fs.writeFileSync(path.join(soundsDir, 'reject_thud.wav'), createWavBuffer(samples));
  console.log('Created reject_thud.wav');
}

// 5. star_chime_1, 2, 3.wav - crystalline marimba chimes (C5, E5, G5)
const starNotes = [
  { name: 'star_chime_1.wav', freq: 523.25 }, // C5
  { name: 'star_chime_2.wav', freq: 659.25 }, // E5
  { name: 'star_chime_3.wav', freq: 783.99 }, // G5
];

for (const { name, freq } of starNotes) {
  const duration = 0.48;
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Marimba envelope: instant attack, gradual warm natural exponential decay
    const decay = Math.exp(-t * 9.5);
    // Fundamental + Marimba triple overtone (3x frequency with faster decay) + subtle strike ping
    const fundamental = Math.sin(2 * Math.PI * freq * t) * 0.7;
    const overtone1 = Math.sin(2 * Math.PI * freq * 3.0 * t) * 0.22 * Math.exp(-t * 22);
    const overtone2 = Math.sin(2 * Math.PI * freq * 6.0 * t) * 0.08 * Math.exp(-t * 45);
    const strike = (Math.random() * 2 - 1) * Math.exp(-t * 280) * 0.15;

    samples[i] = (fundamental + overtone1 + overtone2 + strike) * decay * 0.85;
  }
  fs.writeFileSync(path.join(soundsDir, name), createWavBuffer(samples));
  console.log(`Created ${name}`);
}

// 6. win_fanfare.wav - celebratory wooden arpeggio sequence (C5, E5, G5, B5, C6 ringing out)
{
  const sampleRate = 22050;
  const duration = 1.7;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  const notes = [
    { start: 0.00, freq: 523.25, dur: 0.35, vol: 0.5 }, // C5
    { start: 0.13, freq: 659.25, dur: 0.35, vol: 0.55 }, // E5
    { start: 0.26, freq: 783.99, dur: 0.35, vol: 0.6 }, // G5
    { start: 0.39, freq: 987.77, dur: 0.45, vol: 0.65 }, // B5
    { start: 0.52, freq: 1046.50, dur: 1.15, vol: 0.8 }, // C6
    // Harmony undertones on final chord
    { start: 0.52, freq: 523.25, dur: 1.15, vol: 0.4 },  // C5
    { start: 0.52, freq: 659.25, dur: 1.15, vol: 0.4 },  // E5
    { start: 0.52, freq: 783.99, dur: 1.15, vol: 0.45 }, // G5
  ];

  for (const n of notes) {
    const startSample = Math.floor(n.start * sampleRate);
    const noteSamples = Math.floor(n.dur * sampleRate);

    for (let i = 0; i < noteSamples && (startSample + i) < numSamples; i++) {
      const t = i / sampleRate;
      const decay = Math.exp(-t * (n.dur > 0.5 ? 4.0 : 8.5));
      const tone = Math.sin(2 * Math.PI * n.freq * t);
      const overtone = Math.sin(2 * Math.PI * n.freq * 2.0 * t) * 0.18 * Math.exp(-t * 15);
      const strike = (Math.random() * 2 - 1) * Math.exp(-t * 220) * 0.1;

      samples[startSample + i] += (tone + overtone + strike) * decay * n.vol * 0.32;
    }
  }

  fs.writeFileSync(path.join(soundsDir, 'win_fanfare.wav'), createWavBuffer(samples, 1, sampleRate));
  console.log('Created win_fanfare.wav');
}

// 7. bg_music.wav - serene, relaxing wooden ambient puzzle music (16s seamless loop)
{
  const sampleRate = 22050;
  const duration = 16.0;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  // Gentle kalimba note synthesizer helper
  function addNote(startSec, freq, noteDur = 1.8, vol = 0.28) {
    const startSample = Math.floor(startSec * sampleRate);
    const noteSampleCount = Math.floor(noteDur * sampleRate);

    for (let i = 0; i < noteSampleCount; i++) {
      let targetSample = (startSample + i) % numSamples;
      const t = i / sampleRate;
      const decay = Math.exp(-t * 3.2);
      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const overtone = Math.sin(2 * Math.PI * freq * 3.0 * t) * 0.25 * Math.exp(-t * 8.0);
      const overtone2 = Math.sin(2 * Math.PI * freq * 5.0 * t) * 0.08 * Math.exp(-t * 16.0);
      const sampleVal = (fundamental + overtone + overtone2) * decay * vol;

      samples[targetSample] += sampleVal;
    }
  }

  // Melodic notes progression over 16 seconds (C major pentatonic: C, D, E, G, A)
  // Bar 1 (0..4s): C major warmth
  addNote(0.0, 261.63, 3.5, 0.26); // C4
  addNote(0.5, 392.00, 2.5, 0.24); // G4
  addNote(1.0, 523.25, 2.5, 0.26); // C5
  addNote(2.0, 659.25, 2.2, 0.24); // E5
  addNote(3.0, 587.33, 1.8, 0.20); // D5

  // Bar 2 (4..8s): A minor gentle reflection
  addNote(4.0, 220.00, 3.5, 0.26); // A3
  addNote(4.5, 329.63, 2.5, 0.22); // E4
  addNote(5.0, 440.00, 2.5, 0.24); // A4
  addNote(6.0, 523.25, 2.2, 0.24); // C5
  addNote(7.0, 392.00, 1.8, 0.20); // G4

  // Bar 3 (8..12s): F major gentle resolution
  addNote(8.0, 174.61, 3.5, 0.24); // F3
  addNote(8.5, 261.63, 2.5, 0.22); // C4
  addNote(9.0, 329.63, 2.5, 0.24); // E4
  addNote(10.0, 440.00, 2.2, 0.24); // A4
  addNote(11.0, 523.25, 1.8, 0.22); // C5

  // Bar 4 (12..16s): G major leading back to C
  addNote(12.0, 196.00, 3.5, 0.24); // G3
  addNote(12.5, 293.66, 2.5, 0.22); // D4
  addNote(13.0, 392.00, 2.5, 0.24); // G4
  addNote(14.0, 493.88, 2.2, 0.22); // B4
  addNote(15.0, 392.00, 1.8, 0.20); // G4

  // Soft warm ambient background pad (subtle sine drone with slow harmonic pulse)
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.125 * t); // 8-second slow swell
    const drone1 = Math.sin(2 * Math.PI * 130.81 * t) * 0.09; // C3
    const drone2 = Math.sin(2 * Math.PI * 196.00 * t) * 0.06; // G3
    const drone3 = Math.sin(2 * Math.PI * 261.63 * t) * 0.04; // C4
    samples[i] += (drone1 + drone2 + drone3) * (0.7 + 0.3 * lfo);
  }

  // Smooth circular crossfade at loop boundary to guarantee zero click
  const crossfadeLength = Math.floor(0.08 * sampleRate);
  for (let i = 0; i < crossfadeLength; i++) {
    const alpha = i / crossfadeLength;
    const endIdx = numSamples - crossfadeLength + i;
    const blended = (1 - alpha) * samples[endIdx] + alpha * samples[i];
    samples[endIdx] = blended;
    samples[i] = blended;
  }

  // Soft limiter to prevent clipping
  for (let i = 0; i < numSamples; i++) {
    samples[i] = Math.tanh(samples[i] * 1.1) * 0.85;
  }

  fs.writeFileSync(path.join(soundsDir, 'bg_music.wav'), createWavBuffer(samples, 1, sampleRate));
  console.log('Created bg_music.wav');
}
