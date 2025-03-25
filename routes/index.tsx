import { JSX } from 'preact/jsx-runtime';
import Heart from '@islands/Heart.tsx';

export default function Home(): JSX.Element {
  return (
    <main class="galaxy-container">
      <svg
        class="galaxy-bg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="galaxy-gradient-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(147, 88, 247, 0.5)" />
            <stop offset="100%" stop-color="rgba(37, 22, 61, 0)" />
          </radialGradient>
          <filter id="galaxy-blur">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <g filter="url(#galaxy-blur)">
          <circle cx="600" cy="500" r="200" fill="url(#galaxy-gradient-1)" />
          <circle cx="400" cy="400" r="300" fill="url(#galaxy-gradient-1)" opacity="0.4" />
          <circle cx="700" cy="600" r="250" fill="url(#galaxy-gradient-1)" opacity="0.6" />
        </g>
      </svg>
      <Heart />
    </main>
  );
}
