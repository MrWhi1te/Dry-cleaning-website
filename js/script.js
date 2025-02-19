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

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

//

document.getElementById('openFormBtn').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex';
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

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxv0qETxYicVMmC3bjkRuxwW8veqI5V_K8LzbA7hDWZHyBN2km6-Tu4r4AFKX4GY4Ih/exec';

    fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone })
    })
    .then(response => response.text())
    .then(data => {
        alert('Заявка отправлена!');
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});



