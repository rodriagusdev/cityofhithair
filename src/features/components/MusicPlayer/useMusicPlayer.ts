import { useEffect, useState } from 'react';
import { soundEngine } from '../../../services/soundEngine';

interface Props {
  track: string;
}

export const useMusicPlayer = ({ track }: Props) => {
  const [musicIsPlaying, setMusicIsPlaying] = useState(true);

  useEffect(() => {
    if (track && musicIsPlaying) {
      soundEngine.playMusic(track);
    }
  }, [track, musicIsPlaying]);

  const handleOnClick = () => {
    if (musicIsPlaying) {
      soundEngine.pauseMusic();
      setMusicIsPlaying(false);
    } else {
      if (track) {
        soundEngine.playMusic(track);
      } else {
        soundEngine.resumeMusic();
      }
      setMusicIsPlaying(true);
    }
  };

  return { musicIsPlaying, handleOnClick };
};
