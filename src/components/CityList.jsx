import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { getCities } from "../contexts/CitiesContext";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities } = useCities();
  if (!cities || !cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const cities = await getCities();
  return cities;
}

export default CityList;
