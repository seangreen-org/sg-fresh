import { useEffect, useState } from 'preact/hooks';
import rotationColorMap from '../support/rotationColorMap.js';

function getRandomColor() {
  const keys = Object.keys(rotationColorMap);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Heart({
  color: initialColor = Object.keys(rotationColorMap)[1],
  emoji = '💚',
  prefix = '',
}) {
  const [color, setColor] = useState(initialColor);
  const [beat, setBeat] = useState(false);
  const [audio, setAudio] = useState();

  const isOrgasm = () => color === 'asm';

  useEffect(() => {
    const historyListener = addEventListener('popstate', (event) => {
      setColor(event.state?.color);
    });

    return () => {
      removeEventListener('popstate', historyListener);
    };
  }, []);

  useEffect(() => {
    fetch('/api/hue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color }),
    });
  }, [color]);

  function randomize() {
    const newColor = getRandomColor();
    if (color === newColor) {
      randomize();
    } else {
      setColor(newColor);
      setBeat(!beat);
      pushHistory(newColor);
    }
  }

  function pushHistory(newColor) {
    const url = `/${prefix ? `${prefix}/${newColor}` : newColor}`;
    window.history.pushState({ color: newColor }, newColor, url);
  }

  function toggleSong() {
    if (!audio) {
      const song = new Audio('/music/inside-my-love.mp3');
      song.play();
      setAudio(song);
    } else if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }

    setBeat(!beat);
  }

  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: beat ? `${25 + getRandomInt(10, 0)}vw` : '15vw',
        textShadow: `0 0 2vmin #aaa`,
        filter: `hue-rotate(${rotationColorMap[color]}deg)`,
        transition: 'filter 1s ease-in-out, font-size .5s',
      }}
      onClick={isOrgasm() ? toggleSong : randomize}
    >
      {isOrgasm() ? '😘' : emoji}
    </button>
  );
}
