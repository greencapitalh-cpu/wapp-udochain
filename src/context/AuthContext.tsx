// =======================================================
// 🔒 WAPP-AUTH — AuthContext.tsx (v2.1 final estable)
// Gestión completa de sesión y validación entre dominios
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
        // 1️⃣ Captura token de la URL si viene desde APP
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");

        if (tokenFromUrl) {
          localStorage.setItem("token", tokenFromUrl);
          setToken(tokenFromUrl);
          console.log("✅ [Auth] Token captured from URL");
          window.history.replaceState({}, "", window.location.pathname);
        }

        // 2️⃣ Recupera token local
        const localToken = tokenFromUrl || localStorage.getItem("token");
        if (!localToken) {
          console.warn("⚠️ [Auth] No token found → redirecting to APP login");
          window.location.href = "https://app.udochain.com/login";
          return;
        }
        setToken(localToken);

        // 3️⃣ Valida token con backend
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        console.log("🧩 [Auth] Validating /api/auth/me ...");

        const me = await get("/api/auth/me", { signal: controller.signal });
        clearTimeout(timeout);

        if (!me || !me._id) throw new Error("Invalid /me response");
        setUser(me);
        console.log("✅ [Auth] Validation OK:", me.email);
      } catch (err: any) {
        console.error("❌ [Auth] Validation failed:", err.message);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
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
