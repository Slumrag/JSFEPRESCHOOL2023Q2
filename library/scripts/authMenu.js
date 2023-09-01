const authMenu = document.querySelector('.auth-menu__menu');
document.addEventListener('click', (event) => {
	if (!event.target.closest('.auth-menu__profile') && !event.target.closest('.auth-menu__menu')) {
		authMenu.classList.add('hidden');
	}
	if (event.target.closest('.auth-menu__profile')) {
		authMenu.classList.toggle('hidden');
	}
});
