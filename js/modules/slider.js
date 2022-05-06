function slider() {
    //Slider


// FIRST VAR OF SLIDER

const slides = document.querySelectorAll('.offer__slide'),
slider =document.querySelector('.offer__slider'),
prev = document.querySelector('.offer__slider-prev'),
next = document.querySelector('.offer__slider-next');
total = document.querySelector('#total'),
current = document.querySelector('#current'),
slidesWrapper = document.querySelector('.offer__slider-wrapper'),
slidesFiels = document.querySelector('.offer__slider-inner'),
width = window.getComputedStyle(slidesWrapper).width;
let slideIndex = 1;
let offset = 0;

if(slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} else {
total.textContent = slides.length;
current.textContent = slideIndex;
}

slidesFiels.style.width = slides.length * 100 + '%';
slidesFiels.style.display = 'flex';
slidesFiels.style.transition = 'all 0.5s';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
dots = [];
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position:absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin: 0 15%;
list-style: none;
`;
slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1);
dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin: 0 3px;
cursor:pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: 0.5;
transition: opacity 0.6s ease;
`;
if(i == 0) {
dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
}

function deleteNotDigits(str) {
return +str.replace(/\D/g, '');
}

function nextSlide(){
if (offset == deleteNotDigits(width) * (slides.length - 1)) {
offset = 0;
} else {
offset += deleteNotDigits(width);
}
slidesFiels.style.transform = `translateX(-${offset}px)`;

if(slideIndex === slides.length) {
slideIndex = 1;
} else {
slideIndex++;
}

if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '0.5');
dots[slideIndex-1].style.opacity = '1';
}
next.addEventListener('click', () =>{
nextSlide();
});

function prevSlide() {
if (offset === 0) {
offset = deleteNotDigits(width) * (slides.length - 1)

} else {
offset -= deleteNotDigits(width);
}
slidesFiels.style.transform = `translateX(-${offset}px)`;

if(slideIndex === 1) {
slideIndex = slides.length;
} else {
slideIndex--;
}

if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
}

dots.forEach(dot => dot.style.opacity = '0.5');
dots[slideIndex-1].style.opacity = '1';
}
prev.addEventListener('click', () =>{
prevSlide();
});

dots.forEach(dot => {
dot.addEventListener('click', () => {
dots.forEach(dot => dot.style.opacity = '0.5');
slidesFiels.style.transform = `translateX(-${deleteNotDigits(width) * (dot.dataset.slideTo - 1)}px)`;
dot.style.opacity = '1';
if(dot.dataset.slideTo < 10) {
    current.textContent = `0${dot.dataset.slideTo}`;
} else {
    current.textContent = dot.dataset.slideTo;
}
});
});

function autoslide(time) {
setInterval(function() {
nextSlide();
}, time);
};

autoslide(5000);

// SECOND VAR OF SLIDER

// showSlides(1);

// if(slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n) {
//     console.log(n);
//     if(n > slides.length) {
//         slideIndex = 1;
//     }
//     if(n < 1) {
//         slideIndex = slides.length;
//     }

//     slides.forEach(item => item.style.display = 'none');
//     slides[slideIndex-1].style.display = 'block';

//     if(slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// };

// function listingSlide(n) {
//     showSlides(slideIndex += n);
// };

// prev.addEventListener('click', function(e) {
//     listingSlide(-1);
// });
// next.addEventListener('click', function(e) {
//     listingSlide(1);
// });


//// LOCAL STORAGE

// localStorage.setItem('number', 5);
// localStorage.clear();
// localStorage.removeItem('number');
// localStorage.getItem('number');
// console.log(localStorage.getItem('number'));

};

module.exports = slider;