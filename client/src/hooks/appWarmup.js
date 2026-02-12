import { warmupBackend } from "../util/warmup";
import { useEffect, useState } from "react";

export function useAppWarmup () {
    const [ isWaking, setIsWaking ] = useState(true);
    const [ wakeFailed, setWakeFailed ] = useState(false);

    useEffect(() => {
        let cancelled = false;
        async function run () {
            const ok = await warmupBackend();
            if (cancelled) return;

            setIsWaking(false);
            if (!ok) setWakeFailed(true);
        }

        run();

        return () => {
            cancelled = true;
        };
    }, [])

    return { isWaking, wakeFailed };
}