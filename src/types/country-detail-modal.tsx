import { Country } from "./countries";
import { WeatherData } from "./weather";

export interface CountryDetailModal {
  show: boolean;
  country: Country | null;
  weatherData: WeatherData | null;
  loadingWeather: boolean;
  weatherError: string | null;
  onClose: () => void;
}
