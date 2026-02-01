import { useMemo } from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  // 1. Get the data from the Cities context
  const { cities } = useCities();
 
  const countries = useMemo(() => {
    if (!cities) return [];
    const map = new Map();
    for (const city of cities) {
      if (!map.has(city.country)) {
        map.set(city.country, { country: city.country, emoji: city.emoji });
      }
    }
    return Array.from(map.values());
  }, [cities]);

  // 2. Guard for missing data
  if (!cities || !cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
