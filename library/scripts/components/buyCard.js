const buyCardModal = document.querySelector('#buy-card-modal');
const buyCardForm = document.querySelector('#buy-card-modal .modal-form');
cardsChangeLogInState();
document.addEventListener('click', modalHandler(buyCardModal, ':not(*)'));
//buying books
document.addEventListener('click', (event) => {
	if (!(event.target.closest('.card__button') && getUserAttribute('loggedIn'))) return;
	if (!getUserAttribute('purchasedCard')) buyCardModal.showModal();
	else {
		const button = event.target;
		disableButton(button);
		const book = { ...button.dataset };
		buyBook(book);
		setCardProfile(cardProfile);
	}
});
//buy form submit handling
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=buy][type=submit]')) return;
	event.preventDefault();
	buyCardSubmit(buyCardForm);
});
document.addEventListener('input', (event) => {
	if (!event.target.closest('#buy-card-modal .modal-form')) return;
	const buyButton = buyCardForm.querySelector('button');
	buyButton.disabled = !isFormValid(buyCardForm);
});
function buyCardSubmit(form) {
	// const formValues = getFormValues(form);
	if (!isFormValid(form)) return;
	setUserAttribute('purchasedCard', true);
	clearForm(form);
	buyCardModal.close();
}
function enableButton(button) {
	button.disabled = false;
	button.textContent = 'Buy';
}
function disableButton(button) {
	button.disabled = true;
	button.textContent = 'Own';
}
function setCardButtons() {
	const cardButtons = [...document.querySelectorAll('.card__button')];
	const ownedBooks = getBookList();
	cardButtons.forEach((button) => {
		const data = JSON.stringify({ ...button.dataset });
		if (ownedBooks.some((book) => JSON.stringify(book) === data)) {
			disableButton(button);
		} else {
			enableButton(button);
		}
	});
}
function unsetCardButtons() {
	const cardButtons = [...document.querySelectorAll('.card__button')];
	cardButtons.forEach((button) => {
		enableButton(button);
	});
}
function cardsChangeLogInState() {
	if (getUserAttribute('loggedIn')) {
		setCardButtons();
	} else {
		unsetCardButtons();
	}
}
