import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Guard clause: if for some reason the component renders without a user
  if (!user) return null;

  function handleClick() {
    logout();
    // Use replace: true so the user can't "go back" into the protected app
    navigate("/", { replace: true });
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
