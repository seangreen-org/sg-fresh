import { useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime';

interface Tree {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  rotation: number;
  opacity: number;
}

const rotationColorMap = {
  green: 0,
  blue: 70,
  pink: 150,
  red: 230,
  orange: 260,
};

type ColorName = keyof typeof rotationColorMap;
const colorNames = Object.keys(rotationColorMap) as ColorName[];

const baseTrees: Tree[] = [
  {
    x: 120,
    y: 0,
    width: 5,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: -14,
    opacity: 0.8,
  },
  {
    x: 138,
    y: 0,
    width: 4,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: -10,
    opacity: 0.8,
  },
  {
    x: 155,
    y: 0,
    width: 3,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: -5,
    opacity: 0.8,
  },
  {
    x: 172,
    y: 0,
    width: 5,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: -2,
    opacity: 0.8,
  },
  {
    x: 200,
    y: 0,
    width: 4,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: 3,
    opacity: 0.8,
  },
  {
    x: 218,
    y: 0,
    width: 6,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: 6,
    opacity: 0.8,
  },
  {
    x: 235,
    y: 0,
    width: 4,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: 9,
    opacity: 0.8,
  },
  {
    x: 260,
    y: 0,
    width: 4,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: 12,
    opacity: 0.8,
  },
  {
    x: 280,
    y: 0,
    width: 5,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: 10,
    opacity: 0.8,
  },
  {
    x: 300,
    y: 0,
    width: 4,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: 7,
    opacity: 0.8,
  },
  {
    x: 320,
    y: 0,
    width: 5,
    height: 500,
    fill: 'url(#purpleGrad1)',
    rotation: 4,
    opacity: 0.8,
  },
  {
    x: 345,
    y: 0,
    width: 3,
    height: 500,
    fill: 'url(#purpleGrad2)',
    rotation: 0,
    opacity: 0.8,
  },
  {
    x: 105,
    y: 0,
    width: 18,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: -13,
    opacity: 0.9,
  },
  {
    x: 130,
    y: 0,
    width: 20,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: -11,
    opacity: 0.9,
  },
  {
    x: 150,
    y: 0,
    width: 25,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: -8,
    opacity: 0.88,
  },
  {
    x: 170,
    y: 0,
    width: 16,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: -6,
    opacity: 0.9,
  },
  {
    x: 185,
    y: 0,
    width: 20,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: -3,
    opacity: 0.9,
  },
  {
    x: 195,
    y: 0,
    width: 24,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: -1,
    opacity: 0.92,
  },
  {
    x: 210,
    y: 0,
    width: 18,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: 1,
    opacity: 0.88,
  },
  {
    x: 225,
    y: 0,
    width: 22,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: 4,
    opacity: 0.9,
  },
  {
    x: 243,
    y: 0,
    width: 20,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: 6,
    opacity: 0.85,
  },
  {
    x: 255,
    y: 0,
    width: 14,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: 8,
    opacity: 0.88,
  },
  {
    x: 275,
    y: 0,
    width: 24,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: 11,
    opacity: 0.85,
  },
  {
    x: 290,
    y: 0,
    width: 16,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: 9,
    opacity: 0.8,
  },
  {
    x: 310,
    y: 0,
    width: 20,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: 6,
    opacity: 0.82,
  },
  {
    x: 330,
    y: 0,
    width: 18,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: 2,
    opacity: 0.85,
  },
  {
    x: 350,
    y: 0,
    width: 22,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: -1,
    opacity: 0.8,
  },
  {
    x: 370,
    y: 0,
    width: 15,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: -4,
    opacity: 0.8,
  },
  {
    x: 388,
    y: 0,
    width: 20,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: -7,
    opacity: 0.78,
  },
  {
    x: 405,
    y: 0,
    width: 16,
    height: 500,
    fill: 'url(#greenGrad3)',
    rotation: -9,
    opacity: 0.8,
  },
  {
    x: 420,
    y: 0,
    width: 22,
    height: 500,
    fill: 'url(#greenGrad1)',
    rotation: -12,
    opacity: 0.8,
  },
  {
    x: 435,
    y: 0,
    width: 15,
    height: 500,
    fill: 'url(#greenGrad2)',
    rotation: -14,
    opacity: 0.8,
  },
];

export default function Heart(): JSX.Element {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = async () => {
    const nextIndex = (currentColorIndex + 1) % colorNames.length;
    setCurrentColorIndex(nextIndex);

    const colorName = colorNames[nextIndex];
    // @ts-ignore: umami analytics global object
    globalThis.umami.track(`heart-click-${colorName}`);

    try {
      await fetch('/api/hue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: colorName }),
      });
    } catch (error) {
      console.error('Failed to update color:', error);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        viewBox='50 20 400 380'
        style={{
          transformOrigin: 'center center',
          maxWidth: '75%',
          maxHeight: '75%',
          display: 'block',
          filter: `hue-rotate(${
            rotationColorMap[colorNames[currentColorIndex]]
          }deg)`,
          cursor: 'pointer',
          transform: 'scale(1)',
          animation: isHovered ? 'heartbeat 1.5s ease-in-out infinite' : 'none',
          transition: 'all 0.3s ease-out',
        }}
        role='button'
        aria-label='Interactive heart that changes color when clicked'
      >
        <defs>
          <linearGradient id='magicGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%'>
              <animate
                attributeName='stop-color'
                values='#169B62;#1AA66E;#0E8BA0;#4B0082;#169B62'
                dur='3s'
                repeatCount='indefinite'
              />
            </stop>
            <stop offset='100%'>
              <animate
                attributeName='stop-color'
                values='#0C5A38;#0F5D3B;#622B7E;#4B0082;#0C5A38'
                dur='3s'
                repeatCount='indefinite'
              />
            </stop>
          </linearGradient>

          <clipPath id='heartClip'>
            <path d='
                M 250,80
                C 220,20, 140,20, 110,80
                C 50,180, 150,300, 250,380
                C 350,300, 450,180, 390,80
                C 360,20, 280,20, 250,80
                Z
              ' />
          </clipPath>

          <linearGradient id='greenGrad1' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#169B62' />
            <stop offset='100%' stop-color='#0C5A38' />
          </linearGradient>
          <linearGradient id='greenGrad2' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#1B9D64' />
            <stop offset='100%' stop-color='#0E5937' />
          </linearGradient>
          <linearGradient id='greenGrad3' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#1AA66E' />
            <stop offset='100%' stop-color='#0F5D3B' />
          </linearGradient>
          <linearGradient id='purpleGrad1' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#9A00FF' />
            <stop offset='100%' stop-color='#4B0082' />
          </linearGradient>
          <linearGradient id='blueToGreen' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#1AA66E' />
            <stop offset='100%' stop-color='#0E8BA0' />
          </linearGradient>
          <linearGradient id='purpleToBlue' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stop-color='#4B0082' />
            <stop offset='100%' stop-color='#0E8BA0' />
          </linearGradient>

          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feDropShadow
              dx='0'
              dy='0'
              stdDeviation='10'
              flood-color='#0EE584'
              flood-opacity='0.7'
            />
          </filter>
        </defs>

        <g clip-path='url(#heartClip)' filter='url(#glow)'>
          <g className='forest-group'>
            {baseTrees.map((tree, index) => (
              <rect
                key={index}
                x={tree.x}
                y={tree.y}
                width={tree.width}
                height={tree.height}
                fill={tree.fill}
                opacity={tree.opacity}
                style={{
                  transformOrigin: '250px 250px',
                  transform: 'rotate(var(--rotation))',
                  '--rotation': `${tree.rotation}deg`,
                }}
              />
            ))}
          </g>
        </g>

        <path
          d='
            M 250,80
            C 220,20, 140,20, 110,80
            C 50,180, 150,300, 250,380
            C 350,300, 450,180, 390,80
            C 360,20, 280,20, 250,80
            Z
          '
          className='interactive-heart'
          fill='transparent'
          stroke='#0EE584'
          filter='url(#glow)'
          style={{ pointerEvents: 'all' }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </svg>
    </>
  );
}
