const signUpModal = document.querySelector('#sign-up-modal');
const signUpForm = document.querySelector('#sign-up-modal .modal-form');

document.addEventListener('click', modalHandler(signUpModal, 'button[value=modal-sign-up]'));

document.addEventListener('click', (event) => {
	if (!event.target.closest('button[type=submit][value=sign-up]')) return;
	event.preventDefault();
	signUpSubmit(signUpForm);
});
function signUpSubmit(form) {
	if (!isFormValid(form)) return;
	const user = createUser(getFormValues(form));
	clearForm(form);
	saveUser(user);
	authMenuLoggedIn();
	libraryCardChangeLogInState();
	setCardButtons();
	signUpModal.close();
}
