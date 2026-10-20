import { skillsIcons } from './icons';

export const attack = {
  name: 'Attack',
  description: 'Basic physical attack.',
  image: skillsIcons.attack,
  cost: 0,
};

export const defend = {
  name: 'Defend',
  description:
    'Adds 1 point to defense for 3 turns. Each point in defense reduces incoming damage by 10%. Consumes 2 Spiritual Power.' +
    '\nSelf Cast: Will fire immediately.',
  image: skillsIcons.defend,
  cost: 2,
};

export const frenzy = {
  name: 'Frenzy',
  description:
    'Strong buff that enhances your damage by 7 but reduces your defense by 2 points for 3 turns. Consumes 2 Spiritual Power.' +
    '\nSelf Cast: Will fire immediately.',
  image: skillsIcons.frenzy,
  cost: 2,
};

export const sacrifice = {
  name: 'Sacrifice',
  description:
    "Performs a strike dealing weapon damage that permanently shatters the opponent's armor for 3 turns, but at the cost of 11 health and 2 Spiritual Power.",
  image: skillsIcons.sacrifice,
  cost: 2,
};

export const drinkLifePotion = {
  name: 'Potion Of Life',
  description: 'Heals 15 Health Points. Does not consume the turn.',
  image: skillsIcons.healthPotion,
  cost: 0,
};

export const drinkManaPotion = {
  name: 'Potion Of Magic',
  description:
    'Restores 3 points of spiritual power. Does not consume the turn.',
  image: skillsIcons.manaPotion,
  cost: 0,
};
