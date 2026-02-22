// Common Navbar and Footer Initialization
async function initUI() {
    renderNavbar();
    renderFooter();
    renderToastContainer();
    if (typeof updateCartBadgeCount === 'function') {
        updateCartBadgeCount();
    }
}

function renderNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    let authLinks = '';

    // Check if variables from auth.js exist
    const authenticated = typeof isAuthenticated === 'function' && isAuthenticated();
    const adminMode = typeof isAdmin === 'function' && isAdmin();

    if (authenticated) {
        const user = getUser();
        if (adminMode) {
            authLinks += `<li><a href="admin.html">Dashboard</a></li>`;
        }
        authLinks += `
            <li><span style="font-weight: 600;">Hi, ${user.name}</span></li>
            <li><a href="#" onclick="logout()">Logout</a></li>
        `;
    } else {
        authLinks = `
            <li><a href="login.html">Login</a></li>
        `;
    }

    container.innerHTML = `
        <header class="navbar">
            <div class="container nav-container">
                <a href="index.html" class="nav-logo">
                    <i class="fas fa-shopping-bag text-accent"></i> LuxeCart
                </a>
                
                <button class="mobile-menu-btn" onclick="toggleMenu()">
                    <i class="fas fa-bars"></i>
                </button>

                <nav>
                    <ul class="nav-links" id="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                        <li>
                            <a href="cart.html" class="cart-icon-wrapper">
                                <i class="fas fa-shopping-cart"></i> Cart
                                <span class="cart-badge" id="cart-badge" style="display:none">0</span>
                            </a>
                        </li>
                        ${authLinks}
                    </ul>
                </nav>
            </div>
        </header>
    `;

    // highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

function renderFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div>
                        <div class="footer-logo mb-2">LuxeCart</div>
                        <p style="color: #cbd5e1;">Premium products for your lifestyle.</p>
                    </div>
                    <ul class="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="footer-bottom">
                    &copy; ${new Date().getFullYear()} LuxeCart. All rights reserved.
                </div>
            </div>
        </footer>
    `;
}

function renderToastContainer() {
    const container = document.getElementById('toast-container');
    if (!container) return;
    container.innerHTML = `<div id="toast" class="toast"></div>`;
}

function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('active');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.className = `toast ${type} show`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Display common products grid
function displayProducts(products, container) {
    if (!products || products.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">No products found.</p>`;
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <a href="product.html?id=${product._id}">
                <img src="${product.image}" alt="${product.name}" class="product-card-img">
            </a>
            <div class="product-card-body">
                <a href="product.html?id=${product._id}">
                    <h3 class="product-card-title" title="${product.name}">${product.name}</h3>
                </a>
                <p class="product-card-price">₹${product.price.toFixed(2)}</p>
                <button 
                    onclick="window.location.href='product.html?id=${product._id}'" 
                    class="btn btn-primary" style="margin-top: auto;">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', initUI);
