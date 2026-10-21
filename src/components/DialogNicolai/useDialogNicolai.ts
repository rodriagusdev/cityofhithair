import { useState } from 'react';
import { dialogNicolai } from '../../data/general';

export const useDialogNicolai = () => {
  const [text, setText] = useState('');
  const [name, setName] = useState('Nicolai');
  const [visible, setVisible] = useState(false);

  const dialogWho = () => {
    setText(dialogNicolai.nicolai);
    if (name === 'Nicolai') {
      setName('Modra-Urmir');
    }
  };

  const dialogWhat = () => {
    setText(dialogNicolai.nature);
  };

  const dialogOfMe = () => {
    setText(dialogNicolai.ofMe);
  };

  const dialogJoin = () => {
    setText(dialogNicolai.join);
    setVisible((v) => !v);
  };

  return {
    text,
    name,
    visible,
    dialogJoin,
    dialogWho,
    dialogOfMe,
    dialogWhat,
  };
};

export default useDialogNicolai;
