let slider = document.querySelector("#s1");
let innerSlide = document.querySelector("#s1 .inner-slide");
let slideItems = document.querySelectorAll("#s1 .inner-slide .item");
const allSlider = document.querySelectorAll(".slider-wrap");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIdx = 0;
let slideCount = slideItems.length;
const slideMargin = 20;
const size = slideItems[0].clientWidth + slideMargin;

// tabcontrol
const tabBtn = document.querySelectorAll(".selection-tab li a");
tabControl();
function tabControl() {
  // console.log(tabBtn);

  for (let i = 0; i < 3; i++) {
    tabBtn[i].addEventListener("click", (e) => {
      e.preventDefault();

      allSlider.forEach((item) => {
        // console.log(item.id);

        // tabBtn의 id와 slider-wrap의 id가 같으면 'on'클래스 추가. + 변수 재할당
        if (tabBtn[i].dataset.id === item.id) {
          item.classList.add("on");

          // -- 재할당 --
          slider = document.querySelector("#" + item.id);
          innerSlide = document.querySelector("#" + item.id + " .inner-slide");
          slideItems = document.querySelectorAll(
            "#" + item.id + " .inner-slide .item"
          ); // 이거랑 같은 뜻: slideItems = document.querySelectorAll('#s2 .inner-slide .item');
          slideCount = slideItems.length;
          currentIdx = 0;

          deleteClones(slideItems, item.id);
          makeClone();
        } else {
          item.classList.remove("on");
        }
      });
    });
  }
}

function deleteClones(newSlideItems, item_id) {
  for (let i = 0; i < newSlideItems.length; i++) {
    const lists = newSlideItems[i].classList;
    // console.log(lists)
    for (let j = 0; j < lists.length; j++) {
      if (lists[j] == "clone") {
        newSlideItems[i].remove(); // ** slideItems is not an array **
        console.log(newSlideItems); // 15
      }
    }
  }

  // -- 재할당 --
  slideItems = document.querySelectorAll("#" + item_id + " .inner-slide .item");
  console.log(slideItems); // 5
  slideCount = slideItems.length; // 5
}

// makeClone
makeClone();

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode(true) : a를 복사한다. true의 뜻 =자식요소까지 있으면 모두 복사한다.
    let cloneSlide = slideItems[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    innerSlide.append(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slideItems[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    innerSlide.prepend(cloneSlide);
  }

  updateWidth();
  setPosition();
  setTimeout(function () {
    innerSlide.style.left = "0px";
    innerSlide.style.transition = "0.5s ease-out";
  }, 100);
}

// makeClone's functions
function updateWidth() {
  let currentSlides = document.querySelectorAll(".inner-slide .item");
  let newSlideCount = currentSlides.length;
  const newWidth = size * newSlideCount - slideMargin + "px";
  innerSlide.style.width = newWidth;
}

function setPosition() {
  innerSlide.style.transform = "translateX(" + -size * slideCount + "px)";
}

// EVENT: btn click
nextBtn.addEventListener("click", () => {
  moveSlide(currentIdx + 1);
});
prevBtn.addEventListener("click", () => {
  moveSlide(currentIdx - 1);
});

function moveSlide(num) {
  innerSlide.style.left = -num * size + "px";
  currentIdx = num;
  console.log(currentIdx, slideCount);

  // loop
  if (currentIdx == slideCount || -currentIdx == slideCount) {
    setTimeout(function () {
      innerSlide.style.transition = "none";
      innerSlide.style.left = "0px";
      currentIdx = 0;
    }, 500);
    setTimeout(function () {
      innerSlide.style.transition = "0.5s ease-out";
    }, 600);
  }
}
