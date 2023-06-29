
let collection = document.querySelector('.collection');
let innerSlide2 = collection.querySelector('.inner-slide');
let slideItems2 = collection.querySelectorAll('.inner-slide .item');

const prevBtn2 = collection.querySelector('.prev');
const nextBtn2 = collection.querySelector('.next');

let currentIdx2 = 0;
let slideCount2 = slideItems2.length;
const slideMargin2 = 20;
const colSize = slideItems2[0].clientWidth + slideMargin2;

// makeClone
makeClone2();
function makeClone2(){
    for(let i = 0; i<slideCount2; i++){
        let cloneSlide = slideItems2[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        innerSlide2.append(cloneSlide);
    }
    for(let i = slideCount2 -1; i>=0; i--){
        let cloneSlide = slideItems2[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        innerSlide2.prepend(cloneSlide);
    }
    
    updateWidth2();
    setPosition2();
    setTimeout(function(){
        innerSlide2.style.left = '0px';
        innerSlide2.style.transition = '0.5s ease-out';
    },100);
}

// makeClone's functions
function updateWidth2(){
    let currentSlides = collection.querySelectorAll('.inner-slide .item');
    let newSlideCount = currentSlides.length; 
    const newWidth = colSize * newSlideCount - slideMargin2 + 'px';
    innerSlide2.style.width = newWidth;
}

function setPosition2(){
    innerSlide2.style.transform = 'translateX('+ ( -colSize * slideCount2 ) +'px)';
}

// EVENT: btn click
nextBtn2.addEventListener('click', () => {
    moveSlide2(currentIdx2 + 1);
});
prevBtn2.addEventListener('click', () => {
    moveSlide2(currentIdx2 - 1);
});

function moveSlide2(num){
    innerSlide2.style.left = -num * colSize +'px';
    currentIdx2 = num;
    
    // loop
    if(currentIdx2 == slideCount2 || -currentIdx2 == slideCount2){
        setTimeout(function(){
            innerSlide2.style.transition = 'none';
            innerSlide2.style.left = '0px';
            currentIdx2 = 0;
        },500);
        setTimeout(function(){
            innerSlide2.style.transition = '0.5s ease-out';
        },600);
    }
}













