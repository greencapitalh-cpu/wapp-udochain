// src/hooks/useApi.ts
type Json = Record<string, any>;

export default function useApi() {
  // URL base para llamadas a tu API de producción
  const base =
    import.meta.env.VITE_API_URL || "https://api.udochain.com/api";

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
      throw new Error(msg);
    }
    return data as T;
  };

  const get = async <T = any>(path: string): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return handle<T>(res);
  };

  const postJson = async <T = any>(path: string, body?: Json): Promise<T> => {
    const token = localStorage.getItem("token");
    const res = await fetch(url(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return handle<T>(res);
  };

  return { base, get, postJson };
}
