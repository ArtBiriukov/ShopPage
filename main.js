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
    messageEl = document.querySelector('.notification__message');

  if (target.closest('.order__btn-basket')) {

    if (!messageEl) {
      createNotification('basket', countInput.value, productTitle);
    }
    return;
  }

  if (target.closest('.order__btn-favorite')) {

    target.closest('.order__btn-favorite').classList.toggle('add__favorite');

    if (!messageEl) {
      createNotification('favorite', countInput.value, productTitle);
    }
    return;
  }
})

const createNotification = (btn, count, productName) => {
  const message = document.createElement('div');
  message.className = 'notification__message';

  if (btn === 'basket') {
    message.innerHTML = `Товар <b>${productName}</b> в количестве ${count} единиц добавлен в корзину`;
  }

  if (btn === 'favorite') {
    message.innerHTML = `Товар <b>${productName}</b> добавлен в избранное`;
  }

  document.body.appendChild(message);

  const hightMes = message.clientHeight;
  message.style.bottom += `${hightMes - 10}px`;

  setTimeout(() => {
    message.style.bottom = '-100px';

    setTimeout(() => {
      message.remove();
    }, 300);

  }, 3000);
}