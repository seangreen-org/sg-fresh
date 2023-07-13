import useEmojiAnimation, { getRandomInt } from '../hooks/useEmojiAnimation.js';
import LaserWaveform from './LaserWaveform.jsx';
import rotationColorMap from '../support/rotationColorMap.js';

const emojis = [
  '🐺',
  '🐺',
  '🐺',
  '🐺',
  '🦴',
  '🍖',
  '🐶',
  '🐕',
  '🦮',
  '🐕‍🦺',
  '🐩',
  '🐺',
  '🐺',
  '🐺',
  '🐺',
  '🦊',
  '🐺🐺',
  '🐺🐺',
  '🐾',
];

export default function Wolf(props) {
  const {
    currentEmoji,
    color,
    rotation,
    shadowHsl,
    shadowSpread,
    beat,
    scale,
    audioAnalyserRef,
    toggleSong,
  } = useEmojiAnimation(
    emojis,
    props.color,
    props.rotation,
    props.prefix,
    '/music/hungry-like-the-wolf.mp3'
  );

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
            ? `0 0 ${shadowSpread}vmin hsl(${shadowHsl}, 100%, 50%)`
            : `0 0 2vmin #aaa`,
          filter: `hue-rotate(${rotation || rotationColorMap[color]}deg)`,
          transform: `scale(${1 + scale / 128})`,
          transition: `filter ${scale ? 0.2 : 1}s ease-in-out, font-size .5s`,
        }}
        onClick={toggleSong}
      >
        {currentEmoji}
      </button>
      <LaserWaveform audioAnalyserRef={audioAnalyserRef} />
    </>
  );
}
