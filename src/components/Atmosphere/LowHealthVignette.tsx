import { useEffect } from 'react';
import { useBattleStore, usePlayerStore } from '../../stores';
import { soundEngine } from '../../services/soundEngine';

export const LowHealthVignette = () => {
  const isInFight = useBattleStore((state) => state.isInFight);
  const boardPlayer = useBattleStore((state) => state.boardPlayer);
  const player = usePlayerStore((state) => state.player);

  const activeHero = isInFight && boardPlayer?.name ? boardPlayer : player;
  const health = activeHero?.health ?? 1;
  const maxHealth = activeHero?.maxHealth || 1;

  const isLowHealth = health > 0 && health <= maxHealth * 0.3;

  useEffect(() => {
    if (isLowHealth) {
      soundEngine.startHeartbeat();
    } else {
      soundEngine.stopHeartbeat();
    }

    return () => {
      soundEngine.stopHeartbeat();
    };
  }, [isLowHealth]);

  if (!isLowHealth) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 animate-heartbeat-vignette bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,rgba(153,27,27,0.35)_82%,rgba(69,10,10,0.78)_100%)] shadow-[inset_0_0_60px_rgba(185,28,28,0.6)]"
    />
  );
};

export default LowHealthVignette;
