import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Button from "../components/Button";
import SpinnerFullPage from "../components/SpinnerFullPage";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";

export default function Login() {
  // 1. State Management
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect logic: Get the page the user tried to visit, or default to "/app"
  const from = location.state?.from?.pathname || "/app";

  // 2. Effect: Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // 3. Handlers
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await login(email, password);

      if (!success) {
        setError("Invalid email or password.");
      }
      // Note: Navigation happens via the useEffect or the 'if (ok)' block below
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Early return for loading state
  if (isSubmitting) return <SpinnerFullPage />;

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null); // Clear error when user types
            }}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null); // Clear error when user types
              }}
              value={password}
            />
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}

        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}
