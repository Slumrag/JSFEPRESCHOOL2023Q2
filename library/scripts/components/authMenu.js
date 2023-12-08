const authMenu = document.querySelector('.auth-menu__menu');

authMenuChangeLogInState();
document.addEventListener('click', (event) => {
	if (!event.target.closest('.auth-menu__profile') && !event.target.closest('.auth-menu__menu')) {
		authMenu.classList.add('hidden');
	}
	if (event.target.closest('.auth-menu__profile, .auth-menu__button')) {
		authMenu.classList.toggle('hidden');
	}
});
document.addEventListener('click', (event) => {
	if (event.target.closest('button[value=log-out]')) {
		setUserAttribute('loggedIn', false);
		authMenuLoggedOut();
		libraryCardChangeLogInState();
		unsetCardButtons();
	}
});
function authMenuChangeLogInState() {
	getUserAttribute('loggedIn') ? authMenuLoggedIn() : authMenuLoggedOut();
}
function authMenuLoggedIn() {
	const buttons = [...authMenu.querySelectorAll('.auth-menu__button')];
	const title = authMenu.querySelector('.auth-menu__title');
	const authProfile = document.querySelector('.auth-menu__profile');
	showProfileInitials(authProfile);
	buttons.forEach((button) =>
		button.value === 'log-out' || button.value === 'modal-profile'
			? (button.style.display = 'block')
			: (button.style.display = 'none')
	);
	title.textContent = getUserAttribute('cardNumber').toUpperCase();
	title.style.fontSize = '12px';
}
function authMenuLoggedOut() {
	const buttons = [...authMenu.querySelectorAll('.auth-menu__button')];
	const title = authMenu.querySelector('.auth-menu__title');
	const authProfile = document.querySelector('.auth-menu__profile');
	hideProfileInitials(authProfile);

	buttons.forEach((button) =>
		button.value === 'log-out' || button.value === 'modal-profile'
			? (button.style.display = 'none')
			: (button.style.display = 'block')
	);
	title.removeAttribute('style');
	title.textContent = 'Profile';
}

function showProfileInitials(profile) {
	const icon = profile.querySelector('img');
	icon.style.display = 'none';
	profile.style.backgroundColor = 'var(--text-color-light)';
	const initials = profile.querySelector('p');
	initials.textContent = getUserInitials();
	profile.title = getUserFullName();
}
function hideProfileInitials(profile) {
	const icon = profile.querySelector('img');
	const initials = profile.querySelector('p');
	icon.removeAttribute('style');
	profile?.removeAttribute('style');
	initials.textContent = '';
	profile?.removeAttribute('title');
}
