const registerModal = document.querySelector('#register-modal');
const registrationInputs = [...document.querySelectorAll('.register-form__text-input')];
const registerForm = document.querySelector('.register-form');
const authProfile = document.querySelector('.auth-menu__profile');
const CARD_NUMBER_DIGITS = 9;

registerModal.style.left = '-200vw';
// hideProfileIcon(authProfile);
document.addEventListener('click', (event) => {
	if (!(event.target.value === 'register')) return;
	openModal(registerModal);
});
document.addEventListener('click', (event) => {
	if (!(event.target.closest('.modal__close') || event.target.classList.contains('modal')))
		return;
	closeModal(registerModal);
});
document.addEventListener('click', (event) => {
	event.preventDefault();
	if (event.target.value !== 'sign-up') return;
	// console.log('sign up');
	return registrationHandler(registrationInputs);
});
function openModal(modal) {
	modal.removeAttribute('style');
	modal.showModal();
}
function closeModal(modal) {
	modal.style.left = '-200vw';
	modal.close();
}
function isFormValid(inputs) {
	return inputs.every((input) => input.validity.valid);
}
function registrationHandler(inputs) {
	if (!isFormValid(inputs)) return;
	const user = createUser(getFormFields(registerForm));
	clearForm(registerForm);
	// console.log(user);
	saveUser(user);
	closeModal(registerModal);
	hideProfileIcon(authProfile);
	return true;
}
function clearForm(form) {
	const inputs = [...form.querySelectorAll('input:not([type=submit])')];
	inputs.forEach((element) => {
		element.value = '';
	});
}
function getFormFields(form) {
	const inputs = [...form.querySelectorAll('input:not([type=submit])')];
	const fields = {};
	inputs.forEach((element) => {
		fields[element.id] = element.value;
	});
	return fields;
}
function createUser(fields) {
	return {
		firstName: fields.firstName,
		lastName: fields.lastName,
		email: fields.email,
		password: fields.password,
		loggedIn: true,
		cardNumber: generateCardNumber(),
		visitCount: 1,
	};
}
function saveUser(user) {
	localStorage.setItem('user', JSON.stringify(user));
}
function getUserAttribute(attr) {
	return JSON.parse(localStorage.getItem('user'))?.[attr];
}
function incrementVisitCount(user) {
	return user.visitCount++;
}
function getUser() {
	return JSON.parse(localStorage.getItem('user'));
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
