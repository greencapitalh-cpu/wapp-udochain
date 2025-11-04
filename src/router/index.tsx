import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../shared/RootLayout";
import DashboardLayout from "../shared/DashboardLayout";
import Home from "../pages/Home";
import PrivateRoute from "../shared/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Home /> },
        ],
      },
    ],
  },
]);

export default router;
