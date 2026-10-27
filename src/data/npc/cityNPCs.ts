import { npcPortraits } from '../general';

export interface CityNPC {
  id: string;
  name: string;
  portrait: string;
  face: string;
  x: number | string;
  y: number | string;
}

export const cityNPCs: CityNPC[] = [
  {
    id: 'marion',
    name: 'Marion',
    portrait: npcPortraits.marion,
    face: npcPortraits.marionface,
    x: '75%',
    y: '24%',
  },
  {
    id: 'merchant',
    name: 'Merchant',
    portrait: npcPortraits.merchant,
    face: npcPortraits.merchantface,
    x: '38%',
    y: '38%',
  },
  {
    id: 'knight',
    name: 'Knight',
    portrait: npcPortraits.knight,
    face: npcPortraits.knightface,
    x: '68%',
    y: '74%',
  },
];
