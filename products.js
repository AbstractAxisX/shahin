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
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    
    const newItem = {
        name: name,
        price: price.toLocaleString('fa-IR'),
        image: image
    };

    cartItems.push(newItem);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    
    alert('محصول به سبد خرید اضافه شد!');
}

// تابع نمایش تعداد آیتم های سبد خرید (اختیاری)
function updateCartCounter() {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    document.getElementById('cartCounter').textContent = cartItems.length;
}

// فراخوانی هنگام لود صفحه
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
});