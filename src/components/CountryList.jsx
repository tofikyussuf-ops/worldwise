import { useMemo } from "react";
import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";

function CountryList() {
  // 1. Get the data from the Cities context
  const { cities } = useCities();

  const countries = useMemo(() => {
    const map = new Map();
    cities.forEach((city) => {
      if (!map.has(city.country))
        map.set(city.country, { country: city.country, emoji: city.emoji });
    });
    return [...map.values()];
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
