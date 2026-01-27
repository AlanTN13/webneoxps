import { useEffect } from "react";

export const useReveal = (selector = "[data-reveal]") => {
    useEffect(() => {
        const els = document.querySelectorAll(selector);
        els.forEach((el) => {
            el.classList.add("opacity-0", "translate-y-4");
            el.style.transition = "opacity .6s ease, transform .6s ease";
        });

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach(({ target, isIntersecting }) => {
                    if (isIntersecting) {
                        target.classList.remove("opacity-0", "translate-y-4");
                        target.classList.add("opacity-100", "translate-y-0");
                        io.unobserve(target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [selector]);
};
