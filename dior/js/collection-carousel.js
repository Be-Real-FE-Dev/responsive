(function collectionSlide() {
  const $collection = document.querySelector('.collection');
  const $innerSlide = $collection.querySelector('.inner-slide');
  const $slideItems2 = $collection.querySelectorAll('.inner-slide .item');
  const $prevBtn = $collection.querySelector('.prev');
  const $nextBtn = $collection.querySelector('.next');

  let currentIdx2 = 0;
  let slideCount2 = $slideItems2.length;
  const slideMargin2 = 20;
  const colSize = $slideItems2[0].clientWidth + slideMargin2;

  const makeClone = () => {
    for (let i = 0; i < slideCount2; i++) {
      let cloneSlide = $slideItems2[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      $innerSlide.append(cloneSlide);
    }
    for (let i = slideCount2 - 1; i >= 0; i--) {
      let cloneSlide = $slideItems2[i].cloneNode(true);
      cloneSlide.classList.add('clone');
      $innerSlide.prepend(cloneSlide);
    }

    updateWidth();
    setPosition();
    setTimeout(function () {
      $innerSlide.style.left = '0px';
      $innerSlide.style.transition = '0.5s ease-out';
    }, 100);
  };

  const updateWidth = () => {
    let currentSlides = $collection.querySelectorAll('.inner-slide .item');
    let newSlideCount = currentSlides.length;
    const newWidth = colSize * newSlideCount - slideMargin2 + 'px';
    $innerSlide.style.width = newWidth;
  };

  const setPosition = () => {
    $innerSlide.style.transform =
      'translateX(' + -colSize * slideCount2 + 'px)';
  };

  const moveSlide = (num) => {
    $innerSlide.style.left = -num * colSize + 'px';
    currentIdx2 = num;

    // loop
    if (currentIdx2 == slideCount2 || -currentIdx2 == slideCount2) {
      setTimeout(function () {
        $innerSlide.style.transition = 'none';
        $innerSlide.style.left = '0px';
        currentIdx2 = 0;
      }, 500);
      setTimeout(function () {
        $innerSlide.style.transition = '0.5s ease-out';
      }, 600);
    }
  };

  makeClone();

  // EVENT
  $nextBtn.addEventListener('click', () => {
    moveSlide(currentIdx2 + 1);
  });
  $prevBtn.addEventListener('click', () => {
    moveSlide(currentIdx2 - 1);
  });
})();
