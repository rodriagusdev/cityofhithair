import React from 'react';
import { useLevelsStore } from '../../stores';

interface AtmosphereParticlesProps {
  levelIdOverride?: string;
  className?: string;
}

export const AtmosphereParticles: React.FC<AtmosphereParticlesProps> = ({
  levelIdOverride,
  className = '',
}) => {
  const storeLevelId = useLevelsStore((state) => state.currentLevelId);
  const isInHithair = useLevelsStore((state) => state.isInHithair);

  const levelId = levelIdOverride || storeLevelId;

  // City of Hithair is explicitly excluded from particle overlay
  if (isInHithair || levelId === 'hithair') {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}
    >
      {/* 1. CEMETERY: Rolling Graveyard Ground Mist / Fog */}
      {levelId === 'cemetery' && (
        <div className="absolute inset-0 w-full h-full">
          {/* Lower Dense Mist Layer */}
          <div
            className="absolute -bottom-10 -left-1/4 w-[150%] h-48 bg-gradient-to-t from-stone-200/25 via-stone-300/15 to-transparent blur-2xl animate-fog-drift"
          />
          {/* Secondary Upper Drifting Fog Ribbon */}
          <div
            className="absolute -bottom-4 -left-1/3 w-[160%] h-36 bg-gradient-to-t from-emerald-950/20 via-stone-400/10 to-transparent blur-xl animate-fog-drift-reverse"
          />
          {/* Deep Ground Cold Vapor */}
          <div
            className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-900/60 to-transparent pointer-events-none"
          />
        </div>
      )}

      {/* 2. MAUSOLEUM: Pale Moonlight Shaft & Rising Crypt Dust Motes */}
      {levelId === 'mausoleum' && (
        <div className="absolute inset-0 w-full h-full">
          {/* Pale Moonlit Atmospheric Beam */}
          <div className="absolute top-0 right-1/4 w-72 h-full bg-gradient-to-b from-cyan-100/10 via-cyan-200/5 to-transparent -rotate-12 blur-2xl pointer-events-none" />

          {/* 14 Floating Crypt Dust Motes */}
          {Array.from({ length: 14 }).map((_, i) => {
            const left = (i * 7.1 + (i % 3) * 4) % 94;
            const size = 2 + (i % 3);
            const duration = 6 + (i % 5) * 1.8;
            const delay = (i * 0.7) % 5;
            const opacity = 0.4 + (i % 4) * 0.15;

            return (
              <span
                key={i}
                className="absolute rounded-full bg-amber-100 shadow-[0_0_6px_rgba(253,230,138,0.8)]"
                style={{
                  left: `${left}%`,
                  bottom: '-10px',
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  animation: `mote-float ${duration}s infinite ease-in-out`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 3. DARK PASSAGE: Dripping Condensation & Corner Torch Flicker Warmth */}
      {levelId === 'darkPassage' && (
        <div className="absolute inset-0 w-full h-full">
          {/* Flickering Perimeter Amber Warmth */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-radial from-amber-600/15 via-red-950/10 to-transparent blur-3xl animate-pulse" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-amber-600/15 via-red-950/10 to-transparent blur-3xl animate-pulse" />

          {/* Falling cave water droplets */}
          {Array.from({ length: 5 }).map((_, i) => {
            const left = 20 + i * 16;
            const delay = 0.5 + i * 1.3;
            const duration = 2.4 + (i % 3) * 0.6;

            return (
              <div
                key={i}
                className="absolute top-4 w-1 h-3 rounded-full bg-cyan-200/60 shadow-[0_0_4px_rgba(165,243,252,0.8)]"
                style={{
                  left: `${left}%`,
                  animation: `water-drip ${duration}s infinite cubic-bezier(0.4, 0, 0.6, 1)`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 4. LOST GALLERY: Occult Violet Soul Wisps & Embers */}
      {levelId === 'lostGallery' && (
        <div className="absolute inset-0 w-full h-full">
          {/* Occult Center Violet Glow */}
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-purple-950/30 via-violet-900/10 to-transparent blur-xl pointer-events-none" />

          {/* Drifting Soul Embers */}
          {Array.from({ length: 12 }).map((_, i) => {
            const left = (i * 8.5) % 95;
            const size = 3 + (i % 2) * 2;
            const duration = 7 + (i % 4) * 2;
            const delay = (i * 0.9) % 6;

            return (
              <span
                key={i}
                className="absolute rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]"
                style={{
                  left: `${left}%`,
                  bottom: '-10px',
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `mote-float ${duration}s infinite ease-in-out`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. HEART'S PRISON: Dark Crimson Occult Embers */}
      {levelId === 'heartPrison' && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-stone-950/80 pointer-events-none" />
          {Array.from({ length: 10 }).map((_, i) => {
            const left = (i * 10) % 92;
            const size = 2 + (i % 3);
            const duration = 5 + (i % 3) * 2;
            const delay = (i * 0.8) % 4;

            return (
              <span
                key={i}
                className="absolute rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                style={{
                  left: `${left}%`,
                  bottom: '-10px',
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `mote-float ${duration}s infinite ease-in-out`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AtmosphereParticles;
