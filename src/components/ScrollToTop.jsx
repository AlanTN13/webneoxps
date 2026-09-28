import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            let animationFrame;
            const observer = new MutationObserver(() => {
                const target = document.getElementById(decodeURIComponent(hash.slice(1)));
                if (!target) return;
                observer.disconnect();
                animationFrame = window.requestAnimationFrame(() => {
                    target.scrollIntoView({ behavior: "auto" });
                });
            });
            observer.observe(document.getElementById("root"), { childList: true, subtree: true });
            const target = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (target) {
                observer.disconnect();
                animationFrame = window.requestAnimationFrame(() => {
                    target.scrollIntoView({ behavior: "auto" });
                });
            }
            return () => {
                observer.disconnect();
                window.cancelAnimationFrame(animationFrame);
            };
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });
        return undefined;
    }, [pathname, hash]);

    return null;
}
