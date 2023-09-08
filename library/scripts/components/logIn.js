const logInModal = document.querySelector('#log-in-modal');
const logInForm = document.querySelector('#log-in-modal .modal-form');
// const authProfile = document.querySelector('.auth-menu__profile');
document.addEventListener(
	'click',
	// !getUserAttribute('loggedIn')
	modalHandler(logInModal, 'button[value=modal-log-in]')
	// : () => {}
);
// setUserAttribute('loggedIn', false);
document.addEventListener('click', (event) => {
	if (event.target.closest('.card__button') && !getUserAttribute('loggedIn'))
		logInModal.showModal();
});
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=log-in][type=submit]')) return;
	event.preventDefault();
	logInHandler(logInForm);
});
function logInHandler(form) {
	const formValues = getFormValues(form);
	const validateUserAttribute = (attr) => getUserAttribute(attr) === formValues[attr];
	const isValidPassword = validateUserAttribute('password');
	const isValidEmail = getUserAttribute('email') === formValues['emailCardNumber'];
	const isValidCardNumber =
		getUserAttribute('cardNumber') === formValues['emailCardNumber'].toLowerCase();
	if (isValidPassword && (isValidEmail || isValidCardNumber)) {
		setUserAttribute('loggedIn', true);
		incrementVisitCount();
		clearForm(logInForm);
		authMenuLoggedIn();
		libraryCardChangeLogInState();
		logInModal.close();
	}
}
