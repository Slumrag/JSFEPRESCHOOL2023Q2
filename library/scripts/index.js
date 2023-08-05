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
		burgerMenu.dataset.isOpen =
			burgerMenu.dataset.isOpen === 'true' ? 'false' : 'true';
		burgerButton.classList.toggle('burger-button_closed');
		controls.classList.toggle('controls_open');
		burgerMenu.classList.toggle('nav-menu_open');
	} else if (!e.target.closest('.controls')) {
		burgerMenu.dataset.isOpen = 'false';
		controls.classList.remove('controls_open');
		burgerButton.classList.remove('burger-button_closed');
		burgerMenu.classList.remove('nav-menu_open');
	}
}

const EVALUATION_MESSAGE = `Оценка работы: 50
1. Вёрстка соответствует макету. Ширина экрана 768px +26
2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12
3. На ширине экрана 768рх реализовано адаптивное меню +12
`;
const DEPLOY_LINK =
	'https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/library/';
console.info(EVALUATION_MESSAGE);
console.log(DEPLOY_LINK);
