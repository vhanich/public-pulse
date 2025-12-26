import {httpRequest} from "@/api/httpClient.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const buildUrl = (query, period) => {
    const url = new URL(query, BASE_URL);

    url.searchParams.set('from', period.from);
    url.searchParams.set('to', period.to);
    url.searchParams.set('period', period.period);

    return url.toString();
};

export const fetchData = async ({endpoint, token, periods}) => {
    const requests = periods
        ? periods.map((p) =>
            httpRequest(buildUrl(endpoint, p), {
                headers: {'X-Firebase-AppCheck': token},
            }).then((res) => res.json())
        )
        : [
            httpRequest(endpoint, {
                headers: {'X-Firebase-AppCheck': token},
            }).then((res) => {
                if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
                return res.json();
            }),
        ];

    return Promise.all(requests);
};

export const fetchCharts = async ({query, periods, token}) => {
    return fetchData({endpoint: query, periods, token});
};

export const fetchNews = async (query, token) => {
    2
    const res = await httpRequest(`${import.meta.env.VITE_API_BASE_URL}${query}`, {
        headers: {"X-Firebase-AppCheck": token},
    });

    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const data = await res.json();
    return data;
};
