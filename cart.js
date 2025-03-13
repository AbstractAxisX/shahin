const discountCodes = {
    'c1': 10,  // 10% تخفیف
    'c2': 20,  // 20% تخفیف
    'c3': 30,
    'c4': 40,
    'c5': 50,
    'c6': 60,
    'c7': 70,
    'c8': 80,
    'c9': 90   // 90% تخفیف
};

let discountPercentage = 0; // متغیر برای ذخیره درصد تخفیف


function getPriceNumber(price) {
    if (typeof price === 'number') return price;

    // تبدیل اعداد فارسی به لاتین
    const persianToLatin = str => str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const cleanedPrice = persianToLatin(String(price)).replace(/[^0-9]/g, '');
    return Number(cleanedPrice) || 0;
}

function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const checkoutSection = document.getElementById('checkoutSection');
    let total = 0;

    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        emptyCart.classList.remove('hidden');
        checkoutSection.classList.add('hidden');
        return;
    }

    emptyCart.classList.add('hidden');
    checkoutSection.classList.remove('hidden');

    cartItems.forEach((item, index) => {
        const itemPrice = getPriceNumber(item.price);
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between border-b pb-4 mb-4';
        itemElement.innerHTML = `
            <input type="hidden" name="items[${index}][name]" value="${item.name}">
            <input type="hidden" name="items[${index}][price]" value="${itemPrice}">
            <div class="flex items-center gap-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded" alt="${item.name}">
                <div>
                    <h3 class="font-bold">${item.name}</h3>
                    <p class="text-gray-500">${itemPrice.toLocaleString('fa-IR')} تومان</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700">
                    حذف
                </button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        total += itemPrice;
    });

    const discountedTotal = total * (1 - discountPercentage / 100);
    document.getElementById('totalAmount').textContent = discountedTotal.toLocaleString('fa-IR') + ' تومان';
}

function applyDiscount() {
    const code = document.getElementById('discountCode').value.trim().toLowerCase();
    if (discountCodes[code]) {
        discountPercentage = discountCodes[code];
        document.getElementById('appliedDiscount').value = code;
        updateCartDisplay();
        alert(`تخفیف ${discountPercentage}% اعمال شد!`);
    } else {
        alert('کد تخفیف نامعتبر است');
        discountPercentage = 0;
        document.getElementById('appliedDiscount').value = '';
        updateCartDisplay();
    }
}

function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay();
}

function checkout() {
    // اینجا میتونی درگاه پرداخت رو فراخوانی کنی
    alert('در حال انتقال به درگاه پرداخت...');
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

document.getElementById('discountForm').addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    applyDiscount();
});

// console.log(JSON.parse(localStorage.getItem('cart')));
// console.log(Number("۱۰٬۰۰۰".replace(/[^0-9]/g, '')));

document.getElementById('cartForm').addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از سابمیت پیش‌فرض فرم
    const discountInput = document.getElementById('discountCode');
    if (document.activeElement === discountInput) {
        applyDiscount(); // اگه فوکوس روی کادر تخفیف باشه، فقط تخفیف اعمال بشه
    } else {
        checkout(); // اگه فوکوس روی دکمه "خرید نهایی" باشه، عملیات پرداخت اجرا بشه
    }
});

function clearCart() {
    localStorage.removeItem('cart'); // پاک کردن سبد خرید از localStorage
    updateCartDisplay(); // به‌روزرسانی نمایش سبد خرید
}

document.getElementById('clearCartBtn').addEventListener('click', function() {
    clearCart();
    alert('سبد خرید خالی شد!');
});