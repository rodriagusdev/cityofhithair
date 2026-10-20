import React, { useState } from 'react';
import idleKnightImg from '../../assets/idleknight.png';

interface KnightSpriteProps {
  size?: number;
  initialSpeed?: number;
  showControls?: boolean;
  className?: string;
  flip?: boolean;
}

export const KnightSprite: React.FC<KnightSpriteProps> = ({
  size = 180,
  initialSpeed = 1.2,
  showControls = true,
  className = '',
  flip = false,
}) => {
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(flip);

  return (
    <div className={`flex flex-col items-center gap-2 select-none ${className}`}>
      {/* Animated Frame Box */}
      <div
        className="relative overflow-hidden rounded-lg bg-stone-950/60 border border-stone-800/80 shadow-inner flex items-center justify-center"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className="w-full h-full relative"
          style={{
            transform: isFlipped ? 'scaleX(-1)' : 'none',
          }}
        >
          <img
            src={idleKnightImg}
            alt="Knight Idle Animation"
            style={{
              width: '1200%',
              height: '100%',
              maxWidth: 'none',
              animation: `knight-idle-anim ${speed}s steps(12) infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
              imageRendering: 'pixelated',
            }}
            className="pointer-events-none select-none block"
          />
        </div>

        {/* Ambient glow floor beneath sprite */}
        <div className="absolute bottom-1 inset-x-4 h-2 bg-radial from-amber-500/20 via-transparent to-transparent pointer-events-none rounded-full" />
      </div>

      {/* Interactive Animation Controls (to easily inspect timing and frames) */}
      {showControls && (
        <div className="flex flex-col items-center gap-1.5 mt-1">
          <div className="flex items-center gap-1.5 bg-stone-900/90 border border-stone-800 rounded px-2 py-1 text-[10px] font-cinzel text-stone-300">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors cursor-pointer"
              title={isPaused ? 'Resume Animation' : 'Pause Animation'}
            >
              {isPaused ? '▶ Play' : '❚❚ Pause'}
            </button>

            <span className="text-stone-600">|</span>

            <button
              type="button"
              onClick={() => setSpeed(0.8)}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                speed === 0.8
                  ? 'bg-amber-900/80 text-amber-200 font-bold'
                  : 'hover:bg-stone-800 text-stone-400'
              }`}
            >
              Fast (0.8s)
            </button>
            <button
              type="button"
              onClick={() => setSpeed(1.2)}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                speed === 1.2
                  ? 'bg-amber-900/80 text-amber-200 font-bold'
                  : 'hover:bg-stone-800 text-stone-400'
              }`}
            >
              Norm (1.2s)
            </button>
            <button
              type="button"
              onClick={() => setSpeed(2.0)}
              className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                speed === 2.0
                  ? 'bg-amber-900/80 text-amber-200 font-bold'
                  : 'hover:bg-stone-800 text-stone-400'
              }`}
            >
              Slow (2.0s)
            </button>

            <span className="text-stone-600">|</span>

            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-1.5 py-0.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Flip sprite horizontally"
            >
              ⇄ Flip
            </button>
          </div>

          <span className="text-[9px] font-cinzel text-stone-500 tracking-wider">
            12 Frames • 2000×166px Sprite Sheet
          </span>
        </div>
      )}
    </div>
  );
};

export default KnightSprite;
