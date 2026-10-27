import { Player } from './index';

export interface DialogChoice {
  id: string;
  text: string;
  /**
   * If provided, navigating to this node ID in the tree.
   * Can be 'root' to return to top-level questions, or a sub-node ID for branching.
   */
  targetNodeId?: string;
  /** Action executed when this choice is selected */
  action?: 'close' | 'trade' | 'victory';
  /** Optional predicate to check if choice is available to the player */
  condition?: (player: Player) => boolean;
}

export interface DialogNode {
  id: string;
  /** Speaker name override (e.g. Nicolai revealing true name Modra-Urmir) */
  speakerName?: string;
  /** Portrait override if character shifts form */
  speakerPortrait?: string;
  /** Narrative text spoken by the character */
  text: string;
  /** Choices / branches offered from this node */
  choices: DialogChoice[];
}

export interface DialogTree {
  id: string;
  npcName: string;
  npcPortrait: string;
  npcFace: string;
  /** Thematic styling: 'crimson' for town sanctuary, 'occult' for deep dungeon lich, 'iron' for warrior */
  theme?: 'crimson' | 'occult' | 'iron';
  /** Initial speech when the conversation opens */
  initialGreeting: string;
  /** Initial choices offered to the player */
  rootChoices: DialogChoice[];
  /** Map of conversation nodes for topic depth and branching */
  nodes: Record<string, DialogNode>;
  /** Whether the NPC has merchant wares to display */
  hasShop?: boolean;
}

export interface ActiveDialogState {
  treeId: string;
  currentNodeId: string;
  speakerName: string;
  speakerPortrait: string;
  text: string;
  choices: DialogChoice[];
  hasShop: boolean;
  theme: 'crimson' | 'occult' | 'iron';
  visitedChoiceIds: Record<string, boolean>;
}

export type DialogFSMState =
  | { status: 'idle' }
  | { status: 'in_dialog'; dialog: ActiveDialogState }
  | { status: 'in_note'; note: { name: string; text: string } };
