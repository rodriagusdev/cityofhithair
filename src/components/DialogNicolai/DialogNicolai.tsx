import React, { useEffect } from 'react';
import { Dialog } from '../Dialog';
import { useDialogStore } from '../../stores';

export const DialogNicolai: React.FC = () => {
  const startDialog = useDialogStore((state) => state.startDialog);

  useEffect(() => {
    startDialog('nicolai');
  }, [startDialog]);

  return <Dialog />;
};

export default DialogNicolai;
