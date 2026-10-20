import grabcoin from '../../assets/sound/grabcoin.mp3';
import warning from '../../assets/sound/warning.ogg';
import { soundEngine } from '../../services/soundEngine';

export const useUISounds = () => {
  const playGrabCoin = () => {
    soundEngine.playSfx(grabcoin, { volume: 1 });
  };

  const playWarning = () => {
    soundEngine.playSfx(warning, { volume: 1 });
  };

  return {
    playGrabCoin,
    playWarning,
  };
};
