import type { JSX } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import { getWeather, getWeatherEffect } from "@serivces/getWeather.ts";

export default function GalaxyBackground(): JSX.Element {
  const [weather, setWeather] = useState("");
  const [debug, setDebug] = useState("");

  useEffect(() => {
    const fetchWeather = async (): Promise<void> => {
      const data = await getWeather();
      if (data) {
        const effect = getWeatherEffect(data.weatherCode);
        setWeather(effect);
        setDebug(`Weather: ${effect}, Code: ${data.weatherCode}, Temp: ${data.temperature}°C`);
      } else {
        setDebug("Weather fetch failed");
      }
    };
    fetchWeather();
  }, []);

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
            0%, 100% { opacity: 0.25; }
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
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
          }
          
          .nebula-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.3;
            animation: nebula-drift 40s ease-in-out infinite, nebula-pulse 20s ease-in-out infinite;
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
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0, 255, 65, 0.5) 0%, transparent 60%)",
            top: "10%",
            left: "15%",
            animationDelay: "0s",
          }}
        />
        <div 
          class="nebula-blob" 
          style={{
            width: "1000px",
            height: "1000px",
            background: "radial-gradient(circle, rgba(0, 180, 255, 0.4) 0%, transparent 60%)",
            bottom: "5%",
            right: "10%",
            animationDelay: "-15s",
          }}
        />
        <div 
          class="nebula-blob" 
          style={{
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(100, 255, 200, 0.35) 0%, transparent 60%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
        }}>
          {debug}
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
