import { useEffect, useState, useRef } from 'preact/hooks';
import LaserWaveform from './LaserWaveform.jsx';
import rotationColorMap from '../support/rotationColorMap.js';

function getRandomColor() {
  const keys = Object.keys(rotationColorMap);
  return keys[Math.floor(Math.random() * keys.length)];
}

function getRandomInt(min = Math.ceil(min), max = Math.foor(max)) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function Heart({
  color: initialColor = Object.keys(rotationColorMap)[0],
  rotation: initialRotation = 0,
  initialEmoji = '💚',
  prefix = '',
}) {
  const [emoji, setEmoji] = useState(initialEmoji);
  const [color, setColor] = useState(initialColor);
  const [rotation, setRotation] = useState(initialRotation);
  const [shadowHsl, setShadowHsl] = useState();
  const [beat, setBeat] = useState(false);
  const [audioBeatCount, setAudioBeatCount] = useState(0);
  const [scale, setScale] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const audioAnalyserRef = useRef();
  const animationRef = useRef();

  const isOrgasm = () => color === 'asm';

  if (isOrgasm() && emoji === initialEmoji) {
    setEmoji('😘');
  }

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

  useEffect(() => {
    const animateEmojiToMusic = () => {
      const beatThreshold = 100;
      const emojis = [
        '🕺🏻',
        '💃🏻',
        '🪩',
        '❤️‍🔥',
        '💖',
        '🐕',
        '🫨',
        '🫠',
        '❤️',
        '💚',
        '💛',
        '💜',
        '💝',
        '🧡',
        '🩷',
      ];
      const bufferLength = audioAnalyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      animationRef.current = requestAnimationFrame(animateEmojiToMusic);
      audioAnalyserRef.current.getByteFrequencyData(dataArray);

      const averageFrequency = getAverage(dataArray);
      const rotation = (averageFrequency / 128) * 360 + 69;
      setRotation(Math.min(rotation, 360));
      setScale(averageFrequency);
      setShadowHsl(Math.round((averageFrequency / 255) * 360));

      if (averageFrequency > beatThreshold) {
        setAudioBeatCount((prevBeatCount) => {
          if (prevBeatCount >= 256) {
            setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
            return 0;
          } else {
            return prevBeatCount + 1;
          }
        });
      }
    };

    if (playing && audioRef.current && audioAnalyserRef.current) {
      animateEmojiToMusic();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [playing, audioBeatCount]);

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
    if (!audioRef.current) {
      const song = new Audio('/music/inside-my-love.mp3');
      song.play();
      audioRef.current = song;
      audioAnalyserRef.current = createAudioAnalyser(audioRef.current);
      setPlaying(true);
    } else if (audioRef.current.paused) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }

    setBeat(!beat);
  }

  function createAudioAnalyser() {
    const audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 32;

    const audioSource = audioContext.createMediaElementSource(audioRef.current);
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    return analyser;
  }

  const getAverage = (data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    return avg;
  };

  return (
    <>
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: scale
            ? '15vw'
            : beat
            ? `${25 + getRandomInt(10, 0)}vw`
            : '15vw',
          textShadow: shadowHsl
            ? `0 0 2vmin hsl(${shadowHsl}, 100%, 50%)`
            : `0 0 2vmin #aaa`,
          filter: `hue-rotate(${rotation || rotationColorMap[color]}deg)`,
          transform: `scale(${1 + scale / 128})`,
          transition: `filter ${scale ? 0.2 : 1}s ease-in-out, font-size .5s`,
        }}
        onClick={isOrgasm() ? toggleSong : randomize}
      >
        {emoji}
      </button>
      {isOrgasm() && <LaserWaveform audioAnalyserRef={audioAnalyserRef} />}
    </>
  );
}
