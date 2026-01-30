// src/App.jsx
import React, { useEffect } from "react";
import Rellax from "rellax";

import "./index.css";
import "./App.css";

import ServicesOverview from "./components/ServicesOverview";
import HowWeWork from "./components/HowWeWork";
import CTA from "./components/CTA";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Logos from "./components/Logos";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  // Parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!prefersReduced.matches && window.innerWidth >= 640) {
      try {
        const r = new Rellax(".rellax", { center: false });
        return () => {
          if (r && typeof r.destroy === "function") {
            r.destroy();
          }
        };
      } catch (e) {
        console.warn("Rellax initialization failed:", e);
      }
    }
  }, []);

  useReveal();

  return (
    <Layout>
      <Hero />
      <ServicesOverview />
      <Logos />
      <HowWeWork />
      <CTA />
    </Layout>
  );
}
