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