import { useNavigation, useRouteLoaderData } from "react-router-dom";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import Spinner from "../components/Spinner";
import { CitiesProvider } from "../contexts/CitiesContext";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  const appData = useRouteLoaderData("appData");
  const initialCities = appData || [];

  return (
    <CitiesProvider initialCities={initialCities}>
      <div className={styles.app}>
        <Sidebar />

        {isLoading ? <Spinner /> : <Map />}
        <User />
      </div>
    </CitiesProvider>
  );
}

export default AppLayout;
