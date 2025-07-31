export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    condition: {
      text: string;
    };
    wind_mph: number;
    humidity: number;
    cloud: number;
  };
}

export interface WeatherState {
  weatherData: WeatherData | null;
  loadingWeather: boolean;
  weatherError: string | null;
  fetchWeather: (countryName: string) => Promise<void>;
}
