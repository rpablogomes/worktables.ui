import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import CountrySearch from "../../components/search-bar";
import CountryWeatherModal from "../../components/country-weather-modal";
import { useCountryStore } from "../../state/useCountries";
import { Country } from "../../types/countries";

import { useWeatherStore } from "../../state/useWeather";
import CountryList from "../../components/countries-table";

const MondayBoard: React.FC = () => {
  const { countries, loadingCountries, errorCountries, fetchCountries } =
    useCountryStore();

  const { weatherData, loadingWeather, weatherError, fetchWeather } =
    useWeatherStore();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (country.capital &&
        country.capital.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (country.region &&
        country.region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
    fetchWeather(country.name);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div className={styles.mondayBoardContainer}>
      <CountrySearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CountryList
        countries={filteredCountries}
        loadingCountries={loadingCountries}
        errorCountries={errorCountries}
        onCountryClick={handleCountryClick}
        fetchCountries={fetchCountries}
      />
      <CountryWeatherModal
        show={isModalOpen}
        country={selectedCountry}
        weatherData={weatherData}
        loadingWeather={loadingWeather}
        weatherError={weatherError}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MondayBoard;
