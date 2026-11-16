// Gentle Web Audio API acoustic chime & warm pad arpeggio for optional birthday ambience.
// Avoids external audio dependencies that could fail in hermetic environments.

class AmbientCelebrationAudio {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private isPlaying = false;
  private step = 0;

  // Warm Lydian/Major 9th chime notes (Hz): C4, E4, G4, B4, D5, E5, G5, B4
  private readonly notes = [261.63, 329.63, 392.0, 493.88, 587.33, 659.25, 783.99, 493.88];

  private playChime(frequency: number) {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(frequency * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.012, now + 0.04);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    overtoneGain.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 3.3);
    overtone.stop(now + 1.8);
  }

  public start(): boolean {
    if (this.isPlaying) return true;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return false;
    }

    if (!this.ctx) {
      this.ctx = new AudioContextClass();
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    this.isPlaying = true;
    this.playChime(this.notes[this.step % this.notes.length]);
    this.step += 1;

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playChime(this.notes[this.step % this.notes.length]);
      this.step += 1;
    }, 1150);

    return true;
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    return this.start();
  }
}

export const ambientAudio = new AmbientCelebrationAudio();
