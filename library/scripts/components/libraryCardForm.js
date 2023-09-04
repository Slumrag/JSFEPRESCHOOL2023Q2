const readersName = document.querySelector('#readersName');
const cardNumber = document.querySelector('#cardNumber');
const checkCardButton = document.querySelector('.card-form__submit');
const cardProfile = document.querySelector('.card-profile');
const cardForm = document.querySelector('.card-form');
hideCardProfile();
document.addEventListener('click', (event) => {
	if (!event.target.closest('.card-form__submit')) return;
	if (!localStorage.getItem('user')) return;
	event.preventDefault();
	if (!isCardValid(readersName.value, cardNumber.value)) return;
	setCardProfile();
	showCardProfile();
	const timeoutTime = 1000 * 10;
	setTimeout(hideCardProfile, timeoutTime);
	clearForm(cardForm);
});
function isCardValid(userName, cardNumber) {
	const firstName = userName.split(' ')[0];
	const lastName = userName.split(' ')[1];
	return (
		cardNumber === getUserAttribute('cardNumber') &&
		firstName === getUserAttribute('firstName') &&
		lastName === getUserAttribute('lastName')
	);
}
function showCardProfile() {
	checkCardButton.style.display = 'none';
	cardProfile.removeAttribute('style');
}
function hideCardProfile() {
	cardProfile.style.display = 'none';
	checkCardButton.removeAttribute('style');
}
function setCardProfile(params) {
	const data = { visits: 1, bounces: 101, books: 202 };
	const profileCounts = [...cardProfile.querySelectorAll('.card-profile__count')];
	profileCounts.forEach((item) => (item.textContent = data[item.dataset.profile]));
}
