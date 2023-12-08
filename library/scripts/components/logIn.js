const logInModal = document.querySelector('#log-in-modal');
const logInForm = document.querySelector('#log-in-modal .modal-form');
document.addEventListener('click', modalHandler(logInModal, 'button[value=modal-log-in]'));

document.addEventListener('click', (event) => {
	if (event.target.closest('.card__button') && !getUserAttribute('loggedIn'))
		logInModal.showModal();
});
// log in submit
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=log-in][type=submit]')) return;
	event.preventDefault();
	logInSubmit(logInForm);
});
function logInSubmit(form) {
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
		setCardButtons();
		logInModal.close();
	}
}
