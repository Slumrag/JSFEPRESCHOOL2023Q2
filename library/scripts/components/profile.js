const profileModal = document.querySelector('#profile-modal');
const modalCardProfile = document.querySelector('#profile-modal .card-profile');

document.addEventListener('click', modalHandler(profileModal, 'button[value=modal-profile]'));
document.addEventListener('click', (event) => {
	if (!event.target.closest('button[value=modal-profile]')) return;
	setCardProfile(modalCardProfile);
	setUserProfile();
});
//copy to clipboard
document.addEventListener('click', (event) => {
	if (!event.target.closest('.copy-button')) return;
	navigator.clipboard.writeText(getUserAttribute('cardNumber').toUpperCase());
	document.querySelector('.copy-button').classList.add('copy-button_active');
});
function setUserProfile() {
	const initials = document.querySelector('.profile__initials');
	const fullName = document.querySelector('.profile__name');
	const bookList = document.querySelector('.book-list__list');
	const cardNumber = document.querySelector('.card-number span');
	const books = getBookList();
	bookList.innerHTML = '';
	books.forEach((book) => {
		const bookListItem = document.createElement('li');
		bookListItem.classList.add('book-list__item');
		bookListItem.textContent = book.title + ' By ' + book.author;
		bookList.append(bookListItem);
	});
	initials.textContent = getUserInitials();
	fullName.textContent = getUserFullName();
	cardNumber.textContent = getUserAttribute('cardNumber').toUpperCase();
}
