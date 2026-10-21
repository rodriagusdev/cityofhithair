import {
  dialogMarion,
  dialogMerchant,
  dialogKnight,
} from '../../data/general/dialogTexts';
import { useDialogStore } from '../../stores';

export const useGetDialogOptions = () => {
  const { updateDialogText } = useDialogStore();

  const dialogHithair = () => {
    updateDialogText(dialogMarion.hithair);
  };

  const dialogEvil = () => {
    updateDialogText(dialogMarion.evil);
  };

  const dialogTamoe = () => {
    updateDialogText(dialogMarion.tamoe);
  };

  const dialogDungeons = () => {
    updateDialogText(dialogMarion.dungeons);
  };

  const dialogWanderer = () => {
    updateDialogText(dialogMarion.wanderer);
  };

  const dialogDarkKnights = () => {
    updateDialogText(dialogMarion.darkknights);
  };

  const dialogWhoMerchant = () => {
    updateDialogText(dialogMarion.merchant);
  };

  const marion = [
    { createDialog: dialogHithair, text: 'Hithair' },
    { createDialog: dialogEvil, text: 'Ancient Evil' },
    { createDialog: dialogTamoe, text: 'Tamoé' },
    { createDialog: dialogDungeons, text: 'Dungeons' },
    { createDialog: dialogWanderer, text: 'Wanderer' },
    { createDialog: dialogDarkKnights, text: 'Dark Knights' },
    { createDialog: dialogWhoMerchant, text: 'Merchant' },
  ];

  const dialogItems = () => {
    updateDialogText(dialogMerchant.items);
  };

  const dialogMoney = () => {
    updateDialogText(dialogMerchant.money);
  };

  const merchant = [
    { createDialog: dialogItems, text: 'Items' },
    { createDialog: dialogMoney, text: 'Money' },
  ];

  const dialogDungeonsKnight = () => {
    updateDialogText(dialogKnight.dungeons);
  };

  const dialogCannibal = () => {
    updateDialogText(dialogKnight.cannibal);
  };

  const knight = [
    { createDialog: dialogDungeonsKnight, text: 'Dungeons' },
    { createDialog: dialogCannibal, text: 'The Cannibal' },
  ];

  return {
    merchant,
    marion,
    knight,
  };
};

export default useGetDialogOptions;
