import { Link, useNavigation } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Homepage() {
  const { isAuthenticated } = useAuth();

  // Gets the navigation state of the entire app (requires Data Router setup)
  const navigation = useNavigation();

  // Logic to show a loading state if the app is transitioning to the map
  const isFetchingApp = isAuthenticated && navigation.state === "loading";

  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>

        {/* Dynamic Link based on Auth status */}
        <Link
          to={isAuthenticated ? "/app" : "/login"}
          className="cta"
          // accessibility: tells screen readers the button is busy
          aria-busy={isFetchingApp}
        >
          {isFetchingApp
            ? "Opening App..."
            : isAuthenticated
              ? "Go to App"
              : "Start tracking now"}
        </Link>
      </section>
    </main>
  );
}
