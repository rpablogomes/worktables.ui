import React from "react";
import { Search } from "@vibe/core";
import styles from "./styles.module.scss";
import { useCountryStore } from "../../state/useCountries";

interface CountrySearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const { loadingCountries } = useCountryStore();

  return (
    <div className={styles.searchContainer}>
      <Search
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={onSearchChange}
        size={"medium"}
        className={styles.searchBar}
        disabled={loadingCountries}
      />
    </div>
  );
};

export default CountrySearch;
