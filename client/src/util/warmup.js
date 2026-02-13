import axios from "axios";

const API_BASE =
    import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}`
        : "";

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
};

export async function warmupBackend({
    timeoutMs = 25000,
    retries = 3,
    backoffMs = 1200,
} = {}) {
    const url = `${API_BASE}/health`;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            await axios.get(url, { timeout: timeoutMs });
            return true;
        } catch (err) {
            if (attempt === retries) return false;
            await sleep(backoffMs * (attempt + 1));
        }
    }

    return false;
}