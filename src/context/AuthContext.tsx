// =======================================================
// 🔒 WAPP-AUTH — AuthContext.tsx (versión reforzada con logs y control de flujo)
// Gestiona la sesión local en wapp.udochain.com
// Captura ?token= desde app.udochain.com y valida con /api/auth/me
// =======================================================

import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { get } = useApi();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("🔹 [Auth] Starting token validation...");

      try {
        // 1️⃣ Captura token desde la URL si viene desde APP
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          setToken(tokenFromUrl);
          console.log("✅ [Auth] Token captured from URL:", tokenFromUrl);
          // Limpia el token de la barra del navegador
          window.history.replaceState({}, "", window.location.pathname);
        }

        // 2️⃣ Recupera token local
        const localToken = tokenFromUrl || localStorage.getItem("token");
        if (!localToken) {
          console.warn("⚠️ [Auth] No token found. Redirecting to APP login...");
          window.location.href = "https://app.udochain.com/login";
          return;
        }

        setToken(localToken);
        console.log("🧩 [Auth] Validating token with API...");

        // 3️⃣ Valida token con backend
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const me = await get("/api/auth/me", { signal: controller.signal });
        clearTimeout(timeout);

        console.log("✅ [Auth] Validation successful:", me);

        if (!me || !me._id) throw new Error("Invalid user response");
        setUser(me);
      } catch (err: any) {
        console.error("❌ [Auth] Validation failed:", err.message);
        // 🚫 No eliminar el token de inmediato (solo para depuración controlada)
        localStorage.setItem("lastAuthError", err.message || "Unknown");
        // Se mantiene el token para revisión posterior
        window.location.href = "https://app.udochain.com/login";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    window.location.href = "https://app.udochain.com/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logout }}>
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
