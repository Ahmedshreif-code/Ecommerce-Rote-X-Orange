const CART_KEY = "freshcart_cart";

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addProductToCart(product, quantity = 1) {
    if (!product || !product._id) {
        return;
    }

    const cart = getCart();
    const price = product.priceAfterDiscount || product.price;
    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product._id,
            title: product.title,
            image: product.imageCover,
            price,
            category: product.category?.name || "",
            sku: String(product._id).slice(-6).toUpperCase(),
            quantity,
        });
    }

    saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find((cartItem) => cartItem.id === productId);

    if (!item) {
        return;
    }

    item.quantity = Math.max(1, quantity);
    saveCart(cart);
}

function removeFromCart(productId) {
    const cart = getCart().filter((item) => item.id !== productId);
    saveCart(cart);
}

function clearCart() {
    saveCart([]);
}

function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
    return getCart().reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}