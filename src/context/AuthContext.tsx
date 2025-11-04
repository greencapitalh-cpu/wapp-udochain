import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { get } = useApi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    // Si viene desde app, lo guarda
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      window.history.replaceState({}, "", window.location.pathname);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "https://app.udochain.com/login";
      return;
    }

    (async () => {
      try {
        const me = await get("/api/auth/me");
        setUser(me);
      } catch {
        localStorage.removeItem("token");
        window.location.href = "https://app.udochain.com/login";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};
