const API_URL = 'http://localhost:5000/api';
// Once deployed, change to deployed URL, e.g. 'https://your-backend.onrender.com/api'

async function apiFetch(endpoint, method = 'GET', body = null) {
    const headers = {
        'Content-Type': 'application/json'
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
}

async function fetchProducts() {
    return await apiFetch('/products');
}

async function fetchProductById(id) {
    return await apiFetch(`/products/${id}`);
}
