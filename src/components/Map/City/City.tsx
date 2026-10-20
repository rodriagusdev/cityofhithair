import { Dialog } from '../../Dialog';
import { useDialogStore } from '../../../stores';
import { Centerer } from '../../Centerer';
import { cityNPCs } from '../../../data/npc';
import { Npc } from '../../NPC';
import { useGetDialogOptions } from '../../../features/components/Dialog';

const City = () => {
  const { marion, merchant, knight } = useGetDialogOptions();
  const isInDialog = useDialogStore((state) => state.isInDialog);
  const options = [marion, merchant, knight];

  return (
    <div className="relative flex flex-row items-center justify-around w-full h-full flex-1 self-stretch p-6">
      {cityNPCs.map((NPC, index) => (
        <Npc key={index} NPC={{ ...NPC, dialogOptions: options[index] }} />
      ))}

      {isInDialog && (
        <Centerer>
          <Dialog />
        </Centerer>
      )}
    </div>
  );
};

export default City;
