import { create } from 'zustand';
import { NoteProps, Dialog, LegacyDialogOption } from '../types';
import { ActiveDialogState, DialogChoice, DialogFSMState } from '../types/dialog';
import { DIALOG_TREES, getDialogTree } from '../data/dialog/dialogTrees';

interface State {
  fsm: DialogFSMState;
  isVictoryVisible: boolean;

  // Legacy convenience properties
  isInDialog: boolean;
  isInNote: boolean;
  dialog: Dialog;
  note: NoteProps;
}

interface Actions {
  startDialog: (treeId: string, initialNodeId?: string) => void;
  selectChoice: (choice: DialogChoice) => void;
  closeDialog: () => void;
  openNote: (note: NoteProps) => void;
  closeNote: () => void;
  setVictoryVisible: (visible: boolean) => void;

  // Legacy backwards-compatibility actions
  updateDialogStatus: () => void;
  updateDialog: (data: Dialog) => void;
  updateDialogText: (text: string) => void;
  updateNoteStatus: () => void;
  updateNote: (data: NoteProps) => void;
}

const initialNote: NoteProps = { name: '', text: '' };
const initialLegacyDialog: Dialog = {
  name: '',
  portrait: '',
  options: [],
  text: '',
};

export const useDialogStore = create<State & Actions>((set, get) => ({
  fsm: { status: 'idle' },
  isVictoryVisible: false,

  isInDialog: false,
  isInNote: false,
  dialog: initialLegacyDialog,
  note: initialNote,

  startDialog: (treeId: string, initialNodeId?: string) => {
    const tree = getDialogTree(treeId);
    if (!tree) return;

    let text = tree.initialGreeting;
    let choices = tree.rootChoices;
    let speakerName = tree.npcName;
    let speakerPortrait = tree.npcPortrait;
    let currentNodeId = 'root';

    if (initialNodeId && tree.nodes[initialNodeId]) {
      const node = tree.nodes[initialNodeId];
      text = node.text;
      choices = node.choices;
      speakerName = node.speakerName || tree.npcName;
      speakerPortrait = node.speakerPortrait || tree.npcPortrait;
      currentNodeId = initialNodeId;
    }

    const activeDialog: ActiveDialogState = {
      treeId,
      currentNodeId,
      speakerName,
      speakerPortrait,
      text,
      choices,
      hasShop: Boolean(tree.hasShop),
      theme: tree.theme || 'crimson',
      visitedChoiceIds: {},
    };

    const legacyOptions: LegacyDialogOption[] = choices.map((c) => ({
      text: c.text,
      createDialog: () => get().selectChoice(c),
    }));

    set({
      fsm: { status: 'in_dialog', dialog: activeDialog },
      isInDialog: true,
      isInNote: false,
      dialog: {
        name: speakerName,
        portrait: speakerPortrait,
        text,
        options: legacyOptions,
      },
    });
  },

  selectChoice: (choice: DialogChoice) => {
    const currentFsm = get().fsm;
    if (currentFsm.status !== 'in_dialog') return;

    const currentDialog = currentFsm.dialog;
    const tree = DIALOG_TREES[currentDialog.treeId];

    // 1. Mark as visited
    const nextVisited = {
      ...currentDialog.visitedChoiceIds,
      [choice.id]: true,
    };

    // 2. Action triggers
    if (choice.action === 'close') {
      get().closeDialog();
      return;
    }

    if (choice.action === 'victory') {
      set({ isVictoryVisible: true });
      return;
    }

    if (!tree) return;

    // 3. Return to root or navigate to node
    let nextText = tree.initialGreeting;
    let nextChoices = tree.rootChoices;
    let nextSpeaker = tree.npcName;
    let nextPortrait = tree.npcPortrait;
    let nextNodeId = 'root';

    if (choice.targetNodeId && choice.targetNodeId !== 'root') {
      const targetNode = tree.nodes[choice.targetNodeId];
      if (targetNode) {
        nextText = targetNode.text;
        nextChoices = targetNode.choices;
        nextSpeaker = targetNode.speakerName || tree.npcName;
        nextPortrait = targetNode.speakerPortrait || tree.npcPortrait;
        nextNodeId = targetNode.id;
      }
    }

    const nextDialogState: ActiveDialogState = {
      ...currentDialog,
      currentNodeId: nextNodeId,
      speakerName: nextSpeaker,
      speakerPortrait: nextPortrait,
      text: nextText,
      choices: nextChoices,
      visitedChoiceIds: nextVisited,
    };

    const legacyOptions: LegacyDialogOption[] = nextChoices.map((c) => ({
      text: c.text,
      createDialog: () => get().selectChoice(c),
    }));

    set({
      fsm: { status: 'in_dialog', dialog: nextDialogState },
      dialog: {
        name: nextSpeaker,
        portrait: nextPortrait,
        text: nextText,
        options: legacyOptions,
      },
    });
  },

  closeDialog: () => {
    set({
      fsm: { status: 'idle' },
      isInDialog: false,
    });
  },

  openNote: (note: NoteProps) => {
    set({
      fsm: { status: 'in_note', note },
      isInNote: true,
      isInDialog: false,
      note,
    });
  },

  closeNote: () => {
    set({
      fsm: { status: 'idle' },
      isInNote: false,
      note: initialNote,
    });
  },

  setVictoryVisible: (visible: boolean) => set({ isVictoryVisible: visible }),

  // Legacy actions
  updateDialogStatus: () => {
    const isNowInDialog = !get().isInDialog;
    if (!isNowInDialog) {
      get().closeDialog();
    } else {
      set({ isInDialog: true });
    }
  },

  updateDialog: (data: Dialog) => {
    const treeId = data.name.toLowerCase();
    const existingTree = getDialogTree(treeId);

    if (existingTree) {
      get().startDialog(treeId);
    } else {
      // Direct raw dialog fallback
      const activeDialog: ActiveDialogState = {
        treeId: data.name,
        currentNodeId: 'root',
        speakerName: data.name,
        speakerPortrait: data.portrait,
        text: data.text,
        choices: data.options.map((opt, i) => ({
          id: `opt-${i}`,
          text: opt.text,
        })),
        hasShop: false,
        theme: 'crimson',
        visitedChoiceIds: {},
      };

      set({
        fsm: { status: 'in_dialog', dialog: activeDialog },
        isInDialog: true,
        dialog: data,
      });
    }
  },

  updateDialogText: (text: string) => {
    set((state) => ({
      dialog: { ...state.dialog, text },
      fsm:
        state.fsm.status === 'in_dialog'
          ? {
              status: 'in_dialog',
              dialog: { ...state.fsm.dialog, text },
            }
          : state.fsm,
    }));
  },

  updateNoteStatus: () => {
    const nextInNote = !get().isInNote;
    if (!nextInNote) {
      get().closeNote();
    } else {
      set({ isInNote: true });
    }
  },

  updateNote: (data: NoteProps) => {
    get().openNote(data);
  },
}));

export default useDialogStore;
