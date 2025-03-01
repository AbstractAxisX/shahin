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