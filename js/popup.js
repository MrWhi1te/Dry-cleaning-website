document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('.scratch');
    const ctx = canvas.getContext('2d');
    const scratchLabel = document.querySelector('.scratch-label');
    const actionBttn = document.querySelector(".actionBttn");
    const poputText = document.querySelector(".popup-text");

    // // Устанавливаем размеры canvas
    canvas.width = 450;
    canvas.height = 200;

    // Заливаем canvas серым цветом (защитный слой)
    // ctx.fillStyle = '#696969';
    ctx.fillStyle = '#6969696c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Настройки для стирания
    let isDrawing = false;

    // Функция для подсчета стертых пикселей
    function getErasedPercentage() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let erasedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            // Если альфа-канал (прозрачность) равен 0, пиксель стерт
            if (pixels[i + 3] < 15) {
                erasedPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        return (erasedPixels / totalPixels) * 100;
    }

    // Функция для начала стирания
    function startScratch(e) {
        isDrawing = true;
        scratch(e);

        // Скрываем надпись при начале стирания
        scratchLabel.classList.add('hidden');

        //
        // Проверяем, сколько пикселей стерто
        const erasedPercentage = getErasedPercentage();
        if (erasedPercentage > 40) {
            actionBttn.classList.add('visible');
            poputText.classList.add("visible");
        }

        // Блокируем прокрутку на сенсорных устройствах
        if (e.type === 'touchstart') {
            e.preventDefault(); // Предотвращаем стандартное поведение
        }
    }

    // Функция для завершения стирания
    function endScratch() {
        isDrawing = false;
        ctx.beginPath(); // Сбрасываем путь
    }

    // Функция для стирания
    function scratch(e) {
        if (!isDrawing) return;

        // Получаем координаты курсора относительно canvas
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        // Рисуем прозрачный круг в месте стирания
        ctx.globalCompositeOperation = 'destination-out'; // Режим стирания
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Радиус круга 20px
        ctx.fill();

        // Блокируем прокрутку на сенсорных устройствах
        if (e.type === 'touchmove') {
            e.preventDefault(); // Предотвращаем стандартное поведение
        }
    }

    // Обработчики событий для мыши
    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mouseup', endScratch);
    canvas.addEventListener('mousemove', scratch);

    // Обработчики событий для сенсорных устройств
    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchend', endScratch);
    canvas.addEventListener('touchmove', scratch);
});