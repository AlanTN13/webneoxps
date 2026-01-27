// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

// Noticias
import Noticias from "./pages/noticias/index.jsx";
import Detalle from "./pages/noticias/Detalle.jsx";

// Servicios
import DataEngineering from "./pages/servicios/DataEngineering.jsx";
import DataVisualization from "./pages/servicios/DataVisualization.jsx";
import AIInfrastructure from "./pages/servicios/AIInfrastructure.jsx";
import AIAgents from "./pages/servicios/AIAgents.jsx";
import SoftwareIntegrations from "./pages/servicios/SoftwareIntegrations.jsx";
import ProcessAutomation from "./pages/servicios/ProcessAutomation.jsx";
import FrontEndUX from "./pages/servicios/FrontEndUX.jsx";

import "./index.css";
import ScrollToTop from "./components/ScrollToTop";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 👇 Lo ponemos acá para que escuche todos los cambios de ruta */}
      <ScrollToTop />

      <Routes>
        {/* Landing principal */}
        <Route path="/" element={<App />} />

        {/* Landings de Servicios */}
        <Route
          path="/servicios/data-engineering"
          element={<DataEngineering />}
        />
        <Route
          path="/servicios/data-visualization"
          element={<DataVisualization />}
        />
        <Route
          path="/servicios/ai-infrastructure"
          element={<AIInfrastructure />}
        />
        <Route
          path="/servicios/ai-agents"
          element={<AIAgents />}
        />
        <Route
          path="/servicios/software-integrations"
          element={<SoftwareIntegrations />}
        />
        <Route
          path="/servicios/process-automation"
          element={<ProcessAutomation />}
        />
        <Route
          path="/servicios/frontend-ux"
          element={<FrontEndUX />}
        />

        {/* Blog */}
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/noticias/:slug" element={<Detalle />} />

        {/* Fallback */}
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
