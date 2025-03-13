let currentSlide = 0;
const totalSlides = 3;
const slider = document.getElementById('imageSlider');

function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0', 'translate-y-8');
    }, 50);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('opacity-0', 'translate-y-8');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function showImage(index) {
    currentSlide = index;
    updateSlider();
    updateThumbnails();
}

function slideImage(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlider();
    updateThumbnails();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.flex.gap-2 img');
    thumbnails.forEach((thumb, index) => {
        if (index === currentSlide) {
            thumb.classList.add('ring-2', 'ring-blue-500');
        } else {
            thumb.classList.remove('ring-2', 'ring-blue-500');
        }
    });
}

function copyPageLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link:', err));
}

 // --- تگ‌ها ---
const tagButtons = document.querySelectorAll('.tag-button');
let activeTag = null; //  نگه داشتن تگ فعال

tagButtons.forEach(button => {
button.addEventListener('click', () => {
    const clickedTag = button.dataset.tag;

    // اگه همون تگ فعال دوباره کلیک شد، غیرفعالش کن
    if (clickedTag === activeTag) {
        button.classList.remove('active');
        activeTag = null; //  هیچ تگی فعال نیست
    } else {
        // غیرفعال کردن تگ قبلی (اگه وجود داشت)
        if (activeTag) {
            document.querySelector(`.tag-button[data-tag="${activeTag}"]`).classList.remove('active');
        }

        // فعال کردن تگ جدید
        button.classList.add('active');
        activeTag = clickedTag;
    }

    //  بعداً اینجا می‌تونی یه تابع صدا بزنی که محصولات رو بر اساس تگ فیلتر کنه
    // filterProducts(activeTag);
});
});

// ==============================
// امتیازدهی با ستاره‌ها
let currentRating = 0;
const stars = document.querySelectorAll('.star');

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('text-yellow-400');
            star.classList.remove('text-gray-300');
        } else {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        }
    });
}

function rateProduct(rating) {
    currentRating = rating;
    updateStars(rating);
    // اینجا می‌توانید امتیاز را به سرور ارسال کنید یا ذخیره کنید
    console.log(`امتیاز داده شده: ${rating}`);
}

// هایلایت ستاره‌ها هنگام هاور
stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        if (!currentRating) updateStars(index + 1);
    });
    
    star.addEventListener('mouseout', () => {
        if (!currentRating) updateStars(0);
        else updateStars(currentRating);
    });
});
// =======================
// تابع افزودن به سبد خرید
function addToCart(name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
        name: name,
        price: Number(price), // قیمت به عدد تبدیل می‌شه
        image: image
    };
    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCounter();
    alert('محصول به سبد خرید اضافه شد!');
}

// تابع نمایش تعداد آیتم های سبد خرید (اختیاری)
function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartCounter').textContent = cartItems.length;
}

// فراخوانی هنگام لود صفحه
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});


// badge of buy icon
function updateCartCounter() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cartItems.length;
    document.getElementById('cartBadgeDesktop').textContent = count;
    document.getElementById('cartBadgeMobile').textContent = count;
}
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});
function addToCart(name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    const newItem = {
        name: name,
        price: price.toLocaleString('fa-IR'),
        image: image
    };

    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    updateCartCounter(); // به‌روزرسانی بج
    alert('محصول به سبد خرید اضافه شد!');
}
// dialog hover
// متغیرها رو تعریف می‌کنیم
const cartIconDesktop = document.querySelector('.desktop-navbar .bi-handbag').parentElement;
const cartDialogDesktop = document.getElementById('cartDialogDesktop');
let timeoutId; // این برای تاخیر استفاده می‌شه

// وقتی موس روی آیکون می‌ره
cartIconDesktop.addEventListener('mouseover', () => {
    clearTimeout(timeoutId); // اگه تاخیری از قبل بود، لغوش کن
    updateCartDialog('Desktop'); // دیالوگ رو به‌روزرسانی کن
    cartDialogDesktop.classList.remove('hidden'); // دیالوگ رو نشون بده
});

// وقتی موس از روی آیکون خارج می‌شه
cartIconDesktop.addEventListener('mouseout', () => {
    timeoutId = setTimeout(() => {
        cartDialogDesktop.classList.add('hidden'); // بعد از 200 میلی‌ثانیه دیالوگ رو ببند
    }, 200);
});

// وقتی موس روی دیالوگ می‌ره
cartDialogDesktop.addEventListener('mouseover', () => {
    clearTimeout(timeoutId); // تاخیر بستن رو لغو کن، دیالوگ باز بمونه
});

// وقتی موس از روی دیالوگ خارج می‌شه
cartDialogDesktop.addEventListener('mouseout', () => {
    cartDialogDesktop.classList.add('hidden'); // دیالوگ رو ببند
});

// تابع به‌روزرسانی دیالوگ (همون که خودت نوشتی)
function updateCartDialog(type) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById(`cartItems${type}`);
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">سبد خرید خالی است</p>';
        return;
    }

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center gap-2 mb-2';
        itemElement.innerHTML = `
            <img src="${item.image}" class="w-10 h-10 object-cover rounded" alt="${item.name}">
            <div>
                <h4 class="text-sm font-bold">${item.name}</h4>
                <p class="text-xs text-gray-500">${item.price} تومان</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}


//  update dialog hover
function updateCartDialog(type) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById(`cartItems${type}`);
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">سبد خرید خالی است</p>';
        return;
    }

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center gap-2 mb-2';
        itemElement.innerHTML = `
            <img src="${item.image}" class="w-10 h-10 object-cover rounded" alt="${item.name}">
            <div>
                <h4 class="text-sm font-bold">${item.name}</h4>
                <p class="text-xs text-gray-500">${item.price} تومان</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}



// متغیر برای ذخیره تعداد محصول در مودال
let quantity = 1;
const quantityDisplay = document.querySelector('.result');

// تابع به‌روزرسانی نمایش تعداد
function updateQuantityDisplay() {
    quantityDisplay.innerHTML = quantity;
}

// ریست کردن مقدار به 1 وقتی مودال باز می‌شه
function resetQuantity() {
    quantity = 1;
    updateQuantityDisplay();
}

// ویرایش تابع openModal برای ریست مقدار
const originalOpenModal = openModal;
openModal = function() {
    originalOpenModal();
    resetQuantity();
};

// مدیریت دکمه‌های افزایش و کاهش
document.querySelector('.incN').addEventListener('click', () => {
    if (quantity > 1) { // حداقل 1 باشه
        quantity--;
        updateQuantityDisplay();
    }
});

document.querySelector('.addN').addEventListener('click', () => {
    quantity++;
    updateQuantityDisplay();
});

// تابع افزودن به سبد خرید با در نظر گرفتن تعداد
function addToCart(name, price, image) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // اضافه کردن محصول به تعداد انتخاب‌شده
    for (let i = 0; i < quantity; i++) {
        const newItem = {
            name: name,
            price: Number(price), // تبدیل به عدد
            image: image
        };
        cartItems.push(newItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCounter();
    alert(`${quantity} عدد از محصول "${name}" به سبد خرید اضافه شد!`);
}