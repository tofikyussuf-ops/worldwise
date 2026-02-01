import { useRouteLoaderData } from "react-router-dom";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList() {
  // 1. Get the data from the parent "appData" loader
  const cities = useRouteLoaderData("appData");

  // 2. We no longer need isLoading because the loader ensures data is ready
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // 3. Derived state (Calculating countries from cities)
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
