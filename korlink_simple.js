let cart = [];

// Add item to cart
function addCart(name, price) {
    const item = cart.find(p => p.name === name);
    
    if (item) {
        item.qty++;
    } else {
        cart.push({name: name, price: price, qty: 1});
    }
    
    updateCart();
}

// Update cart display
function updateCart() {
    document.getElementById('count').textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    
    let html = '';
    let total = 0;
    
    if (cart.length === 0) {
        html = '<p>Cart is empty</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-name">${item.name}</div>
                    <button class="remove-item" onclick="removeCart(${index})">Remove</button>
                    <span class="cart-item-qty">x${item.qty}</span>
                    <span class="cart-item-price">$${itemTotal}</span>
                </div>
            `;
        });
    }
    
    document.getElementById('cartList').innerHTML = html;
    document.getElementById('total').textContent = total;
}

// Remove from cart
function removeCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Cart button
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('active');
});

// Close cart
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    alert('Order placed! Total: $' + total);
    cart = [];
    updateCart();
    closeCart();
}

// Filter products
function filterProducts(type) {
    const products = document.querySelectorAll('.product');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update button styles
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter products
    products.forEach(product => {
        if (type === 'all' || product.dataset.type === type) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Close cart when clicking outside
document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        closeCart();
    }
});
