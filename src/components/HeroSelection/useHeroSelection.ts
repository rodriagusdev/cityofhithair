import { useSpring } from '@react-spring/web';
import { useState } from 'react';
import { useAnnouncerStore, usePlayerStore } from '../../stores';

export const useHeroSelection = () => {
  const [selectNameIsVisible, setSelectNameIsVisible] = useState(false);
  const { updateClass } = usePlayerStore();
  const isPreviewVisible = useAnnouncerStore((state) => state.isPreviewVisible);

  const animationProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const getSelected = (chosenClass: string) => {
    setSelectNameIsVisible((current) => !current);
    updateClass(chosenClass);
  };

  return { selectNameIsVisible, isPreviewVisible, animationProps, getSelected };
};

export default useHeroSelection;
