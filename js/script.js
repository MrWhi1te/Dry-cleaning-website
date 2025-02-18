// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация появления блоков при прокрутке
const sections = document.querySelectorAll('.company-block, .services, .benefits, .contacts');

const checkVisibility = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
};

// Добавляем функциональность бургер-меню
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Карусель отзывов
const reviewItems = document.querySelectorAll('.review-item');
let currentIndex = 0;

const showReview = (index) => {
    // Скрываем все отзывы
    reviewItems.forEach((item) => {
        item.classList.remove('active');
    });

    // Показываем выбранный отзыв
    reviewItems[index].classList.add('active');
    currentIndex = index;
};

const showNextReview = () => {
    const nextIndex = (currentIndex + 1) % reviewItems.length;
    showReview(nextIndex);
};

// Автоматическая смена отзывов
let autoCarousel = setInterval(showNextReview, 4000);

// Останавливаем автоматическую смену при ручном переключении
const stopAutoCarousel = () => {
    clearInterval(autoCarousel);
};

// Показываем первый отзыв сразу
showReview(currentIndex);