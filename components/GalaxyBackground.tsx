import type { JSX } from "preact/jsx-runtime";

export default function GalaxyBackground(): JSX.Element {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }

          .grid {
            position: fixed;
            inset: 0;
            background-image:
              linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px);
            background-size: 50px 50px;
            pointer-events: none;
            z-index: 1;
          }

          .vignette {
            position: fixed;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
            z-index: 99;
          }
        `}
      </style>
      <div class="grid" />
      <div class="vignette" />
    </>
  );
}
