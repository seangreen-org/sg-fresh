import Header from './Header.jsx';

export default function Heart() {
  return (
    <>
      <Header />
      <svg
        id="sg1981"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="50 20 400 380"
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
            <path
              d="
                M 250,80
                C 220,20, 140,20, 110,80
                C 50,180, 150,300, 250,380
                C 350,300, 450,180, 390,80
                C 360,20, 280,20, 250,80
                Z
              "
            />
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
          <linearGradient id="purpleGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8A00D4" />
            <stop offset="100%" stop-color="#622B7E" />
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
          <rect
            x="120"
            y="0"
            width="5"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: -14deg;"
            opacity="0.8"
          />
          <rect
            x="138"
            y="0"
            width="4"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: -10deg;"
            opacity="0.8"
          />
          <rect
            x="155"
            y="0"
            width="3"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: -5deg;"
            opacity="0.8"
          />
          <rect
            x="172"
            y="0"
            width="5"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: -2deg;"
            opacity="0.8"
          />
          <rect
            x="200"
            y="0"
            width="4"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: 3deg;"
            opacity="0.8"
          />
          <rect
            x="218"
            y="0"
            width="6"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: 6deg;"
            opacity="0.8"
          />
          <rect
            x="235"
            y="0"
            width="4"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: 9deg;"
            opacity="0.8"
          />
          <rect
            x="260"
            y="0"
            width="4"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: 12deg;"
            opacity="0.8"
          />
          <rect
            x="280"
            y="0"
            width="5"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: 10deg;"
            opacity="0.8"
          />
          <rect
            x="300"
            y="0"
            width="4"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: 7deg;"
            opacity="0.8"
          />
          <rect
            x="320"
            y="0"
            width="5"
            height="500"
            fill="url(#purpleGrad1)"
            style="--rotation: 4deg;"
            opacity="0.8"
          />
          <rect
            x="345"
            y="0"
            width="3"
            height="500"
            fill="url(#purpleGrad2)"
            style="--rotation: 0deg;"
            opacity="0.8"
          />

          <rect
            x="105"
            y="0"
            width="18"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: -13deg;"
            opacity="0.9"
          />
          <rect
            x="130"
            y="0"
            width="20"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: -11deg;"
            opacity="0.9"
          />
          <rect
            x="150"
            y="0"
            width="25"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: -8deg;"
            opacity="0.88"
          />
          <rect
            x="170"
            y="0"
            width="16"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: -6deg;"
            opacity="0.9"
          />
          <rect
            x="185"
            y="0"
            width="20"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: -3deg;"
            opacity="0.9"
          />
          <rect
            x="195"
            y="0"
            width="24"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: -1deg;"
            opacity="0.92"
          />
          <rect
            x="210"
            y="0"
            width="18"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: 1deg;"
            opacity="0.88"
          />
          <rect
            x="225"
            y="0"
            width="22"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: 4deg;"
            opacity="0.9"
          />
          <rect
            x="243"
            y="0"
            width="20"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: 6deg;"
            opacity="0.85"
          />
          <rect
            x="255"
            y="0"
            width="14"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: 8deg;"
            opacity="0.88"
          />
          <rect
            x="275"
            y="0"
            width="24"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: 11deg;"
            opacity="0.85"
          />
          <rect
            x="290"
            y="0"
            width="16"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: 9deg;"
            opacity="0.8"
          />
          <rect
            x="310"
            y="0"
            width="20"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: 6deg;"
            opacity="0.82"
          />
          <rect
            x="330"
            y="0"
            width="18"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: 2deg;"
            opacity="0.85"
          />
          <rect
            x="350"
            y="0"
            width="22"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: -1deg;"
            opacity="0.8"
          />
          <rect
            x="370"
            y="0"
            width="15"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: -4deg;"
            opacity="0.8"
          />
          <rect
            x="388"
            y="0"
            width="20"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: -7deg;"
            opacity="0.78"
          />
          <rect
            x="405"
            y="0"
            width="16"
            height="500"
            fill="url(#greenGrad3)"
            style="--rotation: -9deg;"
            opacity="0.8"
          />
          <rect
            x="420"
            y="0"
            width="22"
            height="500"
            fill="url(#greenGrad1)"
            style="--rotation: -12deg;"
            opacity="0.8"
          />
          <rect
            x="435"
            y="0"
            width="15"
            height="500"
            fill="url(#greenGrad2)"
            style="--rotation: -14deg;"
            opacity="0.8"
          />
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
          strokeWidth="3"
          filter="url(#glow)"
          style={{ pointerEvents: 'all' }}
        />
      </svg>
    </>
  );
}
