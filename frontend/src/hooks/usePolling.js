import { useEffect, useRef } from "react";

// Polls fn every `interval` ms while tab is visible.
// Does NOT run on mount — callers handle initial fetch themselves.
const usePolling = (fn, interval = 30000) => {
    const fnRef = useRef(fn);

    // Always keep ref current so stale closures never matter
    useEffect(() => {
        fnRef.current = fn;
    });

    useEffect(() => {
        const tick = () => fnRef.current();

        const id = setInterval(tick, interval);

        // Re-fetch immediately when user switches back to this tab
        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                fnRef.current();
            }
        };
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            clearInterval(id);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, [interval]); // interval is stable, no stale closure risk
};

export default usePolling;