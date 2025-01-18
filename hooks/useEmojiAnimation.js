import { useEffect, useState, useRef } from 'preact/hooks';
import rotationColorMap from '../support/rotationColorMap.js';

function getRandomColor() {
  const keys = Object.keys(rotationColorMap);
  return keys[Math.floor(Math.random() * keys.length)];
}

export function getRandomInt(min = Math.ceil(min), max = Math.foor(max)) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function useEmojiAnimation(
  emojis,
  initialColor = Object.keys(rotationColorMap)[0],
  initialRotation,
  prefix,
  audioFile
) {
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [color, setColor] = useState(initialColor);
  const [rotation, setRotation] = useState(initialRotation);
  const [shadowHsl, setShadowHsl] = useState();
  const [shadowSpread, setShadowSpread] = useState(2);
  const [beat, setBeat] = useState(false);
  const [audioBeatCount, setAudioBeatCount] = useState(0);
  const [scale, setScale] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();
  const audioAnalyserRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const historyListener = addEventListener('popstate', (event) => {
      setColor(event.state?.color);
    });

    return () => {
      removeEventListener('popstate', historyListener);
    };
  }, []);

  useEffect(() => {
    const animateEmojiToMusic = () => {
      const beatThreshold = 100;

      const bufferLength = audioAnalyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      animationRef.current = requestAnimationFrame(animateEmojiToMusic);
      audioAnalyserRef.current.getByteFrequencyData(dataArray);

      const averageFrequency = getAverage(dataArray);
      const rotation = (averageFrequency / 128) * 360 + 69;
      setRotation(Math.min(rotation, 360));
      setScale(averageFrequency);
      setShadowHsl(Math.round((averageFrequency / 255) * 360));
      setShadowSpread(Math.round(averageFrequency / 15));

      const songProgress =
        audioRef.current.currentTime / audioRef.current.duration;

      if (songProgress > 0.06 && averageFrequency > beatThreshold) {
        setAudioBeatCount((prevBeatCount) => {
          const beatCountThreshold = 256 - songProgress * 20;

          if (prevBeatCount >= beatCountThreshold) {
            setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
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
    const newPath = `/2024/${newColor}`;

    globalThis.history.pushState({ color: newColor }, newColor, newPath);
  }

  function toggleSong() {
    if (!audioRef.current) {
      const song = new Audio(audioFile);
      audioRef.current = song;
      audioAnalyserRef.current = createAudioAnalyser(audioRef.current);

      let volume = 0;
      song.volume = volume;
      song.play();
      setPlaying(true);

      const interval = setInterval(() => {
        volume = Math.min(volume + 0.02, 1);
        song.volume = volume;

        if (volume >= 1) {
          clearInterval(interval);
        }
      }, 5);
    } else if (audioRef.current.paused) {
      let volume = 0;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setPlaying(true);

      const interval = setInterval(() => {
        volume = Math.min(volume + 0.02, 1);
        audioRef.current.volume = volume;

        if (volume >= 1) {
          clearInterval(interval);
        }
      }, 5);
    } else {
      let volume = 1;
      audioRef.current.volume = volume;

      const interval = setInterval(() => {
        volume = Math.max(volume - 0.02, 0);
        audioRef.current.volume = volume;

        if (volume <= 0) {
          clearInterval(interval);
          audioRef.current.pause();
        }
      }, 5);
      setPlaying(false);
    }
    setBeat(!beat);
  }

  function createAudioAnalyser() {
    const audioContext = new globalThis.AudioContext();
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

  return {
    currentEmoji,
    setCurrentEmoji,
    color,
    rotation,
    shadowHsl,
    shadowSpread,
    beat,
    scale,
    playing,
    audioRef,
    audioAnalyserRef,
    randomize,
    toggleSong,
  };
}
