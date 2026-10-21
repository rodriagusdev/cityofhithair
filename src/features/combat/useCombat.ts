import { useCallback, useEffect, useRef } from 'react';
import swordSound from '../../assets/sound/swordSlash.mp3';
import drinkpotion from '../../assets/sound/drinkpotion.ogg';
import drinkpotionmana from '../../assets/sound/drinkpotionmana.ogg';
import spelldefend from '../../assets/sound/spelldefend.wav';
import spelldrainlife from '../../assets/sound/spelldrainlife.wav';
import spellfrenzy from '../../assets/sound/spellfrenzy.wav';
import spellvulnerability from '../../assets/sound/spellvulnerability.wav';
import spellweakness from '../../assets/sound/spellweakness.wav';
import warning from '../../assets/sound/warning.ogg';
import parrySound from '../../assets/sound/parrysound.mp3';
import { waitTimer } from '../../utils';
import { soundEngine } from '../../services/soundEngine';
import {
  useAnnouncerStore,
  useBattleStore,
  useLevelsStore,
  usePlayerStore,
} from '../../stores';
import { Action, Player, Unit } from '../../types';
import { skillsIcons } from '../../data/skills';
import { useLoot } from './useLoot';
import { calculateDamage, combatActions, tickUnitStatuses } from './combatEngine';
import { decideEnemyIntent, getEnemyStaggerThreshold } from './enemyAi';
import { CombatActionResult } from './types';

