

function formatPrice(value) {
    return Number(value).toLocaleString("en-US");
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById("cart-items");
    const bottomActions = document.getElementById("cart-bottom-actions");
    const cartCountText = document.getElementById("cart-count-text");
    const summaryItems = document.getElementById("summary-items");
    const subtotalValue = document.getElementById("cart-subtotal");
    const grandTotal = document.getElementById("cart-grand-total");

    const count = getCartCount();
    const subtotal = getCartSubtotal();
    const itemsLabel = `${count} ${count === 1 ? "item" : "items"}`;

    cartCountText.innerHTML = `You have <span>${itemsLabel}</span> in your cart`;
    summaryItems.textContent = `${itemsLabel} in your cart`;
    subtotalValue.textContent = `${formatPrice(subtotal)} EGP`;
    grandTotal.textContent = formatPrice(subtotal);

    if (!cart.length) {
        cartItems.innerHTML = `
            <div class="cart-empty text-center py-5">
                <i class="fa-solid fa-cart-shopping fa-2x text-muted mb-3"></i>
                <p class="mb-3">Your cart is empty</p>
                <a href="index.html" class="continue-shopping">
                    <i class="fa-solid fa-arrow-left"></i> Continue Shopping
                </a>
            </div>
        `;
        bottomActions.classList.add("d-none");
        return;
    }

    bottomActions.classList.remove("d-none");

    cartItems.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item" data-id="${item.id}">
            <div class="product-image-wrapper">
                <img
                    src="${item.image}"
                    class="product-image"
                    alt="${escapeHtml(item.title)}"
                />
            </div>
            <div class="product-info">
                <div class="product-name">${escapeHtml(item.title)}</div>
                <div class="product-meta">
                    <span class="category">${escapeHtml(item.category)}</span>
                    <span class="meta-dot"></span>
                    <span>SKU: ${escapeHtml(item.sku)}</span>
                </div>
                <div class="price-row">
                    <span class="price">${formatPrice(item.price)} EGP</span>
                    <span class="per-unit">per unit</span>
                </div>
                <span class="stock-badge">
                    <i class="fa-solid fa-check"></i> In Stock
                </span>
            </div>
            <div class="item-actions">
                <div class="quantity-box">
                    <button class="quantity-btn decrease-qty" type="button">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="quantity-number">${item.quantity}</span>
                    <button class="quantity-btn plus increase-qty" type="button">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
            <div class="item-total">
                <span class="total-label">Total</span>
                <span class="total-price">${formatPrice(item.price * item.quantity)}</span>
                <span class="currency">EGP</span>
            </div>
            <button class="delete-btn" type="button">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `
        )
        .join("");
}

document.getElementById("cart-items").addEventListener("click", function (event) {
    const cartItem = event.target.closest(".cart-item");

    if (!cartItem) {
        return;
    }

    const productId = cartItem.dataset.id;
    const cart = getCart();
    const item = cart.find((cartItemData) => cartItemData.id === productId);

    if (!item) {
        return;
    }

    if (event.target.closest(".increase-qty")) {
        updateCartQuantity(productId, item.quantity + 1);
        renderCart();
        return;
    }

    if (event.target.closest(".decrease-qty")) {
        updateCartQuantity(productId, item.quantity - 1);
        renderCart();
        return;
    }

    if (event.target.closest(".delete-btn")) {
        removeFromCart(productId);
        renderCart();
    }
});

document.getElementById("clear-cart").addEventListener("click", function (event) {
    event.preventDefault();
    clearCart();
    renderCart();
});

renderCart();