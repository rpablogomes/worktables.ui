import { create } from "zustand";
import { WeatherData, WeatherState } from "../types/weather";

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  loadingWeather: false,
  weatherError: null,

  fetchWeather: async (countryName: string) => {
    set({ loadingWeather: true, weatherError: null, weatherData: null });

    const encodedCountryName = encodeURIComponent(countryName);

    try {
      const response = await fetch(
        `http://localhost:5000/weather-api/${encodedCountryName}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || 'Unknown server error');
        } catch {
          throw new Error(errorText || 'Unknown server error');
        }
      }

      const data: WeatherData = await response.json();
      set({ weatherData: data, loadingWeather: false, weatherError: null });
    } catch (err: any) {
      set({
        weatherError: `Failed to fetch weather data: ${
          err.message || "Unknown error"
        }`,
        loadingWeather: false,
        weatherData: null,
      });
    }
  },
}));