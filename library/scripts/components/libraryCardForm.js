const readersName = document.querySelector('#readersName');
const cardNumber = document.querySelector('#cardNumber');
const checkCardButton = document.querySelector('.card-form__submit');
const cardProfile = document.querySelector('.find-card .card-profile');
const cardForm = document.querySelector('.card-form');

libraryCardChangeLogInState();

document.addEventListener('click', (event) => {
	if (!event.target.closest('.card-form__submit')) return;
	if (!localStorage.getItem('user')) return;
	event.preventDefault();
	if (!isCardValid(readersName.value, cardNumber.value.toLowerCase())) return;
	setCardProfile(cardProfile);
	showCardProfile(cardProfile);
	const timeoutTime = 1000 * 10;
	setTimeout(() => hideCardProfile(cardProfile), timeoutTime);
	clearForm(cardForm);
});
function libraryCardChangeLogInState() {
	if (getUserAttribute('loggedIn')) {
		findCardLoggedIn();
		getCardLoggedIn();
	} else {
		findCardLoggedOut();
		getCardLoggedOut();
	}
}
function isCardValid(userName, cardNumber) {
	const firstName = userName.split(' ')[0];
	const lastName = userName.split(' ')[1];
	return (
		cardNumber === getUserAttribute('cardNumber') &&
		firstName === getUserAttribute('firstName') &&
		lastName === getUserAttribute('lastName')
	);
}
function showCardProfile(cardProfile) {
	checkCardButton.style.display = 'none';
	cardProfile.removeAttribute('style');
}
function hideCardProfile(cardProfile) {
	cardProfile.style.display = 'none';
	checkCardButton.removeAttribute('style');
}
function setCardProfile(cardProfile) {
	const data = {
		visitCount: getUserAttribute('visitCount'),
		bounces: getUserAttribute('bounces'),
		books: getBookList().length,
	};
	const profileCounts = [...cardProfile.querySelectorAll('.card-profile__count')];
	profileCounts.forEach((item) => (item.textContent = data[item.dataset.profile]));
}
function findCardLoggedIn() {
	const findCard = document.querySelector('.find-card');
	setCardProfile(cardProfile);
	showCardProfile(cardProfile);
	const title = findCard.querySelector('.find-card__title');
	title.textContent = 'Your Library card';
	readersName.value = getUserFullName();
	cardNumber.value = getUserAttribute('cardNumber').toUpperCase();
}
function findCardLoggedOut() {
	const findCard = document.querySelector('.find-card');
	hideCardProfile(cardProfile);
	const title = findCard.querySelector('.find-card__title');
	title.textContent = 'Find your Library card';
	clearForm(cardForm);
}
function getCardLoggedIn() {
	const getCardLoggedOut = document.querySelector('.get-card[data-login=false]');
	const getCardLoggedIn = document.querySelector('.get-card[data-login=true]');
	getCardLoggedIn.removeAttribute('style');
	getCardLoggedOut.style.display = 'none';
}
function getCardLoggedOut() {
	const getCardLoggedOut = document.querySelector('.get-card[data-login=false]');
	const getCardLoggedIn = document.querySelector('.get-card[data-login=true]');
	getCardLoggedOut.removeAttribute('style');
	getCardLoggedIn.style.display = 'none';
}
