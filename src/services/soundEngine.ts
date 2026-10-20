import { Howl, Howler } from 'howler';

export interface SoundOptions {
  volume?: number;
  rate?: number;
  loop?: boolean;
}

type MusicStateListener = (isPlaying: boolean, track: string | null) => void;

class SoundEngine {
  private currentMusicHowl: Howl | null = null;
  private currentMusicTrack: string | null = null;
  private musicVolume = 0.31;
  private sfxVolume = 1.0;
  private isMuted = false;
  private isMusicPaused = false;
  private sfxCache = new Map<string, Howl>();
  private musicListeners = new Set<MusicStateListener>();

  constructor() {
    Howler.autoUnlock = true;
  }

  // --- Music Management ---

  /**
   * Plays a background music track by track name (e.g. 'hithair', 'dungeons') or direct path.
   */
  public playMusic(track: string, options?: SoundOptions): void {
    if (!track) return;

    // Resolve track URL if given a bare name
    const src = track.startsWith('/') || track.startsWith('http') || track.endsWith('.mp3')
      ? track
      : `/${track}.mp3`;

    // If the same track is already playing or paused
    if (this.currentMusicTrack === track && this.currentMusicHowl) {
      if (this.isMusicPaused) {
        this.resumeMusic();
      }
      return;
    }

    // Stop and unload existing music
    if (this.currentMusicHowl) {
      this.currentMusicHowl.stop();
      this.currentMusicHowl.unload();
      this.currentMusicHowl = null;
    }

    this.currentMusicTrack = track;
    this.isMusicPaused = false;

    const volume = options?.volume ?? this.musicVolume;

    const howl = new Howl({
      src: [src],
      html5: true, // Use HTML5 Audio for streaming larger music files
      loop: options?.loop ?? true,
      volume: this.isMuted ? 0 : volume,
      onloaderror: (_id, err) => {
        console.warn(`[SoundEngine] Failed to load music: ${src}`, err);
      },
      onplayerror: (_id, err) => {
        console.warn(`[SoundEngine] Play error for music: ${src}`, err);
        // Autoplay may be blocked; retry on first user interaction if needed
        howl.once('unlock', () => {
          howl.play();
        });
      },
    });

    this.currentMusicHowl = howl;
    howl.play();
    this.notifyMusicListeners();
  }

  public pauseMusic(): void {
    if (this.currentMusicHowl && this.currentMusicHowl.playing()) {
      this.currentMusicHowl.pause();
      this.isMusicPaused = true;
      this.notifyMusicListeners();
    }
  }

  public resumeMusic(): void {
    if (this.currentMusicHowl) {
      this.currentMusicHowl.play();
      this.isMusicPaused = false;
      this.notifyMusicListeners();
    }
  }

  public stopMusic(): void {
    if (this.currentMusicHowl) {
      this.currentMusicHowl.stop();
      this.currentMusicHowl.unload();
      this.currentMusicHowl = null;
      this.currentMusicTrack = null;
      this.isMusicPaused = false;
      this.notifyMusicListeners();
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying()) {
      this.pauseMusic();
      return false;
    } else if (this.currentMusicHowl) {
      this.resumeMusic();
      return true;
    } else if (this.currentMusicTrack) {
      this.playMusic(this.currentMusicTrack);
      return true;
    }
    return false;
  }

  public isMusicPlaying(): boolean {
    return Boolean(this.currentMusicHowl && this.currentMusicHowl.playing());
  }

  public getCurrentTrack(): string | null {
    return this.currentMusicTrack;
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusicHowl && !this.isMuted) {
      this.currentMusicHowl.volume(this.musicVolume);
    }
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  // --- SFX Management ---

  /**
   * Plays a sound effect from a given source string (asset import or URL).
   * Caches Howl instances for fast, responsive playback.
   */
  public playSfx(src: string, options?: SoundOptions): void {
    if (!src || this.isMuted) return;

    let sound = this.sfxCache.get(src);
    if (!sound) {
      sound = new Howl({
        src: [src],
        volume: options?.volume ?? this.sfxVolume,
        rate: options?.rate ?? 1.0,
        loop: options?.loop ?? false,
      });
      this.sfxCache.set(src, sound);
    } else {
      if (options?.volume !== undefined) sound.volume(options.volume);
      if (options?.rate !== undefined) sound.rate(options.rate);
    }

    sound.play();
  }

  public preloadSfx(sources: string[]): void {
    sources.forEach((src) => {
      if (!this.sfxCache.has(src)) {
        const sound = new Howl({ src: [src] });
        this.sfxCache.set(src, sound);
      }
    });
  }

  public setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.sfxCache.forEach((sound) => sound.volume(this.sfxVolume));
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  // --- Global Mute ---

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    Howler.mute(muted);
    this.notifyMusicListeners();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // --- Subscriptions ---

  public subscribeMusic(listener: MusicStateListener): () => void {
    this.musicListeners.add(listener);
    // Notify immediately with current state
    listener(this.isMusicPlaying(), this.currentMusicTrack);
    return () => {
      this.musicListeners.delete(listener);
    };
  }

  private notifyMusicListeners(): void {
    const isPlaying = this.isMusicPlaying();
    this.musicListeners.forEach((listener) => {
      listener(isPlaying, this.currentMusicTrack);
    });
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
