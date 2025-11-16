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

          @keyframes nebula-drift {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -20px) scale(1.1); }
            66% { transform: translate(-20px, 30px) scale(0.95); }
            100% { transform: translate(0, 0) scale(1); }
          }

          @keyframes nebula-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }

          @keyframes nebula-rotate {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); }
            33% { transform: translate(30px, -20px) scale(1.1) rotate(120deg); }
            66% { transform: translate(-20px, 30px) scale(0.95) rotate(240deg); }
            100% { transform: translate(0, 0) scale(1) rotate(360deg); }
          }

          @keyframes color-shift-1 {
            0% {
              background: radial-gradient(circle, rgba(0, 255, 100, 0.5) 0%, rgba(0, 255, 100, 0.25) 30%, transparent 70%);
            }
            16.5% {
              background: radial-gradient(circle, rgba(0, 227, 177, 0.5) 0%, rgba(0, 227, 177, 0.25) 30%, transparent 70%);
            }
            33% {
              background: radial-gradient(circle, rgba(0, 200, 255, 0.5) 0%, rgba(0, 200, 255, 0.25) 30%, transparent 70%);
            }
            49.5% {
              background: radial-gradient(circle, rgba(80, 120, 240, 0.5) 0%, rgba(80, 120, 240, 0.25) 30%, transparent 70%);
            }
            66% {
              background: radial-gradient(circle, rgba(150, 80, 230, 0.5) 0%, rgba(150, 80, 230, 0.25) 30%, transparent 70%);
            }
            83% {
              background: radial-gradient(circle, rgba(100, 200, 150, 0.5) 0%, rgba(100, 200, 150, 0.25) 30%, transparent 70%);
            }
            100% {
              background: radial-gradient(circle, rgba(0, 255, 100, 0.5) 0%, rgba(0, 255, 100, 0.25) 30%, transparent 70%);
            }
          }

          @keyframes color-shift-2 {
            0% {
              background: radial-gradient(circle, rgba(0, 200, 255, 0.7) 0%, rgba(0, 200, 255, 0.3) 30%, transparent 70%);
            }
            16.5% {
              background: radial-gradient(circle, rgba(100, 150, 255, 0.7) 0%, rgba(100, 150, 255, 0.3) 30%, transparent 70%);
            }
            33% {
              background: radial-gradient(circle, rgba(180, 100, 255, 0.7) 0%, rgba(180, 100, 255, 0.3) 30%, transparent 70%);
            }
            49.5% {
              background: radial-gradient(circle, rgba(220, 100, 200, 0.7) 0%, rgba(220, 100, 200, 0.3) 30%, transparent 70%);
            }
            66% {
              background: radial-gradient(circle, rgba(200, 150, 180, 0.7) 0%, rgba(200, 150, 180, 0.3) 30%, transparent 70%);
            }
            83% {
              background: radial-gradient(circle, rgba(100, 180, 220, 0.7) 0%, rgba(100, 180, 220, 0.3) 30%, transparent 70%);
            }
            100% {
              background: radial-gradient(circle, rgba(0, 200, 255, 0.7) 0%, rgba(0, 200, 255, 0.3) 30%, transparent 70%);
            }
          }

          @keyframes color-shift-3 {
            0% {
              background: radial-gradient(circle, rgba(150, 255, 200, 0.6) 0%, rgba(150, 255, 200, 0.3) 30%, transparent 70%);
            }
            16.5% {
              background: radial-gradient(circle, rgba(175, 220, 220, 0.6) 0%, rgba(175, 220, 220, 0.3) 30%, transparent 70%);
            }
            33% {
              background: radial-gradient(circle, rgba(200, 180, 230, 0.6) 0%, rgba(200, 180, 230, 0.3) 30%, transparent 70%);
            }
            49.5% {
              background: radial-gradient(circle, rgba(220, 170, 220, 0.6) 0%, rgba(220, 170, 220, 0.3) 30%, transparent 70%);
            }
            66% {
              background: radial-gradient(circle, rgba(210, 190, 230, 0.6) 0%, rgba(210, 190, 230, 0.3) 30%, transparent 70%);
            }
            83% {
              background: radial-gradient(circle, rgba(180, 220, 215, 0.6) 0%, rgba(180, 220, 215, 0.3) 30%, transparent 70%);
            }
            100% {
              background: radial-gradient(circle, rgba(150, 255, 200, 0.6) 0%, rgba(150, 255, 200, 0.3) 30%, transparent 70%);
            }
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

          .nebula {
            position: fixed;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            overflow: hidden;
          }

          .nebula-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.6;
          }
        `}
      </style>
      <div class="grid" />

      <div class="nebula">
        <div
          class="nebula-blob"
          style={{
            width: "900px",
            height: "900px",
            top: "-50%",
            left: "-15%",
            animation: "nebula-rotate 40s ease-in-out infinite, nebula-pulse 20s ease-in-out infinite, color-shift-1 30s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />
        <div
          class="nebula-blob"
          style={{
            width: "1100px",
            height: "1100px",
            bottom: "5%",
            right: "10%",
            animation: "nebula-rotate 45s ease-in-out infinite, nebula-pulse 22s ease-in-out infinite, color-shift-2 35s ease-in-out infinite",
            animationDelay: "-15s",
          }}
        />
        <div
          class="nebula-blob"
          style={{
            width: "800px",
            height: "800px",
            top: "50%",
            left: "50%",
            animation: "nebula-rotate 50s ease-in-out infinite, nebula-pulse 25s ease-in-out infinite, color-shift-3 40s ease-in-out infinite",
            animationDelay: "-30s",
          }}
        />
      </div>
    </>
  );
}
