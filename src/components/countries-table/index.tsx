import React, { useCallback, useMemo } from "react";
import {
  Box,
  Text,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHeader,
  Loader,
} from "@vibe/core";

import styles from "./styles.module.scss";
import { Country, CountryListProps } from "../../types/countries";

const CountryList: React.FC<CountryListProps> = ({
  countries,
  loadingCountries,
  onCountryClick,
}) => {
  const getRegionColor = useCallback((region: string): string => {
    switch (region) {
      case "Asia":
        return "#FFADAD";
      case "Europe":
        return "#BADA55";
      case "Africa":
        return "#FFB347";
      case "Oceania":
        return "#C0FFEE";
      case "Americas":
        return "#ADD8E6";
      default:
        return "#A9A9A9";
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "name",
        title: "Country",
        info: "Country Name",
        render: (item: Country) => <Text>{item.name}</Text>,
      },
      {
        id: "region",
        title: "Region",
        info: "Geographical Region",
        render: (item: Country) => (
          <Box
            className={styles.regionTag}
            style={{
              backgroundColor: getRegionColor(item.region),
            }}
          >
            <Text>{item.region}</Text>
          </Box>
        ),
      },
      {
        id: "capital",
        title: "Capital",
        info: "Capital City",
        render: (item: Country) => <Text>{item.capital}</Text>,
      },
    ],
    [getRegionColor]
  );

  return (
    <>
      {loadingCountries ? (
        <div className={styles.centeredContainer}>
          <Loader size="medium" />
        </div>
      ) : (
        <Table
          columns={columns}
          errorState={<div className={styles.noResultsText}>Error</div>}
          emptyState={<div className={styles.noResultsText}> </div>}
          className={styles.countryTable}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <Text className={styles.columns}>{column.title}</Text>
              </TableCell>
            ))}
          </TableHeader>

          <TableBody>
            {countries.map((country: Country) => (
              <>
                <div className={styles.pinkBorder}></div>
                <div onClick={() => onCountryClick(country)}>
                  <TableRow key={country.id} className={styles.countryTableRow}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.render(country)}
                      </TableCell>
                    ))}
                  </TableRow>
                </div>
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CountryList;
