let adminProducts = [];

async function renderAdminProducts() {
    const list = document.getElementById('admin-product-list');
    try {
        adminProducts = await fetchProducts();

        if (!adminProducts || adminProducts.length === 0) {
            list.innerHTML = `<tr><td colspan="6" class="text-center">No products found.</td></tr>`;
            return;
        }

        list.innerHTML = adminProducts.map(p => `
            <tr>
                <td>${p._id.substring(0, 8)}...</td>
                <td>
                    <div class="flex items-center gap-2">
                        <img src="${p.image}" alt="${p.name}" width="40" height="40" style="border-radius: 4px; object-fit: cover;">
                        ${p.name.substring(0, 30)}
                    </div>
                </td>
                <td>₹${p.price.toFixed(2)}</td>
                <td><span class="category-badge">${p.category}</span></td>
                <td>
                    <span class="stock-status ${p.countInStock > 0 ? 'in-stock' : 'out-of-stock'}">
                        ${p.countInStock}
                    </span>
                </td>
                <td>
                    <div class="action-btns">
                        <button class="btn btn-primary" style="padding: 0.25rem 0.5rem;" onclick="editProduct('${p._id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger" style="padding: 0.25rem 0.5rem;" onclick="deleteProductHandler('${p._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        list.innerHTML = `<tr><td colspan="6" class="text-center text-error">Error loading products</td></tr>`;
    }
}

function openProductModal() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('modal-title').innerText = 'Add Product';
    document.getElementById('product-modal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function editProduct(id) {
    const product = adminProducts.find(p => p._id === id);
    if (!product) return;

    document.getElementById('product-id').value = product._id;
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('image').value = product.image;
    document.getElementById('category').value = product.category;
    document.getElementById('countInStock').value = product.countInStock;
    document.getElementById('description').value = product.description;

    document.getElementById('modal-title').innerText = 'Edit Product';
    document.getElementById('product-modal').style.display = 'block';
}

async function deleteProductHandler(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await apiFetch(`/products/${id}`, 'DELETE');
            showToast('Product deleted', 'success');
            await renderAdminProducts();
        } catch (error) {
            showToast(error.message, 'error');
        }
    }
}

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('category').value;
    const countInStock = document.getElementById('countInStock').value;
    const description = document.getElementById('description').value;

    const productData = { name, price, image, category, countInStock, description };

    try {
        if (id) {
            // Update
            await apiFetch(`/products/${id}`, 'PUT', productData);
            showToast('Product updated successfully', 'success');
        } else {
            // Create
            await apiFetch('/products', 'POST', productData);
            showToast('Product created successfully', 'success');
        }
        closeProductModal();
        await renderAdminProducts();
    } catch (error) {
        showToast(error.message, 'error');
    }
});
