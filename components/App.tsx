import { useMemo } from 'preact/hooks';
import Header from './Header.jsx';
import Heart from './Heart.tsx';

export default function App() {
  const renderClouds = useMemo(() => {
    const cloudCount = 20; // Adjusted cloud count for better performance
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      const xStart = Math.random() * 300 - 150; // Random X start (-150vw to 150vw)
      const yStart = Math.random() * 300 - 150; // Random Y start (-150vh to 150vh)
      const xEnd = Math.random() * 300 - 150; // Random X end (-150vw to 150vw)
      const yEnd = Math.random() * 300 - 150; // Random Y end (-150vh to 150vh)
      const scale = Math.random() * 2 + 0.8; // Random scale (0.8 to 2.8)

      clouds.push(
        <div
          className="cloud"
          key={i}
          style={{
            '--x-start': `${xStart}vw`,
            '--y-start': `${yStart}vh`,
            '--x-end': `${xEnd}vw`,
            '--y-end': `${yEnd}vh`,
            '--scale': scale,
          }}
        ></div>
      );
    }
    return clouds;
  }, []);

  return (
    <>
      <Header />
      <div className="clouds-container">
        {renderClouds}
      </div>
      <Heart />
      <div className="vignette-overlay"></div>
    </>
  );
}