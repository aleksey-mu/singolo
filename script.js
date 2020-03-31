// 'use strict';

// window.onload = function() {
//   disableAnimationsOnLoading();
//   addScrollHandler();
//   addModalHandlers();
//   addPortfolioImageHandler();
//   addPhonesHandler();
//   addFilterHandler();
//   addSliderHandler();
//   addFormHandler();
//   addBurgerHandler();
//   addMenuHandler();
//   addResizeHandler();
// }
const MENU = document.getElementById('menu');
const PORTFOLIO = document.getElementById('portfolio-examples');
const PORTFOLIO_TABS = document.getElementById('portfolio-tab');
const SCREEN_VERT = document.getElementById('vertical-screen-off');
const SCREEN_HORIZ = document.getElementById('horizontal-screen-off');
const ARROW_LEFT = document.getElementById('slide-to-left');
const ARROW_RIGHT = document.getElementById('slide-to-right');
const FORM = document.querySelector('.form-block form');

document.addEventListener('scroll', onScroll);

function onScroll() {
    const cursorPos = window.scrollY;
    const divs = document.querySelectorAll('section');
    const links = document.querySelectorAll('#menu a');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    divs.forEach((el) => {
        const element = el.querySelector('.anchor-point');

        if (el.offsetTop - headerHeight <= cursorPos && (el.offsetTop + el.offsetHeight) > cursorPos) {
            links.forEach((a) => {
                a.classList.remove('active-page');
                if (element.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active-page');
                }
            })
        }
    })
}



PORTFOLIO.addEventListener('click', (event) => {
    if (event.target.classList['value'] === 'portfolio__img') {
        PORTFOLIO.querySelectorAll('div div img').forEach(el => el.classList.remove('active-img'));
        event.target.classList.add('active-img');
    }
})



// PORTFOLIO.addEventListener('click', (event) => {
//     PORTFOLIO.querySelectorAll('div div img').forEach(el => el.classList.remove('active-img'));
//     event.target.classList.add('active-img');
// })


PORTFOLIO_TABS.addEventListener('click', (event) => {
  if (event.target.classList['value'] === 'portfolio-menu__link') {
      PORTFOLIO_TABS.querySelectorAll('li p').forEach(el => el.classList.remove('portfolio-menu__link_active'));
      event.target.classList.add('portfolio-menu__link_active');

      const gallery = document.querySelector('#portfolio-examples');
      const pics = [...gallery.querySelectorAll('.portfolio-content')];

      function mixPictures () {
        pics.forEach(pic => pic.remove());
        pics.push(pics.shift());
        const picsContainer = document.querySelector('#portfolio-examples');
        pics.forEach(pic => picsContainer.append(pic));
      }

      mixPictures();
  }
})


let vertScreenOff = false;
let horizScreenOff = false;

SCREEN_VERT.addEventListener('click', () => {
    if (!vertScreenOff) {
        SCREEN_VERT.style.opacity = 100;
        vertScreenOff = true;
    } else {
        SCREEN_VERT.style.opacity = 0;
        vertScreenOff = false;
    }
})

SCREEN_HORIZ.addEventListener('click', () => {
    if (!horizScreenOff) {
        SCREEN_HORIZ.style.opacity = 100;
        horizScreenOff = true;
    } else {
        SCREEN_HORIZ.style.opacity = 0;
        horizScreenOff = false;
    }
})









let slides = document.querySelectorAll('.slides-area .slide');
let currentSlide = 0;
let isEnabled = true;
let isPrimeSlide = true;

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    if (isPrimeSlide) {
        document.querySelector('.main-slider').style.backgroundColor = '#648BF0';
        isPrimeSlide = false;
    } else {
        document.querySelector('.main-slider').style.backgroundColor = '#f06c64';
        isPrimeSlide = true;
    }
    
}

function hideSlide(direction) {
	isEnabled = false;
	slides[currentSlide].classList.add(direction);
	slides[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showSlide(direction) {
	slides[currentSlide].classList.add('next', direction);
	slides[currentSlide].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextSlide(n) {
	hideSlide('to-left');
	changeCurrentSlide(n + 1);
	showSlide('from-right');
}

function previousSlide(n) {
	hideSlide('to-right');
	changeCurrentSlide(n - 1);
	showSlide('from-left');
}

document.querySelector('#slide-to-left').addEventListener('click', function() {
	if (isEnabled) {
		previousSlide(currentSlide);
	}
});

document.querySelector('#slide-to-right').addEventListener('click', function() {
	if (isEnabled) {
		nextSlide(currentSlide);
	}
});








FORM.addEventListener('submit', submitFormHandler);

function submitFormHandler (e) {
  e.preventDefault();
  displayModal();
  fillModal();
  document.querySelector('.modal-window__button').addEventListener('click', removeModal);
}

function fillModal () {
  if (FORM.subject.value) document.querySelector('.modal-window__subject').textContent = 'Subject: ' + FORM.subject.value;
  if (FORM.message.value) document.querySelector('.modal-window__message').textContent = 'Description: ' + FORM.message.value;
}

function displayModal () {
  document.body.append(modal.content.cloneNode(true));
}

function removeModal (e) {
  e.target.closest('.overlay').remove();
  FORM.reset();
}



