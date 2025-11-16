import type { JSX } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import { getWeather, getWeatherEffect } from "@serivces/getWeather.ts";

type WeatherMode = "live" | "clear" | "cloudy" | "foggy" | "rainy" | "snowy" | "stormy";

export default function GalaxyBackground(): JSX.Element {
  const [weather, setWeather] = useState("");
  const [debug, setDebug] = useState("Loading weather...");
  const [mode, setMode] = useState<WeatherMode>("live");
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    const fetchWeather = async (): Promise<void> => {
      if (mode === "live") {
        const data = await getWeather();
        if (data) {
          const effect = getWeatherEffect(data.weatherCode);
          setWeather(effect);
          setDebug(`Weather: ${effect}, Code: ${data.weatherCode}, Temp: ${data.temperature}°C`);
        } else {
          setDebug("Weather fetch failed");
        }
      } else {
        setWeather(mode);
        setDebug(`Weather: ${mode} (Manual Override)`);
      }
    };
    fetchWeather();
  }, [mode]);

  const getWeatherStyles = (): { particles: string; opacity: number } => {
    switch (weather) {
      case "rainy":
        return { particles: "rain", opacity: 0.6 };
      case "snowy":
        return { particles: "snow", opacity: 0.8 };
      case "stormy":
        return { particles: "lightning", opacity: 0.4 };
      case "foggy":
        return { particles: "fog", opacity: 0.9 };
      case "cloudy":
        return { particles: "clouds", opacity: 0.3 };
      default:
        return { particles: "stars", opacity: 0.2 };
    }
  };

  const weatherStyles = getWeatherStyles();

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }

          @keyframes rain-fall {
            0% { transform: translateY(-20px); opacity: 0.8; }
            100% { transform: translateY(100vh); opacity: 0.2; }
          }

          @keyframes snow-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
          }

          @keyframes lightning-flash {
            0%, 90%, 100% { opacity: 0; }
            93%, 97% { opacity: 0.8; }
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

          .weather-effect {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 2;
          }

          .rain-drop {
            position: absolute;
            width: 2px;
            height: 30px;
            background: linear-gradient(transparent, rgba(0, 255, 65, 0.6), rgba(0, 255, 65, 0.3));
            animation: rain-fall 1s linear infinite;
          }

          .snow-flake {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: snow-fall 4s linear infinite;
          }

          .lightning {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.3) 0%, transparent 50%);
            animation: lightning-flash 5s ease-in-out infinite;
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

      {debug && (
        <div style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          color: "#00ff41",
          fontSize: "12px",
          zIndex: 1000,
          background: "rgba(0,0,0,0.8)",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setShowPanel(!showPanel)}
        >
          {debug} {showPanel ? "▼" : "▶"}
        </div>
      )}

      {showPanel && (
        <div
          style={{
            position: "fixed",
            top: "40px",
            left: "10px",
            color: "#00ff41",
            fontSize: "12px",
            zIndex: 1000,
            background: "rgba(0,0,0,0.9)",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #00ff41",
          }}
        >
          <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
            Weather Override:
          </div>
          {(["live", "clear", "cloudy", "foggy", "rainy", "snowy", "stormy"] as WeatherMode[]).map((m) => (
            <div
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "4px 8px",
                marginBottom: "4px",
                cursor: "pointer",
                background: mode === m ? "rgba(0,255,65,0.2)" : "transparent",
                borderRadius: "2px",
                border: mode === m ? "1px solid #00ff41" : "1px solid transparent",
              }}
            >
              {m === "live" ? "🌐 Live Data" : `${getEmoji(m)} ${m.charAt(0).toUpperCase() + m.slice(1)}`}
            </div>
          ))}
        </div>
      )}

      {weatherStyles.particles === "rain" && (
        <div class="weather-effect">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              class="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.8 + Math.random() * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {weatherStyles.particles === "snow" && (
        <div class="weather-effect">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              class="snow-flake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {weatherStyles.particles === "lightning" && (
        <div class="weather-effect">
          <div class="lightning" />
        </div>
      )}

      <div class="vignette" style={{ opacity: weatherStyles.opacity }} />
    </>
  );
}

function getEmoji(weather: string): string {
  switch (weather) {
    case "clear": return "☀️";
    case "cloudy": return "☁️";
    case "foggy": return "🌫️";
    case "rainy": return "🌧️";
    case "snowy": return "❄️";
    case "stormy": return "⛈️";
    default: return "🌐";
  }
}
