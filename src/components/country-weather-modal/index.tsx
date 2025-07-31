import React from "react";
import { Modal, Loader } from "@vibe/core";
import styles from "./styles.module.scss";
import { CountryDetailModal } from "../../types/country-detail-modal";

const CountryWeatherModal: React.FC<CountryDetailModal> = ({
  show,
  country,
  weatherData,
  loadingWeather,
  weatherError,
  onClose,
}) => {
  if (!show || !country) {
    return null;
  }

  return (
    <Modal
      show={show}
      title={`${country.name} Details`}
      onClose={onClose}
      width="40rem"
    >
      <>
        {loadingWeather && (
          <div className={styles.centeredContainer}>
            <Loader size="medium" />
          </div>
        )}
        {weatherError && <p>Weather Error - {weatherError})</p>}
        {weatherData && weatherData.current && (
          <>
            <p>
              Location: {weatherData.location.name} -{" "}
              {weatherData.location.country} - {weatherData.location.region}
            </p>
            <p>Condition: {weatherData.current.condition.text}</p>
            <p>Wind: {weatherData.current.wind_mph} mph</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </>
        )}
        {!loadingWeather && !weatherData && !weatherError && (
          <p className={styles.noWeatherData}>No weather data available yet.</p>
        )}
      </>
    </Modal>
  );
};

export default CountryWeatherModal;
