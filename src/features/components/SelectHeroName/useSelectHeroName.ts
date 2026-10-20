import { useState } from 'react';
import { knightStats, wizardStats } from '../../../data/stats';
import { usePlayerStore } from '../../../stores';

export const useSelectHeroName = () => {
  const [tempName, setTempName] = useState('');
  const getClass = usePlayerStore((state) => state.class);
  const { establishInitialHero } = usePlayerStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const updateName = () => {
    const trimmed = tempName.trim();
    if (getClass === 'knight') {
      const chosenName = trimmed || 'Sir Alistair';
      const updateHero = { ...knightStats, name: chosenName };
      establishInitialHero(updateHero);
    } else if (getClass === 'darkmage') {
      const chosenName = trimmed || 'Malakor';
      const updateHero = { ...wizardStats, name: chosenName };
      establishInitialHero(updateHero);
    }
  };

  return { handleOnChange, updateName };
};
