export type SpriteAnimationState =
  | 'idle'
  | 'ready'
  | 'telegraph'
  | 'attack'
  | 'hit'
  | 'hurt'
  | 'die'
  | 'death'
  | 'victory'
  | 'defend'
  | 'parry'
  | 'cast'
  | 'spell'
  | string;

export interface SpriteStateConfig {
  /** URL or imported asset path to the horizontal sprite sheet */
  sheetUrl: string;
  /** Total number of frames across the horizontal sheet */
  frameCount: number;
  /** Playback speed in frames per second (e.g. 10 or 12). Defaults to 10 */
  fps?: number;
  /** Whether the animation repeats infinitely. Default: true for idle/victory, false for others */
  loop?: boolean;
  /** For non-looping animations (e.g. die), whether to stay on the final frame instead of disappearing */
  holdLastFrame?: boolean;
  /** Optional scale multiplier */
  scale?: number;
  /** Optional horizontal flip */
  flip?: boolean;
}

export interface UnitSpriteDefinition {
  /** Unique identifier for the character/unit (e.g. 'knight', 'darkmage') */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Native width of a single frame in pixels */
  frameWidth?: number;
  /** Native height of a single frame in pixels */
  frameHeight?: number;
  /** Default facing direction ('left' or 'right') */
  defaultFacing?: 'left' | 'right';
  /** Mapping of animation states to their sprite sheet configuration */
  states: Partial<Record<SpriteAnimationState, SpriteStateConfig>>;
  /** Fallback state if a requested state is not defined. Defaults to 'idle' */
  defaultState?: SpriteAnimationState;
}
