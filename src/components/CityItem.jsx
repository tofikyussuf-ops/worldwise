import { Link, useRevalidator } from "react-router-dom"; // 1. Added useRevalidator
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  // 2. Initialize the revalidator here inside the component
  const revalidator = useRevalidator();

  async function handleClick(e) {
    e.preventDefault();

    // 3. Make sure to await the deletion so it finishes in the DB first
    await deleteCity(id);

    // 4. Trigger the revalidation! This re-runs the 'appData' loader
    // that the Map and CityList are listening to.
    revalidator.revalidate();
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
