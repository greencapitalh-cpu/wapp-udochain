// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../shared/DashboardLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      
    ],
  },
]);

export default router;
