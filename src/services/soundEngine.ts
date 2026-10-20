import { Howl, Howler } from 'howler';

export interface SoundOptions {
  volume?: number;
  rate?: number;
  loop?: boolean;
}

export type MusicStateListener = (isPlaying: boolean, track: string | null) => void;

/**
 * Resolves a track identifier or relative path to a valid public asset URL,
 * respecting Vite's base path in production (e.g. GitHub Pages at /cityofhithair/).
 */
export function resolveMusicUrl(track: string): string {
  if (!track) return '';

  // Already an absolute external URL, data URI, or blob
  if (/^(?:https?:)?\/\//i.test(track) || track.startsWith('data:') || track.startsWith('blob:')) {
    return track;
  }

  // Vite base URL (e.g. '/cityofhithair/' or '/')
  const base =
    typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  let clean = track.trim();

  // If already prefixed with normalizedBase, return directly
  if (clean.startsWith(normalizedBase)) {
    return clean;
  }

  // Strip leading slashes or relative dot prefixes
  while (clean.startsWith('/') || clean.startsWith('./')) {
    clean = clean.startsWith('./') ? clean.slice(2) : clean.slice(1);
  }

  // Check if track was passed starting with the base segment without a leading slash
  const baseTrimmed = normalizedBase.replace(/^\/+|\/+$/g, '');
  if (baseTrimmed && clean.startsWith(`${baseTrimmed}/`)) {
    return `/${clean}`;
  }

  // Append .mp3 extension if missing
  if (!clean.toLowerCase().endsWith('.mp3') && !clean.includes('.')) {
    clean = `${clean}.mp3`;
  }

  return `${normalizedBase}${clean}`;
}

class SoundEngine {
  private currentMusicHowl: Howl | null = null;
  private currentMusicTrack: string | null = null;
  private musicVolume = 0.31;
  private sfxVolume = 1.0;
  private isMuted = false;
  private isMusicPausedByUser = false;
  private isAutoplayBlocked = false;
  private sfxCache = new Map<string, Howl>();
  private musicListeners = new Set<MusicStateListener>();
  private unlockListenersAttached = false;
  private boundInteractionHandler: (() => void) | null = null;

  constructor() {
    Howler.autoUnlock = true;
    this.attachUnlockListeners();
  }

  // --- Music Management ---

  /**
   * Plays a background music track by track name (e.g. 'hithair', 'dungeons') or direct path.
   * Handles path resolution for production base URLs and browser autoplay policies.
   */
  public playMusic(track: string, options?: SoundOptions): void {
    if (!track) return;

    const resolvedSrc = resolveMusicUrl(track);

    // If the same track is requested and Howl exists
    if (this.currentMusicTrack === track && this.currentMusicHowl) {
      if (!this.isMusicPausedByUser && !this.isMusicPlaying()) {
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

    // If the user has explicitly chosen to mute/pause music, don't auto-start
    if (this.isMusicPausedByUser) {
      this.notifyMusicListeners();
      return;
    }

    const volume = options?.volume ?? this.musicVolume;

    const howl = new Howl({
      src: [resolvedSrc],
      html5: true, // Use HTML5 Audio for streaming larger music files
      format: ['mp3'],
      preload: true,
      loop: options?.loop ?? true,
      volume: this.isMuted ? 0 : volume,
      onplay: () => {
        this.isAutoplayBlocked = false;
        this.notifyMusicListeners();
      },
      onpause: () => {
        this.notifyMusicListeners();
      },
      onstop: () => {
        this.notifyMusicListeners();
      },
      onloaderror: (_id, err) => {
        console.warn(`[SoundEngine] Failed to load music from "${resolvedSrc}":`, err);
      },
      onplayerror: (_id, err) => {
        console.warn(`[SoundEngine] Play error for music "${resolvedSrc}":`, err);
        // Autoplay may be blocked by browser; will unlock on first user interaction
        this.isAutoplayBlocked = true;
        this.attachUnlockListeners();
        this.notifyMusicListeners();
      },
    });

    this.currentMusicHowl = howl;
    howl.play();
    this.notifyMusicListeners();
  }

  /**
   * Unlocks audio on user interaction and resumes pending music if autoplay was blocked.
   */
  public unlockAudio(): void {
    // Resume Web Audio AudioContext if suspended
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().catch(() => {});
    }

    // Resume or start music if user hasn't explicitly muted it
    if (!this.isMusicPausedByUser) {
      if (this.currentMusicHowl && !this.isMusicPlaying()) {
        this.currentMusicHowl.play();
      } else if (this.currentMusicTrack && !this.currentMusicHowl) {
        this.playMusic(this.currentMusicTrack);
      }
    }
  }

  private attachUnlockListeners(): void {
    if (this.unlockListenersAttached || typeof window === 'undefined') return;
    this.unlockListenersAttached = true;

    const handleInteraction = () => {
      this.unlockAudio();
      this.detachUnlockListeners();
    };

    this.boundInteractionHandler = handleInteraction;
    const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
    events.forEach((ev) => {
      window.addEventListener(ev, handleInteraction, { capture: true, passive: true });
    });
  }

  private detachUnlockListeners(): void {
    if (!this.boundInteractionHandler || typeof window === 'undefined') return;
    const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
    events.forEach((ev) => {
      window.removeEventListener(ev, this.boundInteractionHandler!, { capture: true });
    });
    this.boundInteractionHandler = null;
    this.unlockListenersAttached = false;
  }

  public pauseMusic(byUser = true): void {
    if (byUser) {
      this.isMusicPausedByUser = true;
    }
    if (this.currentMusicHowl && this.currentMusicHowl.playing()) {
      this.currentMusicHowl.pause();
    }
    this.notifyMusicListeners();
  }

  public resumeMusic(): void {
    this.isMusicPausedByUser = false;
    this.unlockAudio();
    this.notifyMusicListeners();
  }

  public stopMusic(): void {
    if (this.currentMusicHowl) {
      this.currentMusicHowl.stop();
      this.currentMusicHowl.unload();
      this.currentMusicHowl = null;
      this.currentMusicTrack = null;
      this.isMusicPausedByUser = false;
      this.notifyMusicListeners();
    }
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying()) {
      this.pauseMusic(true);
      return false;
    } else {
      this.resumeMusic();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return Boolean(this.currentMusicHowl && this.currentMusicHowl.playing());
  }

  public getIsMusicPausedByUser(): boolean {
    return this.isMusicPausedByUser;
  }

  public isAutoplayWaiting(): boolean {
    return this.isAutoplayBlocked && !this.isMusicPausedByUser && !this.isMusicPlaying();
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
