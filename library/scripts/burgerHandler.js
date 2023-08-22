const controls = document.querySelector('.controls');
const burgerMenu = document.querySelector('.nav-menu');
const burgerButton = document.querySelector('.burger-button');
const BURGER_TOGGLE_WIDTH = 1024;
document.addEventListener('click', burgerHandler);

window.addEventListener('resize', (e) => {
	if (window.innerWidth >= BURGER_TOGGLE_WIDTH) {
		burgerMenu.dataset.isOpen = 'false';
		burgerButton.classList.remove('burger-button_closed');
		controls.classList.remove('controls_open');
		burgerMenu.classList.remove('nav-menu_open');
	}
});

function burgerHandler(e) {
	if (e.target.closest('.burger-button')) {
		burgerMenu.dataset.isOpen = burgerMenu.dataset.isOpen === 'true' ? 'false' : 'true';
		burgerButton.classList.toggle('burger-button_closed');
		controls.classList.toggle('controls_open');
		burgerMenu.classList.toggle('nav-menu_open');
	} else if (!e.target.closest('.controls') || e.target.closest('.nav-link')) {
		burgerMenu.dataset.isOpen = 'false';
		controls.classList.remove('controls_open');
		burgerButton.classList.remove('burger-button_closed');
		burgerMenu.classList.remove('nav-menu_open');
	}
}
