const signUpModal = document.querySelector('#sign-up-modal');
const signUpForm = document.querySelector('#sign-up-modal .modal-form');
const authProfile = document.querySelector('.auth-menu__profile');
const CARD_NUMBER_DIGITS = 9;
document.addEventListener(
	'click',
	modalHandler(signUpModal, [...document.querySelectorAll('button[value=modal-sign-up]')])
);

document.addEventListener('click', (event) => {
	if (!event.target.closest('button[type=submit][value=sign-up]')) return;
	event.preventDefault();
	registrationHandler(signUpForm);
});
function registrationHandler(form) {
	if (!isFormValid(form)) return;
	const user = createUser(getFormValues(signUpForm));
	clearForm(signUpForm);
	saveUser(user);
	signUpModal.close();
	hideProfileIcon(authProfile);
}


function generateCardNumber(base = 16, length = CARD_NUMBER_DIGITS) {
	const generateDigit = (base = 10) => Math.floor(Math.random() * base);
	let cardNumber = '';
	for (let i = 0; i < length; i++) {
		cardNumber += generateDigit(base).toString(base);
	}
	return cardNumber;
}
function hideProfileIcon(profile) {
	profile.querySelector('img').style.display = 'none';
	profile.style.backgroundColor = 'var(--text-color-light)';
	const text = getUserAttribute('firstName')[0] + getUserAttribute('lastName')[0];
	profile.textContent = text.toUpperCase();
}
function showProfileIcon(profile) {
	profile.querySelector('img')?.removeAttribute('style');
	profile?.removeAttribute('style');
	profile.textContent = '';
}
