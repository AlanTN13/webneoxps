import React from "react";
import Section from "./ui/Section";
import IntegrationsMarquee from "./IntegrationsMarquee";
import ClientsMarquee from "./ClientsMarquee";

const Logos = () => (
    <Section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4">
            <IntegrationsMarquee />
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-800 mt-10">
                Equipos que confían en nosotros
            </h2>
            <ClientsMarquee />
        </div>
    </Section>
);

export default Logos;
