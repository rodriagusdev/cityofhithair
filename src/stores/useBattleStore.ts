import { create } from 'zustand';
import { Player, Unit } from '../types';
import { CombatPhase, EnemyIntent, EnemyStagger, ParryState } from '../features/combat/types';

export interface FloatingCombatNotification {
  id: number;
  target: 'Player' | 'Enemy';
  text: string;
  type: 'damage' | 'crit' | 'heal' | 'parry' | 'status';
}

interface State {
  isInFight: boolean;
  action: string;
  turn: string;
  phase: CombatPhase;
  enemyIntent: EnemyIntent | null;
  parryState: ParryState;
  enemyStagger: EnemyStagger;
  playerActionsRemaining: number;
  boardEnemy: Unit;
  boardPlayer: Player;
  floatingTexts: FloatingCombatNotification[];
}

interface Actions {
  updateFightingStatus: () => void;
  updateAction: (action: string) => void;
  updateTurn: () => void;
  resetTurn: () => void;
  updatePhase: (phase: CombatPhase) => void;
  setEnemyIntent: (intent: EnemyIntent | null) => void;
  setParryState: (parryState: Partial<ParryState>) => void;
  setEnemyStagger: (stagger: Partial<EnemyStagger>) => void;
  setPlayerActionsRemaining: (count: number) => void;
  updateBoardEnemy: (enemy: Unit) => void;
  updateBoardPlayer: (playerHero: Player) => void;
  addFloatingText: (item: Omit<FloatingCombatNotification, 'id'>) => void;
  removeFloatingText: (id: number) => void;
}

const initialParryState: ParryState = {
  isWindowOpen: false,
  canParry: false,
  wasParried: false,
  parryAttempted: false,
  feedbackText: '',
  parriesLanded: 0,
  requiredParries: 1,
  comboBroken: false,
  currentStrike: 0,
  totalStrikes: 1,
  strikeDurationMs: 1400,
};

const initialStagger: EnemyStagger = {
  current: 0,
  max: 2,
  isStaggered: false,
};

const useBattleStore = create<State & Actions>((set, get) => ({
  isInFight: false,
  action: '',
  turn: 'Player',
  phase: 'idle',
  enemyIntent: null,
  parryState: initialParryState,
  enemyStagger: initialStagger,
  playerActionsRemaining: 1,
  boardEnemy: {} as Unit,
  boardPlayer: {} as Player,
  floatingTexts: [],

  addFloatingText: (item: Omit<FloatingCombatNotification, 'id'>) => {
    const id = Date.now() + Math.random();
    set((state) => ({
      floatingTexts: [...state.floatingTexts.slice(-4), { ...item, id }],
    }));
  },
  removeFloatingText: (id: number) => {
    set((state) => ({
      floatingTexts: state.floatingTexts.filter((t) => t.id !== id),
    }));
  },

  updateAction: (action: string) => set({ action }),
  updateTurn: () => {
    const getTurn = get().turn;
    const newTurn = getTurn === 'Player' ? 'Enemy' : 'Player';
    const currentActions = get().playerActionsRemaining;
    set({
      turn: newTurn,
      phase: newTurn === 'Player' ? 'player_turn' : 'idle',
      playerActionsRemaining:
        newTurn === 'Player'
          ? (currentActions > 1 ? currentActions : 1)
          : 0,
    });
  },
  resetTurn: () =>
    set({
      turn: 'Player',
      phase: 'player_turn',
      action: '',
      enemyIntent: null,
      parryState: initialParryState,
      enemyStagger: initialStagger,
      playerActionsRemaining: 1,
      floatingTexts: [],
    }),
  updatePhase: (phase: CombatPhase) => set({ phase }),
  setEnemyIntent: (enemyIntent: EnemyIntent | null) => set({ enemyIntent }),
  setParryState: (partial: Partial<ParryState>) =>
    set((state) => ({ parryState: { ...state.parryState, ...partial } })),
  setEnemyStagger: (partial: Partial<EnemyStagger>) =>
    set((state) => ({ enemyStagger: { ...state.enemyStagger, ...partial } })),
  setPlayerActionsRemaining: (count: number) => set({ playerActionsRemaining: count }),

  updateFightingStatus: () =>
    set((state) => {
      const nextInFight = !state.isInFight;
      return {
        isInFight: nextInFight,
        phase: nextInFight ? 'player_turn' : 'idle',
        turn: 'Player',
        action: '',
        enemyIntent: null,
        parryState: initialParryState,
        enemyStagger: initialStagger,
        playerActionsRemaining: 1,
        floatingTexts: [],
      };
    }),
  updateBoardEnemy: (enemy: Unit) => set({ boardEnemy: enemy }),
  updateBoardPlayer: (playerHero: Player) => set({ boardPlayer: playerHero }),
}));

export default useBattleStore;

