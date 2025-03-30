import type { JSX } from "preact/jsx-runtime";

export default function Footnote(): JSX.Element {
  const angle = (() => {
    const randomAngle = Math.floor(Math.random() * 360);
    const isNearStraightAngle = [0, 90, 180, 270, 360].some(
      (straightAngle) => Math.abs(randomAngle - straightAngle) < 15,
    );
    return `${isNearStraightAngle ? randomAngle + 15 : randomAngle}deg`;
  })();

  const baseGradientStyle = {
    backgroundSize: "200% 200%",
    animation: "text-animation 60s ease infinite",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const nameStyle = {
    opacity: 1,
    background: `linear-gradient(${angle}, #00cc7a, #00aadd, #ddaa00, #dd2277)`,
    textDecoration: "none",
    ...baseGradientStyle,
  };

  const yearStyle = {
    opacity: 0.8,
    background: `linear-gradient(${angle}, #aaaaaa, #606060, #bbbbbb, #aaaaaa)`,
    ...baseGradientStyle,
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
          position: "absolute",
          bottom: -10,
          right: 0,
          margin: 30,
          zIndex: 1,
          fontFamily: "Inter, sans-serif",
          fontSize: "1rem",
          fontWeight: 400,
          textShadow: "0 0 15px rgba(0, 255, 128, 0.4)",
        }}
      >
        <a href="https://github.com/seangreen-org/sg-fresh" style={nameStyle}>
          Sean Green
        </a>
        <span style={{ color: "#303030", margin: 8 }}>/</span>
        <span style={yearStyle}>2025</span>
      </h1>
    </>
  );
}
