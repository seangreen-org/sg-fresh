import { useEffect, useState, useRef } from 'preact/hooks';

const getAverage = (data) => {
  const sum = data.reduce((a, b) => a + b, 0);
  const avg = sum / data.length;
  return avg;
};

const Sparkle = function(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 2;
  this.life = 0;

  const colors = [[0, 255, 255], [255, 0, 255], [255, 255, 0]];
  this.color = colors[Math.floor(Math.random() * colors.length)];
}

const LaserWaveform = ({ audioAnalyserRef }) => {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const sparkles = useRef([]);

  useEffect(() => {
    if (!audioAnalyserRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const colors = ['rgb(0, 255, 255)', 'rgb(255, 0, 255)', 'rgb(255, 255, 0)'];

    const drawWaveform = () => {
      const { width, height } = canvas;
      const centerY = height / 2;
      const amplitude = height / 4 - 10;
      const frequency = 0.01;
      const wavelength = width / 2;
      const speed = 0.05;

      const bufferLength = audioAnalyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      audioAnalyserRef.current.getByteFrequencyData(dataArray);
      const averageFrequency = getAverage(dataArray);
      setIsActive(Boolean(averageFrequency));

      ctx.clearRect(0, 0, width, height);

      // First (top) waveform
      ctx.beginPath();
      for (let x = 0; x <= width; x += 1) {
        const angle = x * frequency + phase;
        const y =
          centerY -
          amplitude / 2 +
          Math.sin(angle) *
            (amplitude + averageFrequency / 2) *
            Math.sin(x / wavelength - phase * speed) +
          Math.sin(x / 100) * 40;

        ctx.lineTo(x, y);

        if (averageFrequency > 20 && Math.random() < 0.01) {
          sparkles.current.push(new Sparkle(x, y));
        }
      }

      ctx.strokeStyle = colors[Math.floor(phase / speed) % colors.length];
      ctx.lineWidth = 2;
      ctx.stroke();

      // Second (bottom) waveform
      ctx.beginPath();
      for (let x = 0; x <= width; x += 1) {
        const angle = x * frequency + phase + Math.PI; // Added a phase shift
        const y =
          centerY +
          amplitude / 2 -
          Math.sin(angle) *
            (amplitude + averageFrequency / 2) *
            Math.sin(x / wavelength + phase * speed) +
          Math.cos(x / 100) * 40;

        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = colors[(Math.floor(phase / speed) + 1) % colors.length];
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sparkles
      for (let i = 0; i < sparkles.current.length; i++) {
        const sparkle = sparkles.current[i];
        ctx.fillStyle = `rgba(${sparkle.color[0]}, ${sparkle.color[1]}, ${sparkle.color[2]}, ${1 - sparkle.life})`;
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, 2 * Math.PI);
        ctx.fill();

        sparkle.life += 0.01;
        if (sparkle.life > 1) {
          sparkles.current.splice(i, 1);
          i--;
        }
      }

      phase += speed;

      animationRef.current = requestAnimationFrame(drawWaveform);
    };

    animationRef.current = requestAnimationFrame(drawWaveform);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [audioAnalyserRef.current]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        opacity: isActive ? 1 : 0,
        transition: `opacity .5s ease-in-out`,
      }}
    />
  );
};

export default LaserWaveform;
