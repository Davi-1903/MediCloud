let accessToken = null;

export function setAccessToken(token) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export async function tryRefresh() {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) return null;

    const data = await response.json(); // { token, token_type, role }
    setAccessToken(data.token);
    return data;
}

export async function GET(url, headers = {}) {
    let response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 401) {
        const refreshed = await tryRefresh();
        if (refreshed) {
            response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: { ...headers, Authorization: `Bearer ${refreshed.token}` },
            });
        }
    }

    const data = await response.json();
    data.status = response.status;
    return data;
}

export async function POST(url, data, headers = {}) {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { ...headers, 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        const refreshed = await tryRefresh();
        if (refreshed) {
            response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: { ...headers, 'Content-Type': 'application/json', Authorization: `Bearer ${refreshed.token}` },
                body: JSON.stringify(data),
            });
        }
    }

    const result = await response.json();
    result.status = response.status;
    return result;
}

export async function PATCH(url, data, headers = {}) {
    const send = token =>
        fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            headers: { ...headers, 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: data ? JSON.stringify(data) : undefined,
        });

    let response = await send(accessToken);

    if (response.status === 401) {
        const refreshed = await tryRefresh();
        if (refreshed) response = await send(refreshed.token);
    }

    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    result.status = response.status;
    return result;
}