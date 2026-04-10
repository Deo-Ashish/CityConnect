import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./app/routes";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";

import "leaflet/dist/leaflet.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <LocationProvider>
      <RouterProvider router={router} />
    </LocationProvider>
  </AuthProvider>,
);
