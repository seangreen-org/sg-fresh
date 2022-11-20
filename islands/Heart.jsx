import { useState } from 'preact/hooks';
import { getRandomInt } from '../util.js';

export default function Heart(props) {
  const [hue, setHue] = useState(props.hue || 0);
  const [beat, setBeat] = useState(false);

  function transform() {
    const hue = getRandomInt(360, 0);
    setHue(hue);
    setBeat(!beat)

    // !! why cant i read a post body in fresh on the api side?
    fetch(`/api/hue?rotation=${hue}`);
  }

  return (
    <button
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: beat ? `${25 + getRandomInt(10, 0)}vw` : '15vw',
        textShadow: `0 0 2vmin #aaa`,
        filter: `hue-rotate(${hue}deg)`,
        transition: 'filter 1s ease-in-out, font-size .5s',
      }}
      onClick={transform}
    >
      💚
    </button>
  );
}
