// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../shared/RootLayout";
import DashboardLayout from "../shared/DashboardLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <DashboardLayout>
            <Home />
          </DashboardLayout>
        ),
      },
      // 🔹 Aquí podrás agregar futuras rutas internas si lo deseas:
      // { path: "dashboard", element: <DashboardLayout><Dashboard /></DashboardLayout> },
      // { path: "validate", element: <Validate /> },
    ],
  },
]);

export default router;
