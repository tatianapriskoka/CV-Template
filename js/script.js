// бургер меню
const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('.menu__overlay');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active')
});
overlay.addEventListener('click', () => {
    menu.classList.remove('active')
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active')
});

const procent = document.querySelectorAll('.skills__progress__item-procent');
const lines = document.querySelectorAll('.skills__progress__item-rectangle .sub');

procent.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});


//функции для валидации формы
const form = document.querySelector('#form');
const button = document.querySelector('.btn_second');
const inputName = document.querySelector('#name');
const inputComment = document.querySelector('#text');
const errorName = document.querySelector('.error-name');
const errorComment = document.querySelector('.error-comment');
const inputMail = document.querySelector('#email');
const errorMail = document.querySelector('.error-mail');


button.addEventListener('click', () => {
    checkComment();
    checkName();
    checkMail();
    clearForm();
    setTimeout(clearErrors, 1000)

});

const checkName = () => {
    if (inputName.value === '') {
        errorName.textContent = 'Введите Ваше имя.'
    } else {
        errorName.textContent = '';
    }
}

const checkComment = () => {
    if (inputComment.value === '') {
        errorComment.textContent = 'Добавьте пару слов:)'
    } else {
        errorComment.textContent = '';
    }
}

const checkMail = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(inputMail.value)) {
        errorMail.textContent = 'Проверьте правильность введения почты.'
    } else {
        errorMail.textContent = '';
    }
}

const clearForm = () => {
    form.reset();
}

const clearErrors = () => {
    errorName.textContent = '';
    errorComment.textContent = '';
    errorMail.textContent = '';
}



// Отправка данных на сервер
function send(event, php) {

    event.preventDefault ? event.preventDefault() : event.returnValue = false;


    let req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
            json = JSON.parse(this.response);
            console.log(json);

            if (json.result == "success") {
                // Если сообщение отправлено
                alert("Ваше сообщение отправлено");
            } else {
                // Если произошла ошибка
                alert("Ошибка. Сообщение не отправлено");
            }
            // Если не удалось связаться с php файлом
        } else { alert("Ошибка сервера. Номер: " + req.status); }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
}