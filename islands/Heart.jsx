import { useEffect } from 'preact/hooks';
import useEmojiAnimation, { getRandomInt } from '../hooks/useEmojiAnimation.js';
import LaserWaveform from './LaserWaveform.jsx';
import rotationColorMap from '../support/rotationColorMap.js';
import emojis from '../support/emojis.js';

export default function Heart(props) {
  const {
    currentEmoji,
    setCurrentEmoji,
    color,
    rotation,
    shadowHsl,
    shadowSpread,
    beat,
    scale,
    audioAnalyserRef,
    randomize,
    toggleSong,
  } = useEmojiAnimation(
    emojis,
    props.color,
    props.rotation,
    props.prefix,
    '/music/inside-my-love.mp3'
  );

  useEffect(() => {
    fetch('/api/hue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color }),
    });
  }, [color]);

  function isOrgasm() {
    return color === 'asm';
  }

  if (isOrgasm() && currentEmoji === emojis[0]) {
    setCurrentEmoji('❤️‍🔥');
  } else if (props.emoji) {
    setCurrentEmoji(props.emoji)
  }

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
        onClick={isOrgasm() ? toggleSong : randomize}
      >
        {currentEmoji}
      </button>
      {isOrgasm() && <LaserWaveform audioAnalyserRef={audioAnalyserRef} />}
    </>
  );
}
