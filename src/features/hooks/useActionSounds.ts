import swordSound from '../../assets/sound/swordSlash.mp3';
import spelldefend from '../../assets/sound/spelldefend.wav';
import spellvulnerability from '../../assets/sound/spellvulnerability.wav';
import spellweakness from '../../assets/sound/spellweakness.wav';
import spellfrenzy from '../../assets/sound/spellfrenzy.wav';
import spelldrainlife from '../../assets/sound/spelldrainlife.wav';
import drinkpotion from '../../assets/sound/drinkpotion.ogg';
import drinkpotionmana from '../../assets/sound/drinkpotionmana.ogg';
import parrySound from '../../assets/sound/parrysound.mp3';
import { soundEngine } from '../../services/soundEngine';

export const useActionSounds = () => {
  const playAttack = () => soundEngine.playSfx(swordSound, { volume: 1 });
  const playFrenzy = () => soundEngine.playSfx(spellfrenzy, { volume: 1 });
  const playDefend = () => soundEngine.playSfx(spelldefend, { volume: 1 });
  const playParry = () => soundEngine.playSfx(parrySound, { volume: 1 });
  const playWeakness = () => soundEngine.playSfx(spellweakness, { volume: 1 });
  const playVulnerability = () => soundEngine.playSfx(spellvulnerability, { volume: 1 });
  const playDrainLife = () => soundEngine.playSfx(spelldrainlife, { volume: 1 });
  const playDrinkPotion = () => soundEngine.playSfx(drinkpotion, { volume: 1 });
  const playDrinkPotionMana = () => soundEngine.playSfx(drinkpotionmana, { volume: 1 });

  return {
    playAttack,
    playFrenzy,
    playDefend,
    playParry,
    playWeakness,
    playVulnerability,
    playDrainLife,
    playDrinkPotion,
    playDrinkPotionMana,
  };
};
