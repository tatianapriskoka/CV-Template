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
    checkForm();
});

const checkForm = () => {
    checkComment();
    checkName();
    checkMail();
    clearForm();
    setTimeout(clearErrors, 1000);
}

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

const postInfo = async (link, data) => {
    let response = await fetch(link, {
        method: "GET"
    })
    return await response.text();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    let data = [];

    document.querySelectorAll('input').forEach(el => {
        data.push(el.value);
    })

    data.push(document.querySelector('textarea').value)

    if (data) {
        postInfo('#', JSON.stringify(data))
            .then(response => {
                alert('Info send')
            })
            .catch(() => alert('error'))
    }

})