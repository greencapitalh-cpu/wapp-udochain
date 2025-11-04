// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../shared/RootLayout";
import DashboardLayout from "../shared/DashboardLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // envuelve con AuthProvider
    children: [
      {
        element: <DashboardLayout />, // usa tu layout con header y footer
        children: [
          { index: true, element: <Home /> }, // página principal
        ],
      },
    ],
  },
]);

export default router;
