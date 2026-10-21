import { useMemo } from 'react';
import { itemIcons } from '../../data/stats';
import { useUISounds } from '../../features/hooks';
import { useAnnouncerStore, usePlayerStore } from '../../stores';
import { Item } from '../../types';
import { skillsIcons } from '../../data/skills';

export const useMerchant = () => {
  const { playWarning, playGrabCoin } = useUISounds();
  const { updateGold, updatePlayerHero, updatePotion } = usePlayerStore();
  const { updateAnnouncerText, handleAnnouncer } = useAnnouncerStore();

  const buyDarkMastery = () => {
    const currentGold = usePlayerStore.getState().gold;
    const currentHero = usePlayerStore.getState().player;

    if (currentGold < 100) {
      updateAnnouncerText('Insufficient Gold.');
      playWarning();
      handleAnnouncer();
      return;
    }

    if (!currentHero.darkMastery || currentHero.darkMastery <= 0) {
      updateAnnouncerText('Your character does not use Dark Magic.');
      playWarning();
      handleAnnouncer();
      return;
    }

    updateGold(-100);
    updatePlayerHero('darkMastery', 1);
    updateAnnouncerText('+ 1 to Dark Mastery.');
    playGrabCoin();
    handleAnnouncer();
  };

  const buyCombatMastery = () => {
    const currentGold = usePlayerStore.getState().gold;
    const currentHero = usePlayerStore.getState().player;

    if (currentGold < 100) {
      updateAnnouncerText('Insufficient Gold.');
      playWarning();
      handleAnnouncer();
      return;
    }

    if (currentHero.darkMastery && currentHero.darkMastery > 0) {
      updateAnnouncerText('Your character does not use Combat tactics.');
      playWarning();
      handleAnnouncer();
      return;
    }

    updateGold(-100);
    updatePlayerHero('attack', 3);
    updateAnnouncerText('+ 3 to Attack.');
    playGrabCoin();
    handleAnnouncer();
  };

  const buyHealthPotion = () => {
    const currentGold = usePlayerStore.getState().gold;

    if (currentGold < 75) {
      updateAnnouncerText('Insufficient Gold.');
      playWarning();
      handleAnnouncer();
      return;
    }

    updateGold(-75);
    updatePotion('healthPotions', 1);
    updateAnnouncerText('Added one Potion Of Life.');
    playGrabCoin();
    handleAnnouncer();
  };

  const buyManaPotion = () => {
    const currentGold = usePlayerStore.getState().gold;

    if (currentGold < 75) {
      updateAnnouncerText('Insufficient Gold.');
      playWarning();
      handleAnnouncer();
      return;
    }

    updateGold(-75);
    updatePotion('manaPotions', 1);
    updateAnnouncerText('Added one Potion Of Mana.');
    playGrabCoin();
    handleAnnouncer();
  };

  const merchantInventory: Array<Item> = useMemo(
    () => [
      {
        fn: buyDarkMastery,
        name: 'Dark Magic Tome',
        image: itemIcons.darktome,
        description:
          'Ahh... foolish wizardlings thinking to collect... what? They died as almost all that go down there! I think this might suit you if you have a knowledge in dark magic that is.\n' +
          '+ 1 to Dark Magic Mastery',
        cost: 100,
      },
      {
        fn: buyCombatMastery,
        name: 'Combat Tactic',
        image: itemIcons.coTactic,
        description:
          'Many a hero died in a past age. Their fallen bodies, those that stay dead, usually have things ranging from weapons to combat knowledge. I think you might appreciate this.\n' +
          '+ 3 to Attack',
        cost: 100,
      },
      {
        fn: buyHealthPotion,
        name: 'Potion Of Life',
        image: skillsIcons.healthPotion,
        description: 'This potion heals 15 Health Points.',
        cost: 75,
      },
      {
        fn: buyManaPotion,
        name: 'Potion Of Mana',
        image: skillsIcons.manaPotion,
        description: 'This potion restores 3 Spiritual Power.',
        cost: 75,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { merchantInventory };
};

export default useMerchant;
