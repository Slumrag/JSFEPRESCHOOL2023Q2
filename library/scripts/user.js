const CARD_NUMBER_DIGITS = 9;
function createUser(values) {
	return {
		firstName: values.firstName,
		lastName: values.lastName,
		email: values.email,
		password: values.password,
		loggedIn: true,
		cardNumber: generateCardNumber(),
		visitCount: 1,
		books: [],
		bounces: 0,
	};
}
function getUser() {
	return JSON.parse(localStorage.getItem('user'));
}

function saveUser(user) {
	localStorage.setItem('user', JSON.stringify(user));
}
function getUserAttribute(attr) {
	return JSON.parse(localStorage.getItem('user'))?.[attr];
}
function getUserFullName() {
	return getUserAttribute('firstName') + ' ' + getUserAttribute('lastName');
}
function getUserInitials() {
	return getUserAttribute('firstName')[0] + getUserAttribute('lastName')[0];
}
function setUserAttribute(attr, value) {
	const user = getUser();
	user[attr] = value;
	saveUser(user);
}
function incrementVisitCount() {
	setUserAttribute('visitCount', getUserAttribute('visitCount') + 1);
}
function generateCardNumber(base = 16, length = CARD_NUMBER_DIGITS) {
	const generateDigit = (base = 10) => Math.floor(Math.random() * base);
	let cardNumber = '';
	for (let i = 0; i < length; i++) {
		cardNumber += generateDigit(base).toString(base);
	}
	return cardNumber;
}
function getBookList() {
	return JSON.parse(getUserAttribute('books'));
}
function buyBook(title) {
	const bookList = getBookList();
	bookList.push(title);
	setUserAttribute('books', JSON.stringify(bookList));
}
function returnBook(title) {
	const bookList = getBookList();
	const newBookList = bookList.filter((book) => book !== title);
	setUserAttribute('books', JSON.stringify(newBookList));
}
