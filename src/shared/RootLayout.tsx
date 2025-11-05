// =======================================================
// 🔒 WAPP-AUTH — RootLayout.tsx
// Envoltorio general con AuthProvider y loader de sesión
// =======================================================

import { Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";

function Gate() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-udo-steel">
        Checking access...
      </div>
    );
  }
  return <Outlet />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
