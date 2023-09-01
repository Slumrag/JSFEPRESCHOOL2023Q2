const controls = document.querySelector('.controls');
const burgerMenu = document.querySelector('.nav-menu');
const burgerButton = document.querySelector('.burger-button');
const BURGER_TOGGLE_WIDTH = 1024;
document.addEventListener('click', burgerHandler);

window.addEventListener('resize', (e) => {
	if (window.innerWidth >= BURGER_TOGGLE_WIDTH) {
		closeBurgerMenu();
	}
});
function burgerHandler(e) {
	if (e.target.closest('.burger-button')) {
		toggleBurgerMenu();
	}
	if (
		!e.target.closest('.controls') ||
		e.target.closest('.nav-link') ||
		e.target.closest('.auth-menu__profile')
	) {
		closeBurgerMenu();
	}
}

function closeBurgerMenu() {
	burgerMenu.dataset.isOpen = 'false';
	controls.classList.remove('controls_open');
	burgerButton.classList.remove('burger-button_closed');
	burgerMenu.classList.remove('nav-menu_open');
}
function toggleBurgerMenu() {
	burgerMenu.dataset.isOpen = burgerMenu.dataset.isOpen === 'true' ? 'false' : 'true';
	burgerButton.classList.toggle('burger-button_closed');
	controls.classList.toggle('controls_open');
	burgerMenu.classList.toggle('nav-menu_open');
}
