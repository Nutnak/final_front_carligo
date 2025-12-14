"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function UseSmoothScroll({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: "easeInOut",
            smooth: true,
            smoothTouch: true,
            anchors: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            lenis.destroy();
        };
    }, []); // Empty dependency array means this runs once on mount
    return children;
}
