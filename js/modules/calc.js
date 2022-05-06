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