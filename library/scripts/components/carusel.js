const paginationButtons = [...document.querySelectorAll('.pagination__button')];
const carouselItems = [...document.querySelectorAll('.carousel__item')];
const nextButton = document.querySelector('#arrow-right');
const prevButton = document.querySelector('#arrow-left');
const CAROUSEL_BREAKPOINT = 1400;
const MAX_ITEMS = 3;
const columnGap = parseInt(getComputedStyle(document.querySelector('.carousel__items')).columnGap);
document.addEventListener('click', carouselHandler);
document.addEventListener('click', paginationHandler);
window.addEventListener('resize', resizeHandler);

function getCurrentIndex() {
	return carouselItems.findIndex((elem) => elem.classList.contains('current-item'));
}
function getPreviousIndex() {
	return Math.max(getCurrentIndex() - 1, 0);
}
function getNextIndex() {
	return Math.min(getCurrentIndex() + 1, carouselItems.length - 1);
}

function moveToSlide(slides, currentSlideIdx, targetSlideIdx) {
	const moveAmount = (columnGap + slides[0].width) * targetSlideIdx;
	slides[currentSlideIdx].classList.remove('current-item');
	slides[targetSlideIdx].classList.add('current-item');
	slides.forEach((slide) => (slide.style.transform = `translateX(-${moveAmount}px)`));
	paginationButtons[currentSlideIdx].classList.remove('pagination__button_active');
	paginationButtons[targetSlideIdx].classList.add('pagination__button_active');
}

function resizeHandler(event) {
	if (window.innerWidth > CAROUSEL_BREAKPOINT && getCurrentIndex() > 2) {
		moveToSlide(carouselItems, getCurrentIndex(), 2);
		updateArrowVisibility();
	}
}
function updateArrowVisibility() {
	const currentIndex = getCurrentIndex();
	nextButton.classList.remove('carousel__arrow_disabled');
	prevButton.classList.remove('carousel__arrow_disabled');
	if (currentIndex === 0) {
		prevButton.classList.add('carousel__arrow_disabled');
	}
	if (currentIndex === carouselItems.length - 1) {
		nextButton.classList.add('carousel__arrow_disabled');
	}
}
function paginationHandler(event) {
	if (!event.target.closest('.pagination__button')) return;
	const targetIndex = paginationButtons.indexOf(event.target);
	moveToSlide(carouselItems, getCurrentIndex(), targetIndex);
	updateArrowVisibility();
}
function carouselHandler(event) {
	if (!event.target.closest('.carousel__arrow')) return;

	if (event.target.id === 'arrow-right') {
		moveToSlide(carouselItems, getCurrentIndex(), getNextIndex());
		updateArrowVisibility();
	}
	if (event.target.id === 'arrow-left') {
		moveToSlide(carouselItems, getCurrentIndex(), getPreviousIndex());
		updateArrowVisibility();
	}
}
