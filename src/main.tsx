import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import correcto
import "./styles/global.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Ahora todo está dentro del AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
