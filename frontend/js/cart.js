async function getCartCount() {
    if (!isAuthenticated()) return 0;
    try {
        const cart = await apiFetch('/cart');
        return cart && cart.cartItems ? cart.cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;
    } catch (e) {
        console.error("Cart error", e);
        return 0;
    }
}

async function updateCartBadgeCount() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        if (isAuthenticated()) {
            const count = await getCartCount();
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        } else {
            badge.style.display = 'none';
        }
    }
}

async function addToCartHandler(productId, name, image, price) {
    if (!isAuthenticated()) {
        showToast('Please login to add to cart', 'error');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const qtySelect = document.getElementById('qty');
    const qty = qtySelect ? parseInt(qtySelect.value) : 1;

    try {
        await apiFetch('/cart', 'POST', {
            product: productId,
            name,
            image,
            price,
            qty
        });
        showToast('Item added to cart', 'success');
        updateCartBadgeCount();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function removeFromCartHandler(productId) {
    try {
        await apiFetch(`/cart/${productId}`, 'DELETE');
        showToast('Item removed', 'success');
        await renderCart();
        updateCartBadgeCount();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function updateCartQty(productId, name, image, price, newQty) {
    try {
        await apiFetch('/cart', 'POST', {
            product: productId,
            name,
            image,
            price,
            qty: Number(newQty)
        });
        await renderCart();
        updateCartBadgeCount();
    } catch (error) {
        showToast(error.message, 'error');
    }
}


async function renderCart() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    if (!container || !summary) return;

    try {
        const cart = await apiFetch('/cart');

        if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
            container.innerHTML = `
                <div class="empty-cart flex align-center">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <a href="products.html" class="btn btn-primary mt-3 inline-block">Go Shopping</a>
                </div>
            `;
            summary.style.display = 'none';
            return;
        }

        container.innerHTML = cart.cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title"><a href="product.html?id=${item.product}">${item.name}</a></div>
                    <div>₹${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-actions">
                    <select onchange="updateCartQty('${item.product}', '${item.name}', '${item.image}', ${item.price}, this.value)" class="qty-select">
                        ${[...Array(10).keys()].map(x => `
                            <option value="${x + 1}" ${item.qty === x + 1 ? 'selected' : ''}>${x + 1}</option>
                        `).join('')}
                    </select>
                    <button class="btn btn-danger ml-2" onclick="removeFromCartHandler('${item.product}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');

        summary.style.display = 'block';
        const totalItems = cart.cartItems.reduce((acc, item) => acc + item.qty, 0);
        const subtotal = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

        document.getElementById('cart-count').innerText = totalItems;
        document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(2)}`;

    } catch (error) {
        container.innerHTML = `<p class="error-msg">Failed to load cart.</p>`;
    }
}
