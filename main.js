/*Смена фотографий */
const productSlides = document.querySelectorAll('.product-cart__slider-slide'),
  productImg = document.querySelector('.product-cart__img');

for (let slide of productSlides) {
  slide.addEventListener('click', (e) => {

    const target = e.target;
    const srcImg = target.previousElementSibling.src;

    productImg.src = srcImg;

    if (slide.classList.contains('active-slide')) {
      slide.classList.remove('active-slide');
    } else {

      productSlides.forEach(element => {
        element.classList.remove('active-slide')
      });

      slide.classList.add('active-slide');
    }
  })
}

/*count products*/
const countWrapper = document.querySelector('.order__count-wrapper'),
  countInput = document.querySelector('.order__count-input');

countWrapper.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('order__count-plus')) {
    countInput.value++;

    if (countInput.value > 5) {
      countInput.value = 5;
    }
  }

  if (target.classList.contains('order__count-mines')) {
    countInput.value--;

    if (countInput.value < 0) {
      countInput.value = 0;
    }
  }
})

/*size select*/
const selectWrapper = document.querySelector('.parameters__select__wrapper');
const sizeSelectBtn = document.querySelector('.parameters__select');

const openSelect = (btn) => {
  btn.classList.toggle('open-select')
}

selectWrapper.addEventListener('click', (e) => {
  const target = e.target;

  if (target.classList.contains('parameters__select')) {
    openSelect(sizeSelectBtn);
  }

  if (target.classList.contains('parameters__select-item')) {
    let text = target.innerText;

    sizeSelectBtn.innerText = text;
    openSelect(sizeSelectBtn);
  }
})

/*mobile menu*/
const navMobile = document.querySelector('.nav__mobile');

const showMenu = () => {
  navMobile.classList.toggle('show-menu');
};

document.addEventListener('click', (e) => {
  let target = e.target;

  if (target.closest('.mobile__menu') || target.closest('.nav__mobile-close')) {
    e.preventDefault();
    showMenu();
  } else {

    if (!target.closest('.nav__mobile') && navMobile.classList.contains('show-menu')) {
      showMenu();
    }
  }

})

/*notifications*/
const orderBuyWrapper = document.querySelector('.order__buy'),
  productTitle = document.querySelector('.product-cart__title').innerText;

orderBuyWrapper.addEventListener('click', (e) => {
  const target = e.target,
    messageElements = document.querySelectorAll('.notification__message');

  if (target.closest('.order__btn-basket')) {
    createNotification(target, countInput.value, productTitle);
  }

  if (target.closest('.order__btn-favorite')) {

    target.closest('.order__btn-favorite').classList.toggle('add__favorite');

    createNotification(target, countInput.value, productTitle);
  }

  if (messageElements.length) {
    messageElements.forEach(messageElement => {
      removeNotificMessage(messageElement);
    })
  }
})

/*Удаление напоминаний */
const removeNotificMessage = (messageItem) => {
  setTimeout(() => {
    messageItem.style.opacity = '0';

    setTimeout(() => {
      messageItem.remove();
    }, 300);

  }, 3000);
}

/*Создание напоминаний и наполнение их информацией */
const createNotification = (btn, count, productName) => {

  const message = document.createElement('div');
  message.className = 'notification__message';

  if (btn.closest('.order__btn-basket')) {
    if (count != 0) {
      message.innerHTML = `Товар <b>${productName}</b> в количестве ${count} единиц добавлен в корзину`;
    } else {
      message.innerHTML = `Выберите нужное количество товара!`;
    }
  }

  if (btn.closest('.order__btn-favorite')) {

    if (!btn.closest('.add__favorite')) {
      message.innerHTML = `Товар <b>${productName}</b> убран из избранного`;
    } else {
      message.innerHTML = `Товар <b>${productName}</b> добавлен в избранное`;
    }
  }

  const notificationContainer = document.querySelector('.notification__container');

  notificationContainer.appendChild(message);

  removeNotificMessage(message);
}

/*valid input email*/
const formBtn = document.getElementById('send'),
  emailInput = document.querySelector('.footer__form-input'),
  btnClearInput = document.querySelector('.footer__form-icon');

/*отчистка инпута*/
btnClearInput.addEventListener('click', () => {
  emailInput.value = '';

  if (emailInput.classList.contains('error')) {
    document.querySelector('.footer__form-message').remove();
    emailInput.classList.remove('error');
  } else if (emailInput.classList.contains('success')) {
    emailInput.classList.remove('success');
  }
})

/*функция проверки поля*/
const checkInputs = (target) => {
  const regExpEmail = /^\w+@\w+\.\w{2,}$/;

  const creatErrMes = (target) => {
    const mesEl = document.createElement('div');
    mesEl.classList.add('footer__form-message');
    mesEl.innerText = 'Email должен иметь вид name@name.com';

    target.after(mesEl);
  }

  const checkGood = () => {
    target.classList.add('success');
    target.classList.remove('error');

    const messageError = document.querySelector('.footer__form-message');
    if (messageError) {
      messageError.remove();
    }
  };

  const checkBed = () => {
    target.classList.remove('success');
    target.classList.add('error');

    const messageError = document.querySelector('.footer__form-message');
    if (!messageError) {
      creatErrMes(target);
    }
    return;
  };

  if (regExpEmail.test(target.value)) {
    checkGood();
  } else {
    checkBed();
  }
};

// emailInput.addEventListener('input', e => checkInputs(e.target));

formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  checkInputs(emailInput);
});

/*desctop menu*/
const navDesktop = document.querySelector('.nav__desktop'),
  headerSection = document.querySelector('header');

document.addEventListener('scroll', () => {
  if (headerSection.offsetHeight < document.documentElement.scrollTop) {
    navDesktop.classList.add('show__navbar');
  } else {
    navDesktop.classList.remove('show__navbar');
  }
})