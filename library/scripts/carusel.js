const paginationButtons = [...document.querySelectorAll('.pagination__button')];
const carouselImages = document.querySelectorAll('.carousel__image');
// console.table(carouselImages);

document.addEventListener('click', (event) => {
	if (event.target.closest('.pagination__button')) {
		paginationButtons.forEach((elem) => elem.classList.remove('pagination__button_active'));
		event.target.classList.add('pagination__button_active');
		console.log('pagination', paginationButtons.indexOf(event.target));
	}
	if (event.target.closest('.carousel__arrow')) {
		if (event.target.id === 'arrow-right') {
			console.log('right');
		} else {
			console.log('left', event.target);
		}
	}
});
