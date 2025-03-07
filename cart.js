// توابع مدیریت سبد خرید
function updateCartDisplay() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const checkoutSection = document.getElementById('checkoutSection');
    let total = 0;

    cartContainer.innerHTML = '';

    if(cartItems.length === 0) {
        emptyCart.classList.remove('hidden');
        checkoutSection.classList.add('hidden');
        return;
    }

    emptyCart.classList.add('hidden');
    checkoutSection.classList.remove('hidden');

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between border-b pb-4 mb-4';
        itemElement.innerHTML = `
            <div class="flex items-center gap-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded" alt="${item.name}">
                <div>
                    <h3 class="font-bold">${item.name}</h3>
                    <p class="text-gray-500">${item.price} تومان</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">
                    حذف
                </button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        total += parseInt(item.price.replace(/,/g, ''));
    });

    document.getElementById('totalAmount').textContent = 
        total.toLocaleString('fa-IR') + ' تومان';
}

function removeItem(index) {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

function checkout() {
    // اینجا میتونی درگاه پرداخت رو فراخوانی کنی
    alert('در حال انتقال به درگاه پرداخت...');
    sessionStorage.removeItem('cart');
    updateCartDisplay();
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});