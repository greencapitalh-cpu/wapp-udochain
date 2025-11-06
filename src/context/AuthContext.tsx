// =======================================================
// 🔐 WAPP — AuthContext.tsx (versión estable final)
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
      console.log("🔹 [Auth] Iniciando validación en WAPP...");

      // 1️⃣ Buscar token desde URL o localStorage
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");
      const storedToken = localStorage.getItem("token");

      let activeToken = tokenFromUrl || storedToken;

      if (tokenFromUrl) {
        console.log("✅ [Auth] Token recibido por URL:", tokenFromUrl);
        localStorage.setItem("token", tokenFromUrl);
        window.history.replaceState({}, "", window.location.pathname);
      } else if (storedToken) {
        console.log("🧩 [Auth] Token existente en localStorage.");
      } else {
        console.warn("⚠️ [Auth] No hay token disponible (ni URL ni localStorage).");
      }

      // 2️⃣ Si no hay token, mostrar login (sin redirigir de inmediato)
      if (!activeToken) {
        setLoading(false);
        setUser(null);
        return;
      }

      setToken(activeToken);

      // 3️⃣ Intentar validar el token con el backend
      try {
        console.log("🧩 [Auth] Validando token con /api/auth/me ...");
        const me = await get("/api/auth/me");
        if (!me || !me._id) throw new Error("Respuesta inválida de usuario");
        console.log("✅ [Auth] Usuario autenticado:", me.email);
        setUser(me);
      } catch (err: any) {
        console.error("❌ [Auth] Token inválido o expirado:", err.message);
        localStorage.removeItem("token");
        setUser(null);
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
