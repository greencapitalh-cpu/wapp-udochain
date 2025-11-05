// =======================================================
// 🔒 WAPP-AUTH — AuthContext.tsx
// Gestiona la sesión local en wapp.udochain.com
// Captura ?token= desde app.udochain.com y valida con /api/auth/me
// =======================================================

import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { get } = useApi();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 1️⃣ Captura token desde la URL si viene desde APP
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        // Limpia el token de la barra del navegador
        window.history.replaceState({}, "", window.location.pathname);
      }

      // 2️⃣ Recupera token local
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "https://app.udochain.com/login";
        return;
      }

      // 3️⃣ Valida token con backend
      try {
        const me = await get("/api/auth/me");
        setUser(me);
      } catch {
        // Token inválido → redirige a login central
        localStorage.removeItem("token");
        window.location.href = "https://app.udochain.com/login";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "https://app.udochain.com/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
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
