import React, { useEffect, useRef, useState } from "react";

const MetricCounter = ({ to = 100, suffix = "", duration = 1400, className = "" }) => {
    const [val, setVal] = useState(0);
    const startRef = useRef(null);

    useEffect(() => {
        let raf;
        const step = (t) => {
            if (!startRef.current) startRef.current = t;
            const p = Math.min((t - startRef.current) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.floor(eased * to));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [to, duration]);

    return (
        <span className={className}>
            {val.toLocaleString()}
            {suffix}
        </span>
    );
};

export default MetricCounter;
