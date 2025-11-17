// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Noticias from "./pages/noticias/index.jsx";
import Detalle from "./pages/noticias/Detalle.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing principal */}
        <Route path="/" element={<App />} />

        {/* Blog */}
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:slug" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
