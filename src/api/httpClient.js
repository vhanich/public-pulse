const DEFAULT_TIMEOUT = 10_000;
const DEFAULT_RETRIES = 3;

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, options = {}, timeout) => {
    const controller = new AbortController();

    const id = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const res = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        if (!res.ok) {
            if (res.status >= 500) {
                throw new Error(`SERVER_ERROR_${res.status}`);
            }
            throw new Error(`HTTP_ERROR_${res.status}`);
        }

        return res;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('TIMEOUT');
        }
        throw error;
    } finally {
        clearTimeout(id);
    }
};

export const httpRequest = async (
    url,
    options = {},
    {
        timeout = DEFAULT_TIMEOUT,
        retries = DEFAULT_RETRIES,
        retryDelay = 500,
    } = {}
) => {
    try {
        return await fetchWithTimeout(url, options, timeout);
    } catch (error) {
        const canRetry =
            retries > 0 &&
            (error.message === 'TIMEOUT' ||
                error.message.startsWith('SERVER_ERROR'));

        if (!canRetry) {
            throw error;
        }

        await sleep(retryDelay);

        return httpRequest(url, options, {
            timeout,
            retries: retries - 1,
            retryDelay: retryDelay * 2,
        });
    }
};
