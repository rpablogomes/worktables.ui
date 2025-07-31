import { create } from "zustand";
import mondaySdk from "monday-sdk-js";
import { Country, CountryState } from "../types/countries";

const monday = mondaySdk();

export const useCountryStore = create<CountryState>((set, get) => ({
  countries: [],
  loadingCountries: true,
  errorCountries: null,
  fetchCountries: async () => {
    set({ loadingCountries: true, errorCountries: null });

    try {
      const boardId = 9671493720

      const query = `
        query {
          boards(ids: ${boardId}) {
            items_page {
              items {
                id
                name
                column_values {
                  id
                  text
                  column {
                    title
                  }
                } 
              }
            } 
          } 
        }
      `;

      const response = await monday.api(query);

      if (
        response.data &&
        response.data.boards &&
        response.data.boards.length > 0
      ) {
        const board = response.data.boards[0];
        const items = board.items_page.items;

        const formattedCountries: Country[] = items.map((item: any) => {
          const countryData: Partial<Country> = {
            id: item.id,
            name: item.name,
          };

          item.column_values.forEach((col: any) => {
            switch (col.column.title) {
              case 'Region':
                countryData.region = col.text;
                break;
              case 'Capital':
                countryData.capital = col.text;
                break;

            }
          });
          return countryData as Country;
        });

        set({ countries: formattedCountries, loadingCountries: false });
      } else {
        set({
          errorCountries: "No country found on the board.",
          loadingCountries: false,
        });
      }
    } catch (err: any) {
      console.error("Error to fetch data from monday.com:", err);
      set({
        errorCountries: `Error country list: ${err.message || 'Unknown error'}.`,
        loadingCountries: false,
      });
    }
  }
}));