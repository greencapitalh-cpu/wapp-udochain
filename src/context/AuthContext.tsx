// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import useApi from "../hooks/useApi";

type User = {
  _id?: string;
  username?: string;
  email?: string;
  credits?: number;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (t: string, u?: User | null) => void;
  logout: () => void;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { get } = useApi();

  // ✅ Verifica el token y obtiene /me al cargar
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const me = await get<User>("/api/auth/me");
        setUser(me || null);
      } catch (err) {
        console.warn("⚠️ Sesión inválida:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = (t: string, u?: User | null) => {
    localStorage.setItem("token", t);
    setToken(t);
    if (u) setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, loading, login, logout, setUser }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
