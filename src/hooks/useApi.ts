// =======================================================
// 🔒 WAPP-AUTH — useApi.ts (v2.1 final estable)
// Cliente API con headers dinámicos y soporte completo de opciones
// =======================================================

type Json = Record<string, any>;

export default function useApi() {
  const base = import.meta.env.VITE_API_URL || "https://api.udochain.com/api";

  const url = (path: string) =>
    path.startsWith("http")
      ? path
      : `${base.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;

  const handle = async <T = any>(res: Response): Promise<T> => {
    const text = await res.text();
    let data: any;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || "Unexpected response" };
    }
    if (!res.ok) {
      const msg = data?.message || res.statusText || "Request failed";
      console.error("❌ API error:", msg);
      throw new Error(msg);
    }
    return data as T;
  };

  // ✅ Método GET mejorado con opciones (signal, headers, credentials, etc.)
  const get = async <T = any>(path: string, options: RequestInit = {}): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      credentials: "include",
      ...options,
    });
    return handle<T>(res);
  };

  // ✅ POST JSON con soporte de opciones
  const postJson = async <T = any>(
    path: string,
    body?: Json,
    options: RequestInit = {}
  ): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
    return handle<T>(res);
  };

  return { base, get, postJson };
}
