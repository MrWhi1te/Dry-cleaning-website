document.addEventListener('DOMContentLoaded', () => {
    // Инициализация первого слайдера
    initializeSwiper('.swiper-1', '.pagination-1');

    // Инициализация второго слайдера
    initializeSwiper('.swiper-2', '.pagination-2');
});

// Универсальная функция для инициализации слайдера
function initializeSwiper(swiperSelector, paginationSelector) {
    const swiperContainer = document.querySelector(swiperSelector);
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    const slides = swiperWrapper.querySelectorAll('.swiper-slide');
    const pagination = document.querySelector(paginationSelector);

    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    // Функция для обновления ширины слайдов
    const updateSlideWidth = () => {
        const containerWidth = swiperContainer.offsetWidth;
        const slidesPerView = getSlidesPerView();
        const slideWidth = containerWidth / slidesPerView;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
        });
        swiperWrapper.style.width = `${slideWidth * slides.length}px`;
    };

    // Функция для определения количества слайдов в зависимости от ширины экрана
    const getSlidesPerView = () => {
        if (window.innerWidth >= 1024) return 3; // 3 слайда на больших экранах
        if (window.innerWidth >= 768) return 2;  // 2 слайда на планшетах
        return 1; // 1 слайд на мобильных
    };

    // Создаем точки пагинации
    const createPagination = () => {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(slides.length / getSlidesPerView());
        for (let i = 0; i < totalPages; i++) {
            const bullet = document.createElement('div');
            bullet.classList.add('swiper-pagination-bullet');
            bullet.addEventListener('click', () => goToPage(i));
            pagination.appendChild(bullet);
        }
        updatePagination();
    };

    // Обновляем активную точку пагинации
    const updatePagination = () => {
        const bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
        const currentPage = Math.floor(currentIndex / getSlidesPerView());
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === currentPage);
        });
    };

    // Переход к конкретной странице
    const goToPage = (pageIndex) => {
        const slidesPerView = getSlidesPerView();
        currentIndex = pageIndex * slidesPerView;
        currentTranslate = -currentIndex * (swiperContainer.offsetWidth / slidesPerView);
        prevTranslate = currentTranslate;
        setSliderPosition();
        updatePagination();
    };

    // Устанавливаем позицию слайдера
    const setSliderPosition = () => {
        swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
    };

    // Начало перетаскивания
    const startDrag = (event) => {
        isDragging = true;
        startPosX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        swiperWrapper.style.transition = 'none';
    };

    // Перетаскивание
    const duringDrag = (event) => {
        if (!isDragging) return;
        const currentPosX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        const diffX = currentPosX - startPosX;
        currentTranslate = prevTranslate + diffX;
        setSliderPosition();
    };

    // Завершение перетаскивания
    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        swiperWrapper.style.transition = 'transform 0.3s ease';

        const movedBy = currentTranslate - prevTranslate;
        const slidesPerView = getSlidesPerView();

        if (movedBy < -50 && currentIndex < slides.length - slidesPerView) {
            currentIndex += slidesPerView;
        } else if (movedBy > 50 && currentIndex > 0) {
            currentIndex -= slidesPerView;
        }

        goToPage(Math.floor(currentIndex / slidesPerView));
    };

    // Инициализация
    updateSlideWidth();
    createPagination();

    // События для мыши
    swiperContainer.addEventListener('mousedown', startDrag);
    swiperContainer.addEventListener('mousemove', duringDrag);
    swiperContainer.addEventListener('mouseup', endDrag);
    swiperContainer.addEventListener('mouseleave', endDrag);

    // События для сенсорных устройств
    swiperContainer.addEventListener('touchstart', startDrag);
    swiperContainer.addEventListener('touchmove', duringDrag);
    swiperContainer.addEventListener('touchend', endDrag);

    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        updateSlideWidth();
        createPagination();
        goToPage(Math.floor(currentIndex / getSlidesPerView()));
    });
}