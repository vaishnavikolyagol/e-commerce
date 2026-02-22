function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function isAdmin() {
    const user = getUser();
    return user && user.isAdmin;
}

async function loginUser(email, password) {
    try {
        const data = await apiFetch('/auth/login', 'POST', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        showToast('Login successful!', 'success');
        setTimeout(() => {
            window.location.href = data.isAdmin ? 'admin.html' : 'index.html';
        }, 1000);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function registerNewUser(name, email, password) {
    try {
        const data = await apiFetch('/auth/register', 'POST', { name, email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        showToast('Registration successful!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}
