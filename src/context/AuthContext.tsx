import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("token");
      const local = localStorage.getItem("token");
      const activeToken = tokenFromUrl || local;

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        window.history.replaceState({}, "", window.location.pathname);
      }

      // 🔒 Si no hay token, volver al login principal
      if (!activeToken) {
        window.location.href = "https://app.udochain.com";
        return;
      }

      setToken(activeToken);

      try {
        // 🧩 Obtener información del usuario desde el backend
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${activeToken}` },
        });

        if (!res.ok) throw new Error("Invalid token");

        const me = await res.json();
        setUser(me);

        // ✅ Guardar email para los demás módulos (Validate, BioID, etc.)
        if (me?.email) {
          localStorage.setItem("userEmail", me.email);
        }

      } catch (err) {
        console.error("❌ Auth error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        window.location.href = "https://app.udochain.com";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
