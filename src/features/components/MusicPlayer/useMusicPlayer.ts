import { useEffect, useState } from 'react';
import { soundEngine } from '../../../services/soundEngine';

interface Props {
  track: string;
}

export const useMusicPlayer = ({ track }: Props) => {
  const [musicIsPlaying, setMusicIsPlaying] = useState(() => soundEngine.isMusicPlaying());

  useEffect(() => {
    const unsubscribe = soundEngine.subscribeMusic((isPlaying) => {
      setMusicIsPlaying(isPlaying);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (track) {
      soundEngine.playMusic(track);
    }
  }, [track]);

  const handleOnClick = () => {
    soundEngine.toggleMusic();
  };

  return { musicIsPlaying, handleOnClick };
};
