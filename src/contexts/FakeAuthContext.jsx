// ...existing code...
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

// FAKE credentials for demo only
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function init() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : initialState;
  } catch {
    return initialState;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    undefined,
    init,
  );

  useEffect(() => {
    try {
      localStorage.setItem("auth", JSON.stringify({ user, isAuthenticated }));
    } catch {}
  }, [user, isAuthenticated]);

  function login(email, password) {
    const ok = email === FAKE_USER.email && password === FAKE_USER.password;
    if (ok) dispatch({ type: "login", payload: FAKE_USER });
    return ok; // caller can show errors
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
// ...existing code...
