// src/main.jsx
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import { radarFixture } from "./pages/radar/fixtures";

import "./index.css";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

const Noticias = lazy(() => import("./pages/noticias/index.jsx"));
const Detalle = lazy(() => import("./pages/noticias/Detalle.jsx"));
const DataEngineering = lazy(() => import("./pages/servicios/DataEngineering.jsx"));
const DataVisualization = lazy(() => import("./pages/servicios/DataVisualization.jsx"));
const AIInfrastructure = lazy(() => import("./pages/servicios/AIInfrastructure.jsx"));
const AIAgents = lazy(() => import("./pages/servicios/AIAgents.jsx"));
const SoftwareIntegrations = lazy(() => import("./pages/servicios/SoftwareIntegrations.jsx"));
const ProcessAutomation = lazy(() => import("./pages/servicios/ProcessAutomation.jsx"));
const FrontEndUX = lazy(() => import("./pages/servicios/FrontEndUX.jsx"));
const RadarControlCenter = lazy(() => import("./pages/radar/RadarControlCenter.jsx"));
const SolutionLanding = lazy(() => import("./pages/SolutionLanding.jsx"));


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 👇 Lo ponemos acá para que escuche todos los cambios de ruta */}
      <ScrollToTop />

      <Suspense fallback={<div className="route-loading">Cargando NexOps…</div>}>
      <Routes>
        {/* Landing principal */}
        <Route path="/" element={<App />} />

        {/* Nueva arquitectura comercial */}
        <Route path="/soluciones/:slug" element={<SolutionLanding />} />

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

        {/* Radar Control Center — read-only */}
        <Route path="/radar/*" element={<RadarControlCenter data={radarFixture} />} />

        {/* Fallback */}
        <Route path="*" element={<App />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
