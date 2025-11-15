interface WeatherData {
  temperature: number;
  weatherCode: number;
  isDay: boolean;
}

export async function getWeather(): Promise<WeatherData | null> {
  try {
    // Brighton, East Sussex (BN2 9SE)
    const lat = 50.8225;
    const lon = -0.1372;
    
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&timezone=auto`,
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
    };
  } catch {
    return null;
  }
}

export function getWeatherEffect(weatherCode: number): string {
  // WMO Weather codes: https://open-meteo.com/en/docs
  if (weatherCode === 0) return "clear"; // Clear sky
  if (weatherCode <= 3) return "rainy"; // Testing: force rain for cloudy days
  if (weatherCode <= 49) return "foggy"; // Fog
  if (weatherCode <= 69) return "rainy"; // Rain
  if (weatherCode <= 79) return "snowy"; // Snow
  if (weatherCode <= 99) return "stormy"; // Thunderstorm
  return "rainy";
}
