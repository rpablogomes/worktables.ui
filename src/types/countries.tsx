export interface Country {
  id: string;
  name: string;
  region: string;
  capital: string;
}

export interface CountryState {
  countries: Country[];
  loadingCountries: boolean;
  errorCountries: string | null;
  fetchCountries: () => Promise<void>;
}

export interface CountryListProps {
  countries: Country[];
  loadingCountries: boolean;
  errorCountries: string | null;
  onCountryClick: (country: Country) => void;
  fetchCountries: () => Promise<void>;
}
