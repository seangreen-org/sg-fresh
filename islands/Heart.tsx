import type { JSX } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import sendHueRequest from "@serivces/sendHueRequest.ts";
import { colorNames, type HeartColor, rotationColorMap } from "@data/colors.ts";
import trees from "@data/trees.ts";

interface HeartProps {
  initialColor?: string;
}

export default function Heart({
  initialColor = Object.keys(rotationColorMap)[0],
}: HeartProps): JSX.Element {
  const [currentColorIndex, setCurrentColorIndex] = useState(() => {
    const index = colorNames.indexOf(initialColor as HeartColor);
    return index >= 0 ? index : 0;
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const sendDefaultColorHueRequest = async () => {
      await sendHueRequest(colorNames[currentColorIndex]);
    };
    sendDefaultColorHueRequest();
  }, []);

  const handleClick = () => {
    const nextIndex = (currentColorIndex +
      Math.floor(Math.random() * (colorNames.length - 1)) +
      1) %
      colorNames.length;
    setCurrentColorIndex(nextIndex);

    const colorName = colorNames[nextIndex];
    sendHueRequest(colorName);

    // @ts-ignore: umami analytics global object
    globalThis.umami.track(`heart-click-${colorName}`);
    globalThis.history.replaceState(null, "", `/${colorName}`);
  };

  return (
    <>
      <style>
        {`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.05); }
            28% { transform: scale(1); }
            42% { transform: scale(1.08); }
            70% { transform: scale(1); }
          }

          @keyframes glitch {
            0%, 90%, 100% { transform: translate(0) skew(0deg); }
            92% { transform: translate(-2px, 1px) skew(0.5deg); }
            94% { transform: translate(2px, -1px) skew(-0.5deg); }
            96% { transform: translate(-1px, 1px) skew(0.3deg); }
          }

          @keyframes subtle-glow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.1); }
          }

          @keyframes rgb-split {
            0% { filter: hue-rotate(var(--hue-rotation)) saturate(1); }
            25% {
              filter:
                hue-rotate(var(--hue-rotation))
                saturate(1.5)
                drop-shadow(-3px 0 2px rgba(255,0,255,0.5))
                drop-shadow(3px 0 2px rgba(0,255,255,0.5));
            }
            50% { filter: hue-rotate(var(--hue-rotation)) saturate(1); }
            75% {
              filter:
                hue-rotate(var(--hue-rotation))
                saturate(1.5)
                drop-shadow(3px 0 2px rgba(255,0,255,0.5))
                drop-shadow(-3px 0 2px rgba(0,255,255,0.5));
            }
            100% { filter: hue-rotate(var(--hue-rotation)) saturate(1); }
          }

          .heart-container {
            animation: ${isHovered ? "glitch 0.3s infinite" : "none"};
          }
        `}
      </style>
      <div
        class="heart-container"
        style={{
          top: 0,
          left: 0,
          display: "flex",
          width: "80%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <svg
          data-testid="heart"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="50 27.5 400 360"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transformOrigin: "center center",
            display: "block",
            overflow: "visible",
            "--hue-rotation": `${rotationColorMap[colorNames[currentColorIndex]] ?? 0}deg`,
            filter: `hue-rotate(${rotationColorMap[colorNames[currentColorIndex]] ?? 0}deg) ${isHovered ? "saturate(1.3)" : "saturate(1)"}`,
            transform: "scale(1)",
            animation: isHovered
              ? "heartbeat 2s ease-in-out infinite, rgb-split 3s infinite"
              : "none",
            transition: "filter 0.3s ease-out",
          }}
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
              <path d=" M 250,80 C 220,20, 140,20, 110,80 C 50,180, 150,300, 250,380 C 350,300, 450,180, 390,80 C 360,20, 280,20, 250,80 Z " />
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

            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
              <feColorMatrix in="blur1" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0.25 0 0 0  0 0 0 1 0" result="green" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
              <feColorMatrix in="blur2" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0.25 0 0 0  0 0 0 0.8 0" result="green2" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur3" />
              <feColorMatrix in="blur3" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0.25 0 0 0  0 0 0 0.5 0" result="green3" />
              <feMerge>
                <feMergeNode in="green3" />
                <feMergeNode in="green2" />
                <feMergeNode in="green" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="chromatic" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset in="SourceGraphic" dx="2" dy="0" result="r" />
              <feOffset in="SourceGraphic" dx="-2" dy="0" result="b" />
              <feColorMatrix in="r" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r2" />
              <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b2" />
              <feBlend mode="screen" in="r2" in2="b2" result="blend" />
              <feBlend mode="screen" in="blend" in2="SourceGraphic" />
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
                    transform: `rotate(${tree.rotation}deg)`,
                  }}
                />
              ))}
            </g>
          </g>
          <path
            role="button"
            aria-label="Interactive heart that changes color when clicked"
            d=" M 250,80 C 220,20, 140,20, 110,80 C 50,180, 150,300, 250,380 C 350,300, 450,180, 390,80 C 360,20, 280,20, 250,80 Z "
            className="interactive-heart"
            fill="transparent"
            stroke="#00ff41"
            stroke-width="3"
            filter={isHovered ? "url(#glow) url(#chromatic)" : "url(#glow)"}
            style={{
              pointerEvents: "all",
              cursor: "pointer",
            }}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </svg>
      </div>
    </>
  );
}
