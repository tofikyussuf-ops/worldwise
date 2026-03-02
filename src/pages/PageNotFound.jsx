import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main>
      <h1>Page not found 😢</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Return to Homepage
      </Link>
    </main>
  );
}
