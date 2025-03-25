import { JSX } from 'preact/jsx-runtime';

export default function Header(): JSX.Element {
  const nameStyle = {
    background: 'linear-gradient(90deg, #00cc7a, #00aadd, #ddaa00, #dd2277)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'text-animation 60s ease infinite',
  };

  const yearStyle = {
    background: 'linear-gradient(90deg,#AAAAAA, #606060, #BBBBBB, #AAAAAA)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'text-animation 60s ease infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes text-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <h1
        style={{
          position: 'absolute',
          bottom: -10,
          right: 0,
          margin: 30,
          zIndex: 1,
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 400,
        }}
      >
        <span style={nameStyle}>Sean Green</span>
        <span style={{ color: '#303030' }}> / </span>
        <span style={yearStyle}>2025</span>
      </h1>
    </>
  );
}
