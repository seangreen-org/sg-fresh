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
  const [mode, setMode] = useState<WeatherMode>(() => {
    if (typeof globalThis.window !== "undefined") {
      const params = new URLSearchParams(globalThis.location.search);
      const weatherParam = params.get("weather");
      if (
        weatherParam &&
        ["live", "clear", "cloudy", "foggy", "rainy", "snowy", "stormy"]
          .includes(weatherParam)
      ) {
        return weatherParam as WeatherMode;
      }
    }
    return "live";
  });
  const [showPanel, setShowPanel] = useState(false);
  const [showDebug, setShowDebug] = useState(() => {
    if (typeof globalThis.window !== "undefined") {
      const params = new URLSearchParams(globalThis.location.search);
      return params.has("weather");
    }
    return false;
  });
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
    if (showDebug && typeof globalThis.window !== "undefined") {
      const params = new URLSearchParams(globalThis.location.search);
      if (mode === "live") {
        params.delete("weather");
      } else {
        params.set("weather", mode);
      }
      const newUrl = params.toString()
        ? `?${params.toString()}`
        : globalThis.location.pathname;
      globalThis.history.replaceState(null, "", newUrl);
    }
  }, [mode, showDebug]);

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
        return { particles: "clouds", opacity: 0.3 };
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
            0% { transform: translateY(-20px) translateX(0); opacity: 0.8; }
            100% { transform: translateY(100vh) translateX(var(--drift)); opacity: 0.2; }
          }

          @keyframes rain-fall-alt {
            0% { transform: translateY(-20px) translateX(0); opacity: 0.8; }
            50% { transform: translateY(50vh) translateX(calc(var(--drift) * 0.3)); }
            100% { transform: translateY(100vh) translateX(var(--drift)); opacity: 0.2; }
          }

          @keyframes snow-fall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
          }

          @keyframes lightning-strike {
            0%, 100% { opacity: 0; }
            1% { opacity: 0.9; }
            2% { opacity: 0; }
            3% { opacity: 1; }
            5% { opacity: 0; }
          }

          @keyframes lightning-glow {
            0%, 100% { opacity: 0; transform: scale(1); }
            2% { opacity: 0.7; transform: scale(1.05); }
            5% { opacity: 0; transform: scale(1); }
          }

          @keyframes lightning-bolt-flash {
            0%, 100% { opacity: 0; }
            1% { opacity: 1; }
            1.5% { opacity: 0.4; }
            2% { opacity: 0; }
          }

          @keyframes cloud-drift {
            0% { transform: translateX(-30%) translateY(0); opacity: 0; }
            15% { opacity: 0.5; }
            85% { opacity: 0.5; }
            100% { transform: translateX(130%) translateY(-15px); opacity: 0; }
          }

          @keyframes cloud-shimmer {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.6; }
          }

          .weather-effect {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 10;
          }

          .rain-drop {
            position: absolute;
            top: -50px;
            width: 2px;
            height: 30px;
            background: linear-gradient(transparent, rgba(0, 255, 65, 0.6), rgba(0, 255, 65, 0.3));
          }

          .rain-drop.near-heart {
            filter: blur(1px);
          }

          .snow-flake {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: snow-fall 4s linear infinite;
          }

          .lightning-container {
            position: fixed;
            inset: 0;
            pointer-events: none;
          }

          .lightning-flash {
            position: fixed;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(100, 230, 255, 0.15) 0%,
              rgba(80, 210, 240, 0.1) 20%,
              rgba(50, 180, 220, 0.06) 40%,
              transparent 70%
            );
            filter: blur(2px);
          }

          .lightning-glow {
            position: fixed;
            width: 100%;
            height: 60%;
            top: 0;
            left: 0;
            background: radial-gradient(
              ellipse 60% 40% at 50% 0%,
              rgba(200, 255, 255, 0.6) 0%,
              rgba(150, 255, 255, 0.3) 25%,
              rgba(100, 230, 255, 0.15) 50%,
              transparent 75%
            );
            mix-blend-mode: screen;
          }

          .lightning-bolt {
            position: fixed;
            width: 2px;
            height: 120vh;
            top: -10vh;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(255, 255, 255, 1) 20%,
              rgba(200, 255, 255, 0.95) 40%,
              rgba(150, 240, 255, 0.9) 60%,
              rgba(100, 220, 255, 0.7) 80%,
              transparent 100%
            );
            box-shadow:
              0 0 8px rgba(255, 255, 255, 1),
              0 0 15px rgba(150, 240, 255, 0.8),
              0 0 25px rgba(100, 220, 255, 0.5);
            transform-origin: top center;
            filter: blur(0.5px);
          }          .cloud {
            position: absolute;
            width: 500px;
            height: 300px;
            opacity: 0;
            will-change: transform, opacity;
          }

          .cloud-layer {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(
              ellipse 100% 70% at center,
              rgba(0, 255, 120, 0.2) 0%,
              rgba(0, 200, 100, 0.1) 30%,
              transparent 65%
            );
            border-radius: 50%;
            filter: blur(60px);
          }

          .cloud-layer:nth-child(2) {
            width: 70%;
            height: 75%;
            left: 15%;
            top: 12%;
            background: radial-gradient(
              ellipse 90% 75% at center,
              rgba(150, 255, 220, 0.25) 0%,
              rgba(100, 230, 180, 0.12) 40%,
              transparent 70%
            );
            filter: blur(40px);
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
          {Array.from({ length: 100 }).map((_, i) => {
            const leftPos = Math.random() * 100;
            const drift = (Math.random() - 0.5) * 40;
            const isNearCenter = leftPos > 40 && leftPos < 60;
            const animation = Math.random() > 0.5
              ? "rain-fall"
              : "rain-fall-alt";

            return (
              <div
                key={i}
                class={`rain-drop ${isNearCenter ? "near-heart" : ""}`}
                style={{
                  left: `${leftPos}%`,
                  "--drift": `${drift}px`,
                  animation: `${animation} ${
                    0.8 + Math.random() * 0.4
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            );
          })}
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

      {weatherStyles.particles === "clouds" && (
        <div class="weather-effect">
          {Array.from({ length: 8 }).map((_, i) => {
            const scale = 0.8 + Math.random() * 0.6;
            const yPos = -5 + Math.random() * 100;
            const duration = 50 + Math.random() * 30;
            const fromRight = i % 3 === 0;
            const delay = (i * -12) - Math.random() * 20;
            const shimmerDuration = 12 + Math.random() * 8;

            return (
              <div
                key={i}
                class="cloud"
                style={{
                  top: `${yPos}%`,
                  left: fromRight ? "auto" : undefined,
                  right: fromRight ? "-30%" : undefined,
                  transform: `scale(${scale}) ${fromRight ? "scaleX(-1)" : ""}`,
                  animation:
                    `cloud-drift ${duration}s linear infinite ${delay}s, cloud-shimmer ${shimmerDuration}s ease-in-out infinite`,
                }}
              >
                <div class="cloud-layer" />
                <div class="cloud-layer" />
              </div>
            );
          })}
        </div>
      )}

      {weatherStyles.particles === "lightning" && (
        <div class="weather-effect">
          {Array.from({ length: 3 }).map((_, i) => {
            const delay = -(10 + Math.random() * 8) + 2 + i * 4 +
              Math.random() * 3;
            const duration = 10 + Math.random() * 8;
            const showBolt = Math.random() > 0.4;
            const boltAngle = Math.random() > 0.5
              ? -(25 + Math.random() * 35)
              : (25 + Math.random() * 35);
            const boltPosition = 20 + Math.random() * 60;

            return (
              <div
                key={i}
                class="lightning-container"
                style={{
                  animation:
                    `lightning-strike ${duration}s ease-out infinite ${delay}s`,
                }}
              >
                <div class="lightning-flash" />
                <div
                  class="lightning-glow"
                  style={{
                    animation:
                      `lightning-glow ${duration}s ease-out infinite ${delay}s`,
                  }}
                />
                {showBolt && (
                  <div
                    class="lightning-bolt"
                    style={{
                      left: `${boltPosition}%`,
                      transform: `rotate(${boltAngle}deg)`,
                      animation:
                        `lightning-bolt-flash ${duration}s ease-out infinite ${delay}s`,
                    }}
                  />
                )}
              </div>
            );
          })}
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
