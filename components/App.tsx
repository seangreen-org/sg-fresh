import { useMemo } from 'preact/hooks';
import Header from './Header.jsx';
import Heart from './Heart.tsx';

export default function App() {
  const renderClouds = useMemo(() => {
    const cloudCount = 15; // Number of clouds
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      const xStart = Math.random() * 200 - 100; // Random X start (-100vw to 100vw)
      const yStart = Math.random() * 200 - 100; // Random Y start (-100vh to 100vh)
      const zStart = Math.random() * 300 - 150; // Random Z depth start (-150px to 150px)
      const xEnd = Math.random() * 200 - 100; // Random X end (-100vw to 100vw)
      const yEnd = Math.random() * 200 - 100; // Random Y end (-100vh to 100vh)
      const scale = Math.random() * 1.5 + 0.5; // Random scale (0.5 to 2)

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