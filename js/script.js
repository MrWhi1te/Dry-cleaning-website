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
const sections = document.querySelectorAll('.company-block, .services, .benefits, .contacts, .work-section, .review-section, .connection-section');

const checkVisibility = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

//

document.querySelectorAll('.openFormBtn').forEach(function(button) {
    button.addEventListener('click', function() {
        document.getElementById('overlay').style.display = 'flex';
    });
});

document.getElementById('closeFormBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('overlay').addEventListener('click', function(event) {
    if (event.target === this) {
        document.getElementById('overlay').style.display = 'none';
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Проверка имени
    if (!name || name.length < 2) {
        alert('Пожалуйста, введите корректное имя (минимум 2 символа).');
        return;
    }

    // Проверка телефона (пример для российских номеров)
    const phonePattern = /^\+7\d{10}$/; // Пример: +71234567890
    if (!phonePattern.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона в формате +71234567890.');
        return;
    }

    const scriptUrl = `https://script.google.com/macros/s/AKfycby-FBk5pxEmPO4U_s3tDcW_mBn2iouSzqhnDMJKf-usPXHhPckArKqui3hzWNnkp8xQ/exec?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`;

    fetch(scriptUrl, {
        method: 'GET',
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        alert('Заявка отправлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

//
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(showNotification, 20000); // Показ уведомления через 10 секунд
});

function showNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "block";
}

function toggleNotification() {
    const content = document.querySelector(".notification-content");
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function closeNotification() {
    const notification = document.getElementById("notification");
    notification.style.display = "none";
}

