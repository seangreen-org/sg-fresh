import { useMemo } from 'preact/hooks';
import Header from './Header.jsx';
import Heart from './Heart.tsx';

export default function App() {
  const renderClouds = useMemo(() => {
    const cloudCount = 20; // Number of clouds
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      const xStart = Math.random() * 300 - 150; // Random X start (-150vw to 150vw)
      const yStart = Math.random() * 300 - 150; // Random Y start (-150vh to 150vh)
      const zStart = Math.random() * 400 - 200; // Random Z depth start (-200px to 200px)
      const xEnd = Math.random() * 300 - 150; // Random X end (-150vw to 150vw)
      const yEnd = Math.random() * 300 - 150; // Random Y end (-150vh to 150vh)
      const scale = Math.random() * 1.5 + 0.8; // Random scale (0.8 to 2.3)

      clouds.push(
        <div
          className="cloud"
          key={i}
          style={{
            '--x-start': `${xStart}vw`,
            '--y-start': `${yStart}vh`,
            '--z-start': `${zStart}px`,
            '--x-end': `${xEnd}vw`,
            '--y-end': `${yEnd}vh`,
            '--scale': scale,
          }}
        ></div>
      );
    }
    return clouds;
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <Header />
      <div className="clouds-container">
        {renderClouds}
      </div>
      <Heart />
    </>
  );
}