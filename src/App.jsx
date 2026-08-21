import React from "react";

import "./index.css";
import "./App.css";

import ServicesOverview from "./components/ServicesOverview";
import HowWeWork from "./components/HowWeWork";
import CTA from "./components/CTA";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import OperationalMirror from "./components/OperationalMirror";
import Logos from "./components/Logos";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();

  return (
    <Layout>
      <Hero />
      <OperationalMirror />
      <ServicesOverview />
      <Logos />
      <HowWeWork />
      <CTA />
    </Layout>
  );
}
