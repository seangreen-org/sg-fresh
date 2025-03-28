import type { JSX } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import sendHueRequest from "@serivces/sendHueRequest.ts";
import {
  type ColorName,
  colorNames,
  rotationColorMap,
} from "../data/colors.ts";
import trees from "@/data/trees.ts";

interface HeartProps {
  initialColor?: string;
}

export default function Heart({
  initialColor = Object.keys(rotationColorMap)[0],
}: HeartProps): JSX.Element {
  const [currentColorIndex, setCurrentColorIndex] = useState(() => {
    const index = colorNames.indexOf(initialColor as ColorName);
    return index >= 0 ? index : 0;
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const sendDefaultColorHueRequest = async () => {
      const colorName = colorNames[currentColorIndex];
      await sendHueRequest(colorName);
    };
    sendDefaultColorHueRequest();
  }, []);

  const handleClick = async () => {
    const nextIndex = (currentColorIndex +
      Math.floor(Math.random() * (colorNames.length - 1)) +
      1) %
      colorNames.length;
    setCurrentColorIndex(nextIndex);

    const colorName = colorNames[nextIndex];
    await sendHueRequest(colorName);

    // @ts-ignore: umami analytics global object
    globalThis.umami.track(`heart-click-${colorName}`);
    globalThis.history.replaceState(null, "", `/${colorName}`);
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
      <svg data-testId="heart">
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="50 20 400 380"
        style={{
          transformOrigin: "center center",
          maxWidth: "75%",
          maxHeight: "75%",
          display: "block",
          filter: `hue-rotate(${
            rotationColorMap[colorNames[currentColorIndex]]
          }deg)`,
          transform: "scale(1)",
          animation: isHovered ? "heartbeat 1.5s ease-in-out infinite" : "none",
          transition: "all 0.3s ease-out",
        }}
        role="button"
        aria-label="Interactive heart that changes color when clicked"
      >
        <defs>
          <linearGradient id="magicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%">
              <animate
                attributeName="stop-color"
                values="#169B62;#1AA66E;#0E8BA0;#4B0082;#169B62"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%">
              <animate
                attributeName="stop-color"
                values="#0C5A38;#0F5D3B;#622B7E;#4B0082;#0C5A38"
                dur="3s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          <clipPath id="heartClip">
            <path d="
                M 250,80
                C 220,20, 140,20, 110,80
                C 50,180, 150,300, 250,380
                C 350,300, 450,180, 390,80
                C 360,20, 280,20, 250,80
                Z
              " />
          </clipPath>

          <linearGradient id="greenGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#169B62" />
            <stop offset="100%" stop-color="#0C5A38" />
          </linearGradient>
          <linearGradient id="greenGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1B9D64" />
            <stop offset="100%" stop-color="#0E5937" />
          </linearGradient>
          <linearGradient id="greenGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1AA66E" />
            <stop offset="100%" stop-color="#0F5D3B" />
          </linearGradient>
          <linearGradient id="purpleGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#9A00FF" />
            <stop offset="100%" stop-color="#4B0082" />
          </linearGradient>
          <linearGradient id="blueToGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1AA66E" />
            <stop offset="100%" stop-color="#0E8BA0" />
          </linearGradient>
          <linearGradient id="purpleToBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#4B0082" />
            <stop offset="100%" stop-color="#0E8BA0" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              flood-color="#0EE584"
              flood-opacity="0.7"
            />
          </filter>
        </defs>

        <g clip-path="url(#heartClip)" filter="url(#glow)">
          <g className="forest-group">
            {trees.map((tree, index) => (
              <rect
                key={index}
                x={tree.x}
                y={tree.y}
                width={tree.width}
                height={tree.height}
                fill={tree.fill}
                opacity={tree.opacity}
                style={{
                  transformOrigin: "250px 250px",
                  transform: "rotate(var(--rotation))",
                  "--rotation": `${tree.rotation}deg`,
                }}
              />
            ))}
          </g>
        </g>

        <path
          d="
            M 250,80
            C 220,20, 140,20, 110,80
            C 50,180, 150,300, 250,380
            C 350,300, 450,180, 390,80
            C 360,20, 280,20, 250,80
            Z
          "
          className="interactive-heart"
          fill="transparent"
          stroke="#0EE584"
          filter="url(#glow)"
          style={{
            pointerEvents: "all",
            cursor: "pointer",
          }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </svg>
    </>
  );
}
