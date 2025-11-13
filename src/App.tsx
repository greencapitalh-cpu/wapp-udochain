import React from "react";
 { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Error from "./pages/Error";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}
