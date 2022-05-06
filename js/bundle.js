/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    ///// CALCULATOR

let gender = intensity = 0;
formData = document.querySelectorAll('.calculating__choose_medium input');

document.querySelectorAll('.calculating__choose-item_active').forEach(function(elem) {
    if(elem.parentNode.id === 'gender') {
        gender = elem.id;
    } else {
        intensity = +elem.dataset.ratio;
    };
    
});

function getBlockContent(parentSelector, element, action) {

    function checkingActiveElement(elem){
        elem.parentNode.querySelectorAll(`${element}`).forEach(function(e){
            e.classList.remove(`${action}`);
        });                       
        elem.classList.add(`${action}`);
        if(elem.parentNode.id === 'gender') {
            gender = elem.id;
            localStorage.setItem('gender', gender);    
        } else {                
            intensity = +elem.dataset.ratio;
            localStorage.setItem('intensity', intensity);    
        }
    }

    let elements = document.querySelectorAll(`${parentSelector} ${element}`);
     elements.forEach(function(elem){  
        console.log(elem);
        if(localStorage.getItem('gender')){
            checkingActiveElement(document.querySelector(`#${localStorage.getItem('gender')}`));
            };
        if(localStorage.getItem('intensity')){
            checkingActiveElement(document.querySelector(`[data-ratio="${localStorage.getItem('intensity')}"]`));
            };

        elem.addEventListener('click', function() {
            checkingActiveElement(this);
            calculateResult(gender, intensity);
        });        
    });
   
};

function calculateResult(gender, intensity){
    formData.forEach((input) => {
        if(input.id === 'weight') {
            weight = +input.value;
        }
        if(input.id === 'height') {
            height = +input.value;
        }
        if(input.id === 'age') {
            age = +input.value;
        };
        input.addEventListener('change', function(){
            if(input.id === 'weight') {
                weight = +input.value;
                localStorage.setItem('weight', weight);
            }
            if(input.id === 'height') {
                height = +input.value;
                localStorage.setItem('height', height);
            }
            if(input.id === 'age') {
                age = +input.value;
                localStorage.setItem('age', age);
            };
        });
    });
    if(!weight || !height || !age) {
            result = '____';
            document.querySelector("#clear").innerHTML = '';
        } else {
        if(gender === 'woman') {
            result = Math.floor(((10 * weight) + (6.25 * height) - (5 * age) - 161) * intensity);
        } else {
            result = Math.floor(((10 * weight) + (6.25 * height) - (5 * age) + 5) * intensity);
        }
        document.querySelector("#clear").innerHTML = '&#10060;';
    }
    console.log(weight, height, age, result);
    if(!result) {
        result = '____';
        document.querySelector("#clear").innerHTML = '';
    } 
    document.querySelector('.calculating__result span').textContent = result;
    
};

function startupCondition() {
    if(localStorage.getItem('weight')){
        document.querySelector('#weight').value = localStorage.getItem('weight');
    }
    if(localStorage.getItem('height')){
        document.querySelector('#height').value = localStorage.getItem('height');
    }
    if(localStorage.getItem('age')){
        document.querySelector('#age').value = localStorage.getItem('age');
    }
    getBlockContent('#gender', 'div', 'calculating__choose-item_active');
    getBlockContent('.calculating__choose_big', 'div', 'calculating__choose-item_active');
    calculateResult(gender, intensity);
};


startupCondition();


document.querySelector("#clear").addEventListener('click', function(){
    answer = confirm('Are you sure you want to clear your results?');
    if(answer) {
        localStorage.removeItem('height');
        localStorage.removeItem('weight');
        localStorage.removeItem('age');
        localStorage.removeItem('intensity');
        localStorage.removeItem('gender');
        document.querySelector('#weight').value = localStorage.getItem('weight');
        document.querySelector('#height').value = localStorage.getItem('height');
        document.querySelector('#age').value = localStorage.getItem('age');
        startupCondition();
    };
    
});

formData.forEach(elem => {
    elem.addEventListener('input', function(){
        if(elem.value.match(/\D/)){
            elem.style.border = '1px solid red';
        } else {
            elem.style.border = 'none';
        }

        calculateResult(gender, intensity);
    });
});
};

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    async function getResource(url) {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

};

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    };
};

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
      // Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
modal = document.querySelector('.modal');

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
  });

  function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
  }

  function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
  }

  modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
          closeModal();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) { 
          closeModal();
      }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
      }
  }
  window.addEventListener('scroll', showModalByScroll);

};

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
        // Timer

        const deadline = '2022-05-11';

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor( (t/(1000*60*60*24)) ),
                seconds = Math.floor( (t/1000) % 60 ),
                minutes = Math.floor( (t/1000/60) % 60 ),
                hours = Math.floor( (t/(1000*60*60) % 24) );
    
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num){
            if (num >= 0 && num < 10) { 
                return '0' + num;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
    
            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const t = getTimeRemaining(endtime);
    
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
    
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
        }
    
        setClock('.timer', deadline);
};

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    tabs();
    calc();
    cards();
    forms();
    modal();
    slider();
    timer();
    
});    


  
    




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map