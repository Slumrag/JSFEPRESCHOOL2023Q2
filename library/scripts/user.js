function createUser(values) {
	return {
		firstName: values.firstName,
		lastName: values.lastName,
		email: values.email,
		password: values.password,
		loggedIn: true,
		cardNumber: generateCardNumber(),
		visitCount: 1,
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
function incrementVisitCount(user) {
	return user.visitCount++;
}
