import type { JSX } from "preact/jsx-runtime";

export default function GalaxyBackground(): JSX.Element {
  const GalaxyCircle = (
    props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGCircleElement>,
  ) => {
    return (
      <circle
        style={{
          mixBlendMode: "screen",
          filter: "url(#galaxy-blur)",
        }}
        {...props}
      />
    );
  };

  return (
    <>
      <style>
        {`
          @keyframes slowly-rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div
        class="galaxy-container"
        style={{
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100vh",
          background: "linear-gradient(to bottom, #000a00, #101020)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          class="galaxy-bg"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "0",
            animation: "slowly-rotate 60s linear infinite",
            mixBlendMode: "screen",
            opacity: "0.3",
          }}
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
            <GalaxyCircle
              cx="600"
              cy="500"
              r="200"
              fill="url(#galaxy-gradient-1)"
            />
            <GalaxyCircle
              cx="400"
              cy="400"
              r="300"
              fill="url(#galaxy-gradient-1)"
              opacity="0.4"
            />
            <GalaxyCircle
              cx="700"
              cy="600"
              r="250"
              fill="url(#galaxy-gradient-1)"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    </>
  );
}
