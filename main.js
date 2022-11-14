//hamburger menu
const toggleBar = document.querySelector('#toggleBar');
const closeBar = document.querySelector('#close-bar');
const navLinksContainer = document.querySelector('.header__toggle-nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

toggleBar.addEventListener('click', () => {
  navLinksContainer.style.left = 0;
  overlay.style.display = 'block';
  body.classList.add('noscroll');
});
closeBar.addEventListener('click', function () {
  navLinksContainer.style.left = -1000 + 'px';
  overlay.style.display = 'none';
  body.classList.remove('noscroll');
  console.log(this);
});
//carousel
const carouselContainer = document.querySelector('.carousel__track');
const slides = document.querySelectorAll('.carousel__slide');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const carouselDots = document.querySelector('.carousel-dots-js');

let curSlide = 0;
let maxSlide = slides.length;

const gotoSlide = function (slide) {
  slides.forEach((element, index) => {
    element.style.transform = `translateX(${100 * (index - slide)}%)`;
  });
};
gotoSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
};
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
};
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

//image gallery
const img = document.querySelectorAll('img[data-src]');
const windowWidth = window.innerWidth;
let getLatestOpenedImg;
if (img) {
  img.forEach((item, index) => {
    item.addEventListener('click', function (items) {
      getLatestOpenedImg = index + 1;
      const container = document.body;
      let newImgWindow = document.createElement('div');
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute('class', 'img-window');

      let newImg = document.createElement('img');
      newImg.setAttribute('class', 'img');
      newImgWindow.appendChild(newImg);
      newImg.setAttribute('src', '' + items.target.dataset.src);
      newImg.setAttribute('id', 'current-img');
      newImg.addEventListener('load', function () {
        let imgWidth = this.width;
        const calcImgToEdge = (windowWidth - imgWidth) / 2 - 20;

        //nextBtn
        const nextBtnContainer = document.createElement('button');
        const newNextBtn = document.createElement('img');
        nextBtnContainer.appendChild(newNextBtn);
        newNextBtn.setAttribute('src', 'images/icon-next.svg');
        container.appendChild(nextBtnContainer);
        nextBtnContainer.setAttribute('id', 'carousel__next');
        nextBtnContainer.setAttribute('class', 'gallery-btn');
        nextBtnContainer.style.cssText = 'right: ' + calcImgToEdge + 'px';

        nextBtnContainer.addEventListener('click', function () {
          changeImg(1);
        });

        //prev btn
        const prevBtnContainer = document.createElement('button');
        const newPrevBtn = document.createElement('img');
        prevBtnContainer.appendChild(newPrevBtn);
        newPrevBtn.setAttribute('src', 'images/icon-previous.svg');
        container.appendChild(prevBtnContainer);
        prevBtnContainer.setAttribute('id', 'carousel__prev');
        prevBtnContainer.setAttribute('class', 'gallery-btn');
        prevBtnContainer.style.cssText = 'left: ' + calcImgToEdge + 'px';
        prevBtnContainer.addEventListener('click', function () {
          changeImg(1);
        });

        //close gallery btn
        const closeBtn = document.createElement('button');
        const closeBtnImg = document.createElement('img');
        closeBtn.appendChild(closeBtnImg);
        closeBtnImg.setAttribute('src', 'images/icon-close-gallery.svg');
        newImgWindow.appendChild(closeBtn);
        closeBtn.setAttribute('class', 'close__btn');
        closeBtn.addEventListener('click', closeImg);
        closeBtn.style.cssText = 'right: ' + calcImgToEdge + 'px';
      });
    });
  });
}

const closeImg = function () {
  document.querySelector('.img-window').remove();
  document.querySelector('#carousel__next').remove();
  document.querySelector('#carousel__prev').remove();
};

const changeImg = function (changeDir) {
  document.querySelector('#current-img').remove();

  const getImgWindow = document.querySelector('.img-window');
  const newImg = document.createElement('img');
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (changeDir === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > img.length - 5) {
      calcNewImg = 1;
    }
  } else if (changeDir === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = img.length - 5;
    }
  }
  newImg.setAttribute('src', 'images/image-product-' + calcNewImg + '.jpg');
  newImg.setAttribute('class', 'img');
  newImg.setAttribute('id', 'current-img');

  getLatestOpenedImg = calcNewImg;
};

//cart functionalities
const addToCartBtn = document.querySelector('#addtocartBtn');
const minusBtn = document.querySelector('.minusbtn');
const plusBtn = document.querySelector('.plusbtn');
const cartNumIndex = document.querySelector('.cart__number');
const totalPrice = document.querySelector('#totalPrice');
const cartCountIndex = document.querySelector('#cartCounts');
const cartOrderNum = document.querySelector('.cart__order-num');
const cartContentContainer = document.querySelector('#cart-content');
const cardEmptyMessage = document.querySelector('.header__cart-empty ');
const cartContainer = document.querySelector('.header__cart-container');
const cartImgBtn = document.querySelector('#cartimgbtn');
const checkoutBtn = document.querySelector('#checkoutBtn');
const deleteBtn = document.querySelector('#deleteBtn');
let index = 0;
plusBtn.addEventListener('click', function () {
  if (cartOrderNum) {
    index++;
    cartOrderNum.textContent = index;
  }
});
minusBtn.addEventListener('click', function () {
  if (index <= 0) {
    cartOrderNum.textContent = '0';
  } else {
    index--;
    cartOrderNum.textContent = index;
  }
});

addToCartBtn.addEventListener('click', function () {
  cartCountIndex.textContent = index;
  cartNumIndex.textContent = index;
  totalPrice.textContent = `$${125.0 * index}.00`;
  cartCountIndex.classList.remove('visibility');
  cartContentContainer.classList.remove('display');
  cardEmptyMessage.classList.add('display');
  cartOrderNum.textContent = 0;
  index = 0;
});
deleteBtn.addEventListener('click', () => {
  if (!cartContentContainer.classList.contains('display')) {
    cartContentContainer.classList.add('display');
  } else {
    cartContentContainer.classList.remove('display');
  }
  cardEmptyMessage.classList.remove('display');
  cartCountIndex.classList.add('visibility');
});
cartImgBtn.addEventListener('click', () => {
  cartContainer.classList.toggle('display');
});