export const useCombat = () => {
  const {
    isInFight,
    turn,
    phase,
    enemyIntent,
    parryState,
    enemyStagger,
    playerActionsRemaining,
    boardEnemy,
    boardPlayer,
    updateTurn,
    resetTurn,
    updateFightingStatus,
    updateBoardEnemy,
    updateBoardPlayer,
    updateAction,
    setEnemyIntent,
    setParryState,
    setEnemyStagger,
    setPlayerActionsRemaining,
    updatePhase,
    addFloatingText,
    triggerScreenShake,
  } = useBattleStore();

  const { handleAnnouncer, updateAnnouncerAction } = useAnnouncerStore();
  const { updateLevelEnemies } = useLevelsStore();
  const { handleLoot } = useLoot();
  const {
    healthPotions,
    manaPotions,
    updatePotion,
    establishInitialHero,
    updatePlayerVitals,
    updateGold,
  } = usePlayerStore();

  const isResolvingRef = useRef(false);
  const strikeInterruptRef = useRef<(() => void) | null>(null);

  const displayAnnouncer = (
    attacker: Unit | Player,
    target: Unit | Player,
    icon: string,
    text: string
  ) => {
    const actionData: Action = {
      text,
      attackerImg: attacker.portraitFace,
      receiverImg: target.portraitFace,
      skillIcon: icon,
    };
    updateAnnouncerAction(actionData);
    handleAnnouncer();
    setTimeout(() => {
      handleAnnouncer();
    }, 1500);
  };

  const playActionSound = (actionName: string, caster?: Unit | Player) => {
    switch (actionName) {
      case 'Attack':
      case 'Dark Magic: Attack':
      case 'Sacrifice':
        if (caster?.sounds?.attack) {
          soundEngine.playSfx(caster.sounds.attack);
        } else if (typeof caster?.soundAttack === 'function') {
          caster.soundAttack();
        } else {
          soundEngine.playSfx(swordSound);
        }
        break;
      case 'Defend':
        soundEngine.playSfx(spelldefend);
        break;
      case 'Frenzy':
        soundEngine.playSfx(spellfrenzy);
        break;
      case 'Weakness':
        soundEngine.playSfx(spellweakness);
        break;
      case 'Vulnerability':
        soundEngine.playSfx(spellvulnerability);
        break;
      case 'Drain Life':
        soundEngine.playSfx(spelldrainlife);
        break;
      case 'Potion Of Life':
        soundEngine.playSfx(drinkpotion);
        break;
      case 'Potion Of Magic':
        soundEngine.playSfx(drinkpotionmana);
        break;
      default:
        if (caster?.sounds?.attack) {
          soundEngine.playSfx(caster.sounds.attack);
        } else if (typeof caster?.soundAttack === 'function') {
          caster.soundAttack();
        }
        break;
    }
  };

  const handleEnemyDeath = async (enemy: Unit) => {
    updatePhase('victory');
    if (enemy.sounds?.death) {
      soundEngine.playSfx(enemy.sounds.death);
    } else if (typeof enemy.soundDeath === 'function') {
      enemy.soundDeath();
    }

    // Persist player's remaining health and magic back to player store
    const winningHero = useBattleStore.getState().boardPlayer;
    if (winningHero) {
      updatePlayerVitals(winningHero.health, winningHero.magic);
    }

    const enemiesRemaining = await updateLevelEnemies(
      enemy.level as Parameters<typeof updateLevelEnemies>[0],
      enemy.id
    );

    await waitTimer(1400);
    resetTurn();
    updateFightingStatus();

    if (enemiesRemaining.length === 0) {
      handleLoot(enemy.level);
    }
  };

  const handlePlayerDeath = (player: Player) => {
    updatePhase('defeat');
    if (player.sounds?.death) {
      soundEngine.playSfx(player.sounds.death);
    } else if (typeof player.soundDeath === 'function') {
      player.soundDeath();
    }
    // Sync dead player with player store so GameOver overlay displays
    establishInitialHero({ ...player, health: 0 });
  };

  /**
  * Player parry attempt hook.
  * Supports single and multi-strike flurry parries.
  */
  const attemptParry = useCallback((): boolean => {
    const phase = useBattleStore.getState().phase;
    if (phase !== 'enemy_telegraph') return false;

    const enemyIntent = useBattleStore.getState().enemyIntent;
    const boardPlayer = useBattleStore.getState().boardPlayer;
    const isSpell = Boolean(
      enemyIntent?.isSpell ||
      enemyIntent?.actionName === 'Drain Life' ||
      enemyIntent?.actionName === 'Weakness' ||
      enemyIntent?.actionName === 'Vulnerability'
    );
    const playerSp = boardPlayer?.magic ?? 0;

    // Cannot parry spells if player has 0 spiritual power
    if (isSpell && playerSp <= 0) {
      soundEngine.playSfx(warning);
      setParryState({
        canParry: false,
        feedbackText: 'NO SPIRITUAL POWER!',
      });
      addFloatingText({
        target: 'Player',
        text: 'CANNOT PARRY SPELLS (0 SP)!',
        type: 'status',
      });
      return false;
    }

    const state = useBattleStore.getState().parryState;
    if (state.comboBroken || state.parryAttempted || !state.canParry) {
      return false; // Already tried for this strike or combo broken
    }

    if (state.isWindowOpen && state.canParry) {
      const newLanded = state.parriesLanded + 1;
      const needed = state.requiredParries || 1;
      soundEngine.playSfx(parrySound);

      if (newLanded >= needed) {
        // Perfect reaction / combo broken!
        setParryState({
          parriesLanded: newLanded,
          wasParried: true,
          comboBroken: true,
          canParry: false,
          parryAttempted: true,
          feedbackText: needed > 1 ? 'COMBO DEFLECTED!' : 'PERFECT PARRY!',
        });
        addFloatingText({
          target: 'Player',
          text: needed > 1 ? 'COMBO DEFLECTED!' : 'PARRIED!',
          type: 'parry',
        });
        return true;
      } else {
        // Successfully deflected this strike!
        setParryState({
          parriesLanded: newLanded,
          wasParried: true,
          canParry: false,
          parryAttempted: true,
          feedbackText: 'PARRIED!',
        });
        addFloatingText({
          target: 'Player',
          text: 'PARRIED!',
          type: 'parry',
        });
        return true;
      }
    } else {
      // Failed parry! Pressed outside active window (too early or too late)
      soundEngine.playSfx(warning);
      setParryState({
        isWindowOpen: false,
        canParry: false,
        parryAttempted: true,
        wasParried: false,
        feedbackText: 'FAILED PARRY!',
      });
      addFloatingText({
        target: 'Player',
        text: 'MISSED PARRY!',
        type: 'damage',
      });

      // Attack instantly launches! Abort remaining telegraph time immediately
      if (strikeInterruptRef.current) {
        strikeInterruptRef.current();
      }
      return false;
    }
  }, [setParryState, addFloatingText]);

  const runEnemyTurn = async (currentEnemy: Unit, currentPlayer: Player) => {
    if (currentEnemy.health <= 0 || currentPlayer.health <= 0) return;

    // Check if the enemy is stunned/staggered from posture break
    const currentStagger = useBattleStore.getState().enemyStagger;
    if (currentStagger.isStaggered) {
      soundEngine.playSfx(warning);
      addFloatingText({
        target: 'Enemy',
        text: 'STUNNED! TURN SKIPPED!',
        type: 'status',
      });
      displayAnnouncer(
        currentEnemy,
        currentEnemy,
        skillsIcons.defend,
        `${currentEnemy.name} is STAGGERED and cannot act! Extra Turn for ${currentPlayer.name}!`
      );
      // Clear stagger state and grant extra action to player
      setEnemyStagger({ isStaggered: false, current: 0 });
      setPlayerActionsRemaining(2);
      await waitTimer(1400);
      updateTurn(); // Returns to Player
      return;
    }

    // Tick enemy statuses when their turn begins
    const enemyUnitCopy = { ...currentEnemy };
    tickUnitStatuses(enemyUnitCopy);
    updateBoardEnemy(enemyUnitCopy);

    const intent = decideEnemyIntent(enemyUnitCopy, currentPlayer);
    setEnemyIntent(intent);
    updateAction(intent.actionName);

    const totalHits = intent.totalHits ?? 1;
    const requiredParries = intent.requiredParries ?? 1;
    const playerHeroCopy = { ...currentPlayer };
    const actionDef = combatActions[intent.actionName] || combatActions.Attack;

    const isSpell = Boolean(
      intent.isSpell ||
      intent.actionName === 'Drain Life' ||
      intent.actionName === 'Weakness' ||
      intent.actionName === 'Vulnerability'
    );
    const spellCost = isSpell
      ? (actionDef.cost?.magic ?? (intent.actionName === 'Drain Life' ? 3 : 2))
      : 0;

    const playerSp = playerHeroCopy.magic ?? 0;
    const canParryThisStrike = !isSpell || playerSp > 0;

    // Calculate base total damage without mutating player ahead of parry attempts
    let fullDamage = 0;
    let isCritical = false;

    if (intent.actionName === 'Drain Life') {
      const mastery = enemyUnitCopy.darkMastery || 0;
      fullDamage = 10 + 2 * mastery;
    } else if (
      intent.actionName === 'Weakness' ||
      intent.actionName === 'Vulnerability' ||
      intent.actionName === 'Defend' ||
      intent.actionName === 'Frenzy'
    ) {
      fullDamage = 0;
    } else {
      const calc = calculateDamage(enemyUnitCopy, playerHeroCopy);
      fullDamage = calc.damage;
      isCritical = calc.isCritical;
    }

    // Each attack deals full damage unless parried (not divided across hits)
    const damagePerStrike = fullDamage;

    let currentParriesLanded = 0;
    let comboBroken = false;

    // Announce the upcoming assault
    displayAnnouncer(
      enemyUnitCopy,
      playerHeroCopy,
      intent.icon,
      intent.telegraphMessage
    );

    // Initial brief delay for the player to read the battle bark
    await waitTimer(totalHits > 1 ? 700 : 900);

    // Sequential strike loop: enemy actually attempts each strike
    for (let strike = 0; strike < totalHits; strike++) {
      if (playerHeroCopy.health <= 0 || enemyUnitCopy.health <= 0) break;
      if (comboBroken) break;

      // Telegraph timing: Generous, rhythmic, and readable per strike
      const telegraphMs = totalHits > 1 ? 1200 : intent.telegraphDurationMs;
      const windowStartMs =
        totalHits > 1 ? 700 : (intent.parryWindow?.startMs ?? 800);
      const windowDurationMs =
        totalHits > 1 ? 450 : (intent.parryWindow?.durationMs ?? 450);

      // Arm parry state for this specific attack attempt
      setParryState({
        isWindowOpen: false,
        canParry: canParryThisStrike,
        wasParried: false,
        parryAttempted: false,
        feedbackText: !canParryThisStrike ? '0 SPIRITUAL POWER' : '',
        parriesLanded: currentParriesLanded,
        requiredParries,
        comboBroken: false,
        currentStrike: strike,
        totalStrikes: totalHits,
        strikeDurationMs: telegraphMs,
      });

      updatePhase('enemy_telegraph');

      let strikeWindowTimer: number | null = null;
      let strikeCloseTimer: number | null = null;
      let telegraphTimer: number | null = null;
      let resolveStrikeTelegraph: (() => void) | null = null;

      const strikePromise = new Promise<void>((resolve) => {
        resolveStrikeTelegraph = resolve;
      });

      strikeInterruptRef.current = () => {
        if (strikeWindowTimer !== null) clearTimeout(strikeWindowTimer);
        if (strikeCloseTimer !== null) clearTimeout(strikeCloseTimer);
        if (telegraphTimer !== null) clearTimeout(telegraphTimer);
        strikeWindowTimer = null;
        strikeCloseTimer = null;
        telegraphTimer = null;
        if (resolveStrikeTelegraph) {
          resolveStrikeTelegraph();
          resolveStrikeTelegraph = null;
        }
      };

      strikeWindowTimer = window.setTimeout(() => {
        const current = useBattleStore.getState().parryState;
        if (
          !current.wasParried &&
          !current.comboBroken &&
          !current.parryAttempted &&
          current.canParry &&
          canParryThisStrike
        ) {
          setParryState({
            isWindowOpen: true,
            canParry: true,
          });
        }
      }, windowStartMs);

      strikeCloseTimer = window.setTimeout(() => {
        setParryState({ isWindowOpen: false });
      }, windowStartMs + windowDurationMs);

      telegraphTimer = window.setTimeout(() => {
        if (resolveStrikeTelegraph) {
          resolveStrikeTelegraph();
          resolveStrikeTelegraph = null;
        }
      }, telegraphMs);

      await strikePromise;

      if (strikeWindowTimer !== null) clearTimeout(strikeWindowTimer);
      if (strikeCloseTimer !== null) clearTimeout(strikeCloseTimer);
      if (telegraphTimer !== null) clearTimeout(telegraphTimer);
      strikeInterruptRef.current = null;

      const latestParryState = useBattleStore.getState().parryState;
      const didParryThisStrike =
        latestParryState.parriesLanded > currentParriesLanded;

      if (didParryThisStrike) {
        currentParriesLanded = latestParryState.parriesLanded;
        setParryState({ wasParried: true });
      } else {
        setParryState({ wasParried: false });
      }

      if (currentParriesLanded >= requiredParries) {
        comboBroken = true;
        setParryState({
          wasParried: true,
          comboBroken: true,
          canParry: false,
          parryAttempted: true,
          feedbackText: 'COMBO DEFLECTED!',
        });
      }

      // Resolve this strike
      updatePhase('enemy_turn');

      if (didParryThisStrike) {
        // Strike was deflected!
        if (isSpell && spellCost > 0) {
          enemyUnitCopy.magic = Math.max(0, enemyUnitCopy.magic - spellCost);
          updateBoardEnemy(enemyUnitCopy);
          addFloatingText({
            target: 'Enemy',
            text: `-${spellCost} SP`,
            type: 'status',
          });
          displayAnnouncer(
            playerHeroCopy,
            enemyUnitCopy,
            intent.icon,
            `SPELL DEFLECTED! ${enemyUnitCopy.name}'s magic is drained (-${spellCost} SP)!`
          );
        }
        await waitTimer(600);
      } else {
        // Strike landed and damaged player!
        playActionSound(intent.actionName, enemyUnitCopy);
        if (playerHeroCopy.sounds?.hit) {
          soundEngine.playSfx(playerHeroCopy.sounds.hit);
        } else if (typeof playerHeroCopy.soundHitted === 'function') {
          playerHeroCopy.soundHitted();
        }

        if (fullDamage > 0) {
          playerHeroCopy.health = Math.max(
            0,
            playerHeroCopy.health - damagePerStrike
          );
          updateBoardPlayer(playerHeroCopy);

          addFloatingText({
            target: 'Player',
            text: `-${damagePerStrike}`,
            type: isCritical ? 'crit' : 'damage',
          });
        }

        // Apply unparried spell debuffs or life drain
        if (intent.actionName === 'Weakness' || intent.actionName === 'Vulnerability') {
          actionDef.execute(enemyUnitCopy, playerHeroCopy, false);
          updateBoardEnemy(enemyUnitCopy);
          updateBoardPlayer(playerHeroCopy);
        } else if (intent.actionName === 'Drain Life') {
          if (spellCost > 0) {
            enemyUnitCopy.magic = Math.max(0, enemyUnitCopy.magic - spellCost);
          }
          enemyUnitCopy.health = Math.min(enemyUnitCopy.maxHealth, enemyUnitCopy.health + damagePerStrike);
          updateBoardEnemy(enemyUnitCopy);
        }

        await waitTimer(600);
      }

      if (comboBroken) {
        break; // Cancel remaining strikes!
      }

      // If more strikes remain in the combo, provide a clear breathing pause so the next strike doesn't start ticking immediately
      if (strike < totalHits - 1) {
        updatePhase('idle');
        await waitTimer(400);
      }
    }

    updateBoardEnemy(enemyUnitCopy);
    updateBoardPlayer(playerHeroCopy);

    const wasFullyParried =
      comboBroken || currentParriesLanded >= requiredParries;

    if (wasFullyParried) {
      // Posture / Stagger Progression
      const staggerMax = getEnemyStaggerThreshold(enemyUnitCopy);
      const currentStaggerCount = useBattleStore.getState().enemyStagger.current;
      const newStagger = currentStaggerCount + 1;

      if (newStagger >= staggerMax) {
        // POSTURE BROKEN! STAGGERED!
        setEnemyStagger({ current: 0, max: staggerMax, isStaggered: true });
        setPlayerActionsRemaining(2);
        addFloatingText({
          target: 'Enemy',
          text: 'POSTURE BROKEN! EXTRA TURN!',
          type: 'crit',
        });
        displayAnnouncer(
          playerHeroCopy,
          enemyUnitCopy,
          skillsIcons.defend,
          `POSTURE BROKEN! ${enemyUnitCopy.name} is Staggered! ${playerHeroCopy.name} gains an Extra Turn!`
        );
      } else {
        setEnemyStagger({ current: newStagger, max: staggerMax, isStaggered: false });
        addFloatingText({
          target: 'Enemy',
          text: `POSTURE ${newStagger}/${staggerMax}`,
          type: 'status',
        });
        displayAnnouncer(
          playerHeroCopy,
          enemyUnitCopy,
          intent.icon,
          isSpell
            ? `SPELL DEFLECTED! ${enemyUnitCopy.name}'s magic drained (-${spellCost} SP)!`
            : `PERFECT PARRY! ${playerHeroCopy.name} completely deflected ${intent.actionName}!`
        );
      }
    } else {
      // Enemy connected strikes: enemy posture recovers 1 point
      const currentStaggerCount = useBattleStore.getState().enemyStagger.current;
      setEnemyStagger({ current: Math.max(0, currentStaggerCount - 1) });
    }

    await waitTimer(1000);

    setEnemyIntent(null);
    updateAction('');
    setParryState({
      isWindowOpen: false,
      canParry: false,
      wasParried: false,
      parryAttempted: false,
      feedbackText: '',
      parriesLanded: 0,
      requiredParries: 1,
      comboBroken: false,
    });

    if (playerHeroCopy.health <= 0) {
      handlePlayerDeath(playerHeroCopy);
    } else {
      // Tick player statuses when turn returns to player
      tickUnitStatuses(playerHeroCopy);
      updateBoardPlayer(playerHeroCopy);
      updateTurn(); // Returns turn to Player
    }
  };

  const executePlayerAction = async (actionName: string) => {
    if (isResolvingRef.current) return;
    if (turn !== 'Player' || !isInFight) return;

    updateAction('');
    const actionDef = combatActions[actionName];
    if (!actionDef) {
      console.warn(`[Combat] Action "${actionName}" not found.`);
      return;
    }

    const currentEnemy = useBattleStore.getState().boardEnemy;
    const currentPlayer = useBattleStore.getState().boardPlayer;

    const validation = actionDef.canExecute(currentPlayer, currentEnemy, {
      healthPotions,
      manaPotions,
    });

    if (!validation.can) {
      soundEngine.playSfx(warning);
      displayAnnouncer(
        currentPlayer,
        currentPlayer,
        actionDef.cost.healthPotions
          ? ''
          : actionDef.name,
        validation.reason || 'Cannot use this action right now!'
      );
      return;
    }

    isResolvingRef.current = true;
    updatePhase('resolving');
    updateAction(actionName);

    // Handle potion consumption
    if (actionName === 'Potion Of Life') {
      updatePotion('healthPotions', -1);
    } else if (actionName === 'Potion Of Magic') {
      updatePotion('manaPotions', -1);
    }

    const playerCopy = { ...currentPlayer };
    const enemyCopy = { ...currentEnemy };

    const result = actionDef.execute(playerCopy, enemyCopy, true);

    playActionSound(actionName, playerCopy);
    if (result.damage) {
      if (enemyCopy.sounds?.hit) {
        soundEngine.playSfx(enemyCopy.sounds.hit);
      } else if (typeof enemyCopy.soundHitted === 'function') {
        enemyCopy.soundHitted();
      }
    }

    if (result.damage !== undefined && result.damage > 0) {
      if (result.isCritical) {
        triggerScreenShake('crit');
      } else if (result.damage >= 20) {
        triggerScreenShake('heavy');
      }

      addFloatingText({
        target: 'Enemy',
        text: result.isCritical
          ? `CRIT! -${Math.round(result.damage)}`
          : `-${Math.round(result.damage)}`,
        type: result.isCritical ? 'crit' : 'damage',
      });
    }

    if (result.healing !== undefined && result.healing > 0) {
      addFloatingText({
        target: 'Player',
        text: `+${Math.round(result.healing)} HP`,
        type: 'heal',
      });
    }

    updateBoardPlayer(playerCopy);
    updateBoardEnemy(enemyCopy);

    displayAnnouncer(
      playerCopy,
      actionDef.isSelfCast ? playerCopy : enemyCopy,
      result.icon,
      result.message
    );

    // Potions do not consume the player's turn
    const isPotion = actionName.startsWith('Potion');
    if (isPotion) {
      isResolvingRef.current = false;
      updatePhase('player_turn');
      updateAction('');
      return;
    }

    const currentActions = useBattleStore.getState().playerActionsRemaining;
    if (currentActions > 1) {
      setPlayerActionsRemaining(currentActions - 1);
      addFloatingText({
        target: 'Player',
        text: '1 TURN REMAINING',
        type: 'status',
      });
      await waitTimer(1200);

      if (enemyCopy.health <= 0) {
        await handleEnemyDeath(enemyCopy);
        isResolvingRef.current = false;
        updateAction('');
        return;
      }

      isResolvingRef.current = false;
      updatePhase('player_turn');
      updateAction('');
      return;
    }

    // Final or single player action resolved
    await waitTimer(1200);

    if (enemyCopy.health <= 0) {
      await handleEnemyDeath(enemyCopy);
      isResolvingRef.current = false;
      updateAction('');
      return;
    }

    // Posture break advantage consumed; clear staggered status
    if (useBattleStore.getState().enemyStagger.isStaggered) {
      setEnemyStagger({ isStaggered: false, current: 0 });
    }

    // Switch to Enemy's turn
    updateTurn();
    await runEnemyTurn(enemyCopy, playerCopy);
    isResolvingRef.current = false;
    updateAction('');
  };

  const isDeathblowEligible =
    isInFight &&
    turn === 'Player' &&
    phase === 'player_turn' &&
    boardEnemy.health > 0 &&
    enemyStagger.isStaggered &&
    boardEnemy.health <= Math.max(15, Math.ceil(boardEnemy.maxHealth * 0.25));

  const executeDeathblow = async () => {
    if (!isInFight || isResolvingRef.current) return;
    const enemy = { ...useBattleStore.getState().boardEnemy };
    const player = { ...useBattleStore.getState().boardPlayer };
    if (!enemy || enemy.health <= 0) return;

    isResolvingRef.current = true;
    updatePhase('resolving');
    updateAction('Deathblow');

    triggerScreenShake('deathblow');
    soundEngine.playSfx(swordSound);
    if (enemy.sounds?.hit) {
      soundEngine.playSfx(enemy.sounds.hit);
    } else if (typeof enemy.soundHitted === 'function') {
      enemy.soundHitted();
    }

    const healAmount = 10;
    const spAmount = 2;
    const bonusGold = 25;

    player.health = Math.min(player.maxHealth, player.health + healAmount);
    player.magic = Math.min(player.maxMagic, player.magic + spAmount);
    updateBoardPlayer(player);
    updatePlayerVitals(player.health, player.magic);
    updateGold(bonusGold);

    addFloatingText({
      target: 'Player',
      text: `+${healAmount} HP +${spAmount} SP`,
      type: 'heal',
    });
    addFloatingText({
      target: 'Enemy',
      text: 'EXECUTION! DEATHBLOW!',
      type: 'crit',
    });

    displayAnnouncer(
      player,
      enemy,
      skillsIcons.attack,
      `A DECISIVE EXECUTION! ${player.name} executes ${enemy.name}! (+${bonusGold} Gold, +${healAmount} HP, +${spAmount} SP)`
    );

    enemy.health = 0;
    updateBoardEnemy(enemy);

    await waitTimer(1000);
    await handleEnemyDeath(enemy);
    isResolvingRef.current = false;
    updateAction('');
  };

  // Preload combat SFX so parries and impacts respond with zero latency
  useEffect(() => {
    soundEngine.preloadSfx([parrySound, swordSound, warning, spelldefend]);
  }, []);

  // Keyboard shortcut listener: Spacebar to parry, 1-4 for skills, Q/E for potions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text fields
      const targetTag = (e.target as HTMLElement)?.tagName;
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return;

      if (e.code === 'Space' && phase === 'enemy_telegraph') {
        e.preventDefault();
        attemptParry();
        return;
      }

      if (phase === 'player_turn' && turn === 'Player' && isInFight) {
        if (
          (e.key === 'f' || e.key === 'F') &&
          boardEnemy.health > 0 &&
          enemyStagger.isStaggered &&
          boardEnemy.health <= Math.max(15, Math.ceil(boardEnemy.maxHealth * 0.25))
        ) {
          e.preventDefault();
          executeDeathblow();
          return;
        }

        const skills = boardPlayer.skills || [];
        if (e.key === '1' && skills[0]) {
          e.preventDefault();
          executePlayerAction(skills[0].name);
        } else if (e.key === '2' && skills[1]) {
          e.preventDefault();
          executePlayerAction(skills[1].name);
        } else if (e.key === '3' && skills[2]) {
          e.preventDefault();
          executePlayerAction(skills[2].name);
        } else if (e.key === '4' && skills[3]) {
          e.preventDefault();
          executePlayerAction(skills[3].name);
        } else if (e.key === 'q' || e.key === 'Q') {
          e.preventDefault();
          executePlayerAction('Potion Of Life');
        } else if (e.key === 'e' || e.key === 'E') {
          e.preventDefault();
          executePlayerAction('Potion Of Magic');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, turn, isInFight, boardPlayer, boardEnemy, enemyStagger, attemptParry, executeDeathblow]);


  return {
    isInFight,
    turn,
    phase,
    enemyIntent,
    parryState,
    boardEnemy,
    boardPlayer,
    executePlayerAction,
    attemptParry,
    isDeathblowEligible,
    executeDeathblow,
  };
};
