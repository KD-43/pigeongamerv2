import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "";

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url, timeoutMs) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const res = await fetch(url, { signal: controller.signal });
        return res.ok;
    } finally {
        clearTimeout(id);
    }
}

export function useBackendWarmup() {
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        let cancelled = false;

        async function run () {
            setStatus("waking");

            const url = `${API_BASE}/health`;

            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const ok = await fetchWithTimeout(url, 30000);
                    if (cancelled) return;

                    if (ok) {
                        setStatus("ready");
                        return;
                    }
                } catch (err) {
                    if (cancelled) return;
                    if (import.meta.env.DEV) {
                        if (err.name === "AbortError") {
                        console.warn("Warmup timed out (likely cold start)");
                        } else {
                        console.warn("Warmup network error:", err);
                        }
                    }
                }

                await sleep(1200 * (attempt + 1));
            }

            if (!cancelled) setStatus("failed");
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    return status;
}
