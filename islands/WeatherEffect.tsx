import type { JSX } from "preact/jsx-runtime";
import { useEffect, useRef, useState } from "preact/hooks";
import { getWeather, getWeatherEffect } from "@serivces/getWeather.ts";

type WeatherMode =
  | "live"
  | "clear"
  | "cloudy"
  | "foggy"
  | "rainy"
  | "snowy"
  | "stormy";

export default function WeatherEffect(): JSX.Element {
  const [weather, setWeather] = useState("");
  const [debug, setDebug] = useState("Loading weather...");
  const [mode, setMode] = useState<WeatherMode>("live");
  const [showPanel, setShowPanel] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const keySequence = useRef<string[]>([]);

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      keySequence.current = [...keySequence.current, e.key].slice(
        -konamiCode.length,
      );

      if (
        keySequence.current.length === konamiCode.length &&
        keySequence.current.every((key, i) => key === konamiCode[i])
      ) {
        setShowDebug(true);
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchWeather = async (): Promise<void> => {
      if (mode === "live") {
        const data = await getWeather();
        if (data) {
          const effect = getWeatherEffect(data.weatherCode);
          setWeather(effect);
          setDebug(
            `Weather: ${effect}, Code: ${data.weatherCode}, Temp: ${data.temperature}°C`,
          );
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

          .weather-effect {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 10;
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

          .weather-vignette {
            position: fixed;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
            z-index: 11;
          }
        `}
      </style>

      {showDebug && (
        <div
          style={{
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
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            height: "24px",
          }}
          onClick={() => setShowPanel(!showPanel)}
        >
          <span style={{ whiteSpace: "nowrap" }}>{debug}</span>
          <span style={{ width: "10px", flexShrink: 0, textAlign: "center" }}>
            {showPanel ? "▼" : "▶"}
          </span>
        </div>
      )}

      {showPanel && (
        <div
          style={{
            position: "fixed",
            top: "45px",
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
          {([
            "live",
            "clear",
            "cloudy",
            "foggy",
            "rainy",
            "snowy",
            "stormy",
          ] as WeatherMode[]).map((m) => (
            <div
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "4px 8px",
                marginBottom: "4px",
                cursor: "pointer",
                background: mode === m ? "rgba(0,255,65,0.2)" : "transparent",
                borderRadius: "2px",
                border: mode === m
                  ? "1px solid #00ff41"
                  : "1px solid transparent",
              }}
            >
              {m === "live"
                ? "🌐 Live Data"
                : `${getEmoji(m)} ${m.charAt(0).toUpperCase() + m.slice(1)}`}
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

      <div
        class="weather-vignette"
        style={{ opacity: weatherStyles.opacity }}
      />
    </>
  );
}

function getEmoji(weather: string): string {
  switch (weather) {
    case "clear":
      return "☀️";
    case "cloudy":
      return "☁️";
    case "foggy":
      return "🌫️";
    case "rainy":
      return "🌧️";
    case "snowy":
      return "❄️";
    case "stormy":
      return "⛈️";
    default:
      return "🌐";
  }
}
