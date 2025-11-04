// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../shared/RootLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      
    ],
  },
]);

export default router;
