// =======================================================
// 🔒 WAPP-AUTH — DashboardLayout.tsx
// Protege todas las vistas internas del WAPP con sesión activa
// =======================================================

import { Outlet } from "react-router-dom";
import DashboardHeader from "../ui/DashboardHeader";
import Footer from "../ui/Footer";
import PrivateRoute from "./PrivateRoute";

export default function DashboardLayout() {
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col bg-white text-udo-ink">
        <DashboardHeader />
        <main className="flex-1 container-narrow px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </PrivateRoute>
  );
}
