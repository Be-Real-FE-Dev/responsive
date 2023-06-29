let slider = document.querySelector('#s1');
let innerSlide = document.querySelector('#s1 .inner-slide');
let slideItems = document.querySelectorAll('#s1 .inner-slide .item');
const allSlider = document.querySelectorAll('.slider-wrap');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIdx = 0;
let slideCount = slideItems.length;
let allSlidesCount = 0;
const slideMargin = 20;
const size = slideItems[0].clientWidth + slideMargin;
let isMoving = false;

// tabcontrol
const tabBtn = document.querySelectorAll('.selection-tab li a');
tabControl();
function tabControl() {
  for (let i = 0; i < 3; i++) {
    tabBtn[i].addEventListener('click', (e) => {
      e.preventDefault();

      allSlider.forEach((item) => {
        // tabBtn의 id와 slider-wrap의 id가 같으면 'on'클래스 추가. + 변수 재할당
        if (tabBtn[i].dataset.id === item.id) {
          item.classList.add('on');

          // -- 재할당 --
          slider = document.querySelector('#' + item.id);
          innerSlide = document.querySelector('#' + item.id + ' .inner-slide');
          slideItems = document.querySelectorAll(
            '#' + item.id + ' .inner-slide .item'
          );
          slideCount = slideItems.length;
          currentIdx = 0;

          deleteClones(slideItems, item.id);
          makeClone();
        } else {
          item.classList.remove('on');
        }
      });
    });
  }
}

function deleteClones(newSlideItems, item_id) {
  for (let i = 0; i < newSlideItems.length; i++) {
    const lists = newSlideItems[i].classList;
    for (let j = 0; j < lists.length; j++) {
      if (lists[j] == 'clone') {
        newSlideItems[i].remove(); // ** slideItems is not an array **
        console.log(newSlideItems); // 15
      }
    }
  }

  // -- 재할당 --
  slideItems = document.querySelectorAll('#' + item_id + ' .inner-slide .item');
  console.log(slideItems); // 5
  slideCount = slideItems.length; // 5
}

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode(true) : a를 복사한다. true의 뜻 =자식요소까지 있으면 모두 복사한다.
    let cloneSlide = slideItems[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    innerSlide.append(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slideItems[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    innerSlide.prepend(cloneSlide);
  }

  updateWidth();
  setPosition();
}

// makeClone's functions
function updateWidth() {
  let currentSlides = document.querySelectorAll('#s1 .inner-slide .item');
  let newSlideCount = currentSlides.length;
  const newWidth = size * newSlideCount - slideMargin + 'px';
  innerSlide.style.width = newWidth;
  allSlidesCount = newSlideCount;
}

function setPosition() {
  innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
}

// EVENT: btn click
nextBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveSlide(currentIdx + 1);
  isMoving = true;
});
prevBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveSlide(currentIdx - 1);
  isMoving = true;
});

innerSlide.addEventListener('transitionend', () => {
  console.log(currentIdx, slideCount);
  // loop
  if (currentIdx === slideCount || -currentIdx === slideCount) {
    innerSlide.style.transition = 'none';
    innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
    currentIdx = 0;
  }
  isMoving = false;
});

function moveSlide(num) {
  currentIdx = num;
  const moveWitdh = -size * slideCount + -num * size;
  innerSlide.style.transform = 'translateX(' + moveWitdh + 'px)';
  innerSlide.style.transition = '0.5s ease-out';
}

window.addEventListener('DOMContentLoaded', () => makeClone());
