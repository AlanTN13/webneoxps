import React from "react";

const Section = ({ id, className = "", children }) => (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
        {children}
    </section>
);

export default Section;
