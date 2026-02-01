
import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Button from "../components/Button";
import SpinnerFullPage from "../components/SpinnerFullPage";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  if (isSubmitting) return <SpinnerFullPage />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setIsSubmitting(true);
    const ok = await login(email, password); // works sync for demo; supports async if changed
    setIsSubmitting(false);

    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Logging in…" : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}
