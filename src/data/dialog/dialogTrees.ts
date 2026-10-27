import {
  dialogMarion,
  dialogMerchant,
  dialogKnight,
  dialogNicolai,
} from '../general/dialogTexts';
import { npcPortraits } from '../general/portraitsNPCs';
import { DialogTree } from '../../types/dialog';

export const DIALOG_TREES: Record<string, DialogTree> = {
  marion: {
    id: 'marion',
    npcName: 'Marion',
    npcPortrait: npcPortraits.marion,
    npcFace: npcPortraits.marionface,
    theme: 'crimson',
    initialGreeting:
      'Welcome to what remains of our sanctuary, traveler. The ruins and memory of our city hold many grim tales, and the dead stir in the cemetery. Speak, what brings you to Hithair?',
    rootChoices: [
      { id: 'hithair', text: 'Hithair', targetNodeId: 'hithair' },
      { id: 'evil', text: 'Ancient Evil', targetNodeId: 'evil' },
      { id: 'tamoe', text: 'Tamoé', targetNodeId: 'tamoe' },
      { id: 'dungeons', text: 'Dungeons', targetNodeId: 'dungeons' },
      { id: 'wanderer', text: 'Wanderer', targetNodeId: 'wanderer' },
      { id: 'darkknights', text: 'Dark Knights', targetNodeId: 'darkknights' },
      { id: 'merchant', text: 'Merchant', targetNodeId: 'merchant' },
    ],
    nodes: {
      hithair: {
        id: 'hithair',
        text: dialogMarion.hithair,
        choices: [
          { id: 'hithair-tamoe', text: 'Ask about Tamoé.', targetNodeId: 'tamoe' },
          { id: 'hithair-evil', text: 'Ask about the ancient evil.', targetNodeId: 'evil' },
          { id: 'hithair-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'hithair-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      evil: {
        id: 'evil',
        text: dialogMarion.evil,
        choices: [
          { id: 'evil-dungeons', text: 'Ask about the dungeons beneath.', targetNodeId: 'dungeons' },
          { id: 'evil-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'evil-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      tamoe: {
        id: 'tamoe',
        text: dialogMarion.tamoe,
        choices: [
          { id: 'tamoe-evil', text: 'Ask about Thune.', targetNodeId: 'evil' },
          { id: 'tamoe-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'tamoe-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      dungeons: {
        id: 'dungeons',
        text: dialogMarion.dungeons,
        choices: [
          { id: 'dungeons-wanderer', text: 'Ask about the wanderer Nicolai.', targetNodeId: 'wanderer' },
          { id: 'dungeons-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'dungeons-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      wanderer: {
        id: 'wanderer',
        text: dialogMarion.wanderer,
        choices: [
          { id: 'wanderer-darkknights', text: 'Ask about the dark knights.', targetNodeId: 'darkknights' },
          { id: 'wanderer-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'wanderer-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      darkknights: {
        id: 'darkknights',
        text: dialogMarion.darkknights,
        choices: [
          { id: 'darkknights-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'darkknights-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      merchant: {
        id: 'merchant',
        text: dialogMarion.merchant,
        choices: [
          { id: 'merchant-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'merchant-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
    },
  },

  merchant: {
    id: 'merchant',
    npcName: 'Merchant',
    npcPortrait: npcPortraits.merchant,
    npcFace: npcPortraits.merchantface,
    theme: 'crimson',
    hasShop: true,
    initialGreeting:
      'Wares and curiosities scavenged from the crypts below... Interested in trading, or curious where I find these relics?',
    rootChoices: [
      { id: 'items', text: 'Items', targetNodeId: 'items' },
      { id: 'money', text: 'Money', targetNodeId: 'money' },
    ],
    nodes: {
      items: {
        id: 'items',
        text: dialogMerchant.items,
        choices: [
          { id: 'items-money', text: 'Ask about the gold and statues.', targetNodeId: 'money' },
          { id: 'items-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'items-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      money: {
        id: 'money',
        text: dialogMerchant.money,
        choices: [
          { id: 'money-items', text: 'Ask about the items for sale.', targetNodeId: 'items' },
          { id: 'money-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'money-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
    },
  },

  knight: {
    id: 'knight',
    npcName: 'Knight',
    npcPortrait: npcPortraits.knight,
    npcFace: npcPortraits.knightface,
    theme: 'iron',
    initialGreeting:
      'Hold there, traveler. The depths below have stirred with unholy creatures and bestial knights. Choose your words carefully; what is your business in Hithair?',
    rootChoices: [
      { id: 'dungeons', text: 'Dungeons', targetNodeId: 'dungeons' },
      { id: 'cannibal', text: 'The Cannibal', targetNodeId: 'cannibal' },
    ],
    nodes: {
      dungeons: {
        id: 'dungeons',
        text: dialogKnight.dungeons,
        choices: [
          { id: 'dungeons-cannibal', text: 'Ask about The Cannibal.', targetNodeId: 'cannibal' },
          { id: 'dungeons-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'dungeons-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
      cannibal: {
        id: 'cannibal',
        text: dialogKnight.cannibal,
        choices: [
          { id: 'cannibal-dungeons', text: 'Ask about the passages.', targetNodeId: 'dungeons' },
          { id: 'cannibal-back', text: 'Ask about something else.', targetNodeId: 'root' },
          { id: 'cannibal-leave', text: 'Take your leave.', action: 'close' },
        ],
      },
    },
  },

  nicolai: {
    id: 'nicolai',
    npcName: 'Nicolai',
    npcPortrait: npcPortraits.nicolai,
    npcFace: npcPortraits.nicolai,
    theme: 'occult',
    initialGreeting:
      '*As you enter the room you see a gaze in the gloom. Your body does not answer.* "You are too late. I had already delivered the knowledge to my master. And he has delivered me you. You didn\'t think I would leave those notes without any intent, did you? You will be but a vessel when this is all over. Join me as you may, I can linger here a great while. I will break my grip on your throat and let you ask what you will, but as of your body consider it forsaken."',
    rootChoices: [
      { id: 'who', text: 'Who are you?', targetNodeId: 'who' },
      { id: 'what', text: 'What are you?', targetNodeId: 'what' },
      { id: 'ofMe', text: 'What are you going to do to me?', targetNodeId: 'ofMe' },
      { id: 'join', text: 'Join Nicolai.', targetNodeId: 'join' },
    ],
    nodes: {
      who: {
        id: 'who',
        speakerName: 'Modra-Urmir',
        text: dialogNicolai.nicolai,
        choices: [
          { id: 'who-inTime', text: 'Perhaps, in time.', targetNodeId: 'inTime' },
          { id: 'who-what', text: 'What are you?', targetNodeId: 'what' },
          { id: 'who-ofMe', text: 'What are you going to do to me?', targetNodeId: 'ofMe' },
          { id: 'who-join', text: 'Join Modra-Urmir.', targetNodeId: 'join' },
          { id: 'who-back', text: 'Ask something else.', targetNodeId: 'root' },
        ],
      },
      inTime: {
        id: 'inTime',
        speakerName: 'Modra-Urmir',
        text: dialogNicolai.inTime,
        choices: [
          { id: 'inTime-what', text: 'What are you?', targetNodeId: 'what' },
          { id: 'inTime-ofMe', text: 'What are you going to do to me?', targetNodeId: 'ofMe' },
          { id: 'inTime-join', text: 'Join Modra-Urmir.', targetNodeId: 'join' },
          { id: 'inTime-back', text: 'Ask something else.', targetNodeId: 'root' },
        ],
      },
      what: {
        id: 'what',
        speakerName: 'Modra-Urmir',
        text: dialogNicolai.nature,
        choices: [
          { id: 'what-who', text: 'Who are you?', targetNodeId: 'who' },
          { id: 'what-ofMe', text: 'What are you going to do to me?', targetNodeId: 'ofMe' },
          { id: 'what-join', text: 'Join Modra-Urmir.', targetNodeId: 'join' },
          { id: 'what-back', text: 'Ask something else.', targetNodeId: 'root' },
        ],
      },
      ofMe: {
        id: 'ofMe',
        speakerName: 'Modra-Urmir',
        text: dialogNicolai.ofMe,
        choices: [
          { id: 'ofMe-who', text: 'Who are you?', targetNodeId: 'who' },
          { id: 'ofMe-what', text: 'What are you?', targetNodeId: 'what' },
          { id: 'ofMe-join', text: 'Join Modra-Urmir.', targetNodeId: 'join' },
          { id: 'ofMe-back', text: 'Ask something else.', targetNodeId: 'root' },
        ],
      },
      join: {
        id: 'join',
        speakerName: 'Modra-Urmir',
        text: dialogNicolai.join,
        choices: [
          { id: 'join-victory', text: 'Submit to your fate.', action: 'victory' },
        ],
      },
    },
  },
};

export const getDialogTree = (treeId: string): DialogTree | undefined => {
  return DIALOG_TREES[treeId];
};
