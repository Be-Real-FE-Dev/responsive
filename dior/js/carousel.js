const carouselData = {
  s1: [
    {
      url: './images/juwerly1.png',
      hashTag: 'BEST',
      title: 'DIOR TRIBALES 이어링',
      price: '550,000',
    },
    {
      url: './images/juwerly2.png',
      hashTag: 'NEW',
      title: 'sousles etoiles 네크리스',
      price: '1,000,000',
    },
    {
      url: './images/juwerly3.png',
      hashTag: "J'ADIOR",
      title: "골드 마감 빈티지 메탈 J'ADIOR 초커",
      price: '425,000',
    },
    {
      url: './images/juwerly4.png',
      hashTag: "J'ADIOR",
      title: "골드 마감 빈티지 메탈 J'ADIOR 초커",
      price: '425,000',
    },
    {
      url: './images/juwerly1.png',
      hashTag: 'NEW',
      title: 'sousles etoiles 링',
      price: '425,000',
    },
  ],
  s2: [
    {
      url: './images/bag1.jpeg',
      hashTag: 'BEST',
      title: 'DIOR TRIBALES 이어링',
      price: '550,000',
    },
    {
      url: './images/bag2.webp',
      hashTag: 'NEW',
      title: 'sousles etoiles 네크리스',
      price: '1,000,000',
    },
    {
      url: './images/bag3.webp',
      hashTag: "J'ADIOR",
      title: "골드 마감 빈티지 메탈 J'ADIOR 초커",
      price: '425,000',
    },
    {
      url: './images/bag4.webp',
      hashTag: "J'ADIOR",
      title: "골드 마감 빈티지 메탈 J'ADIOR 초커",
      price: '425,000',
    },
    {
      url: './images/bag5.jpeg',
      hashTag: 'NEW',
      title: 'sousles etoiles 링',
      price: '425,000',
    },
  ],
};

const $slider = document.querySelector('.slider-wrap');
const $innerSlide = $slider.querySelector('.inner-slide');
const $slideItems = $slider.querySelectorAll('.item');
const $prevBtn = document.querySelector('.prev');
const $nextBtn = document.querySelector('.next');
const $tabBtn = document.querySelectorAll('.selection-tab li a');

const slideMargin = 20;
let currentSlideId = 's2';
let currentIdx = 0;
let slideCount = carouselData[currentSlideId].length;
let size = 0;
let isMoving = false;

const render = (slideId = 's2') => {
  currentIdx = 0;
  const $innerSlide = document.querySelector('.inner-slide');
  $innerSlide.innerHTML = '';

  carouselData[slideId].map((data) => {
    $innerSlide.insertAdjacentHTML(
      'beforeend',
      `
    <div class="item">
    <div class="selection-tmb">
        <div style="width:100%; height:100%;">
          <img src=${data.url} style="width:100%; height:100%; object-fit:cover;"/>
        </div>
        <div class="icons">
            <a>like</a>
            <a>bag</a>
            <a>search</a>
        </div>
    </div>
    <ul class="info">
        <li class="hash">#${data.hashTag}</li>
        <li class="tit">${data.title}</li>
        <li class="cost">${data.price}</li>
        <li><a href="#" class="btn-primary">ORDER</a></li>
    </ul>
  </div>
  `
    );
  });

  makeClone();
};

const makeClone = () => {
  const $slideItems = $innerSlide.querySelectorAll('.item');

  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = $slideItems[i].cloneNode(true); // cloneNode(true) : a를 복사한다. true의 뜻 => 자식요소까지 있으면 모두 복사한다.
    cloneSlide.classList.add('clone');
    $innerSlide.append(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = $slideItems[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    $innerSlide.prepend(cloneSlide);
  }

  updateWidth();
  setPosition();
};

const updateWidth = () => {
  const $slideItems = $slider.querySelectorAll('.item');
  const newSlideCount = carouselData[currentSlideId].length;
  size = $slideItems[0].clientWidth + slideMargin;
  const slideWidth = size * newSlideCount + 'px';
  console.log(size, newSlideCount);
  $innerSlide.style.width = slideWidth;
};

const setPosition = () => {
  $innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
};

const moveSlide = (num) => {
  currentIdx = num;
  const moveWitdh = -size * slideCount + -num * size;
  $innerSlide.style.transform = 'translateX(' + moveWitdh + 'px)';
  $innerSlide.style.transition = '0.5s ease-out';
};

// EVENT
$nextBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveSlide(currentIdx + 1);
  isMoving = true;
});

$prevBtn.addEventListener('click', () => {
  if (isMoving) return;
  moveSlide(currentIdx - 1);
  isMoving = true;
});

$innerSlide.addEventListener('transitionend', () => {
  // loop
  if (currentIdx === slideCount || -currentIdx === slideCount) {
    $innerSlide.style.transition = 'none';
    $innerSlide.style.transform = 'translateX(' + -size * slideCount + 'px)';
    currentIdx = 0;
  }
  isMoving = false;
});

$tabBtn.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // prevent scroll top
    render(e.target.dataset.id);
  })
);

window.addEventListener('DOMContentLoaded', () => render());
