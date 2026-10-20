import { useState } from 'react';
import { itemIcons } from '../../../data/stats';
import { useUISounds } from '../../hooks';
import { useAnnouncerStore, usePlayerStore } from '../../../stores';
import { Item } from '../../../types';
import { skillsIcons } from '../../../data/skills';

export const useMerchant = () => {
  const { playWarning } = useUISounds();
  const { updateGold, updatePlayerHero, updatePotion } = usePlayerStore();
  const { updateAnnouncerText, handleAnnouncer } = useAnnouncerStore();
  const playerHero = usePlayerStore((state) => state.player);
  const getGold = usePlayerStore((state) => state.gold);

  const addDarkMastery = () => {
    if (getGold >= 100) {
      if (playerHero.darkMastery > 0) {
        updatePlayerHero('darkMastery', 1);
        updateGold(-100);
        updateAnnouncerText('+ 1 to Dark Mastery.');
        handleAnnouncer();
      } else {
        updateAnnouncerText('Your character does not use Dark Magic.');
        playWarning();
        handleAnnouncer();
      }
    } else {
      updateAnnouncerText('Insuficient Gold.');
      playWarning();
      handleAnnouncer();
    }
  };

  const addCombatMastery = () => {
    if (getGold >= 100) {
      if (!playerHero.darkMastery) {
        updatePlayerHero('attack', 3);
        updateGold(-100);
        updateAnnouncerText('+ 3 to Attack.');
        handleAnnouncer();
      } else {
        updateAnnouncerText('Your character does not use Combat.');
        playWarning();
      }
    } else {
      updateAnnouncerText('Insuficient Gold.');
      playWarning();
    }
  };

  const addHealthPotion = () => {
    if (getGold >= 75) {
      updatePotion("healthPotions", 1)
      updateGold(-75);
      updateAnnouncerText('Added one Potion Of Life.');
      handleAnnouncer();
    } else {
      updateAnnouncerText('Insuficient Gold.');
      playWarning();
    }
  };

  const addManaPotion = () => {
    if (getGold >= 75) {
      updatePotion("manaPotions", 1)
      updateGold(-75);
      updateAnnouncerText('Added one Potion Of Life.');
      handleAnnouncer();
    } else {
      updateAnnouncerText('Insuficient Gold.');
      playWarning();
    }
  };

  const itemsInStore: Array<Item> = [
    {
      fn: addDarkMastery,
      name: 'Dark Magic Tome',
      image: itemIcons.darktome,
      description:
        'Ahh... foolish wizardlings thinking to collect... what? They died as almost all that go down there! I think this might suit you if you have a knowledge in dark magic that is.\n' +
        '+ 1 to Dark Magic Mastery',
      cost: 100,
    },
    {
      fn: addCombatMastery,
      name: 'Combat Tactic',
      image: itemIcons.coTactic,
      description:
        'Many a hero died in a past age. Their fallen bodies, those that stay dead, usually have things ranging from weapons to combat knowledge. I think you might appreciate this.\n' +
        '+ 3 to Attack',
      cost: 100,
    },
    {
      fn: addHealthPotion,
      name: 'Potion Of Life',
      image: skillsIcons.healthPotion,
      description: 'This potion heals 15 Health Points.',
      cost: 75,
    },
    {
      fn: addManaPotion,
      name: 'Potion Of Mana',
      image: skillsIcons.manaPotion,
      description: 'This potion restores 3 Spiritual Power.',
      cost: 75,
    },
  ];

  const [merchantInventory] = useState(itemsInStore);

  return { merchantInventory };
};
