const logInModal = document.querySelector('#log-in-modal');
const logInButtons = [...document.querySelectorAll('button[value=modal-log-in]')];
document.addEventListener('click', modalHandler(logInModal, logInButtons));
document.addEventListener('click', (event) => {
	logInHandler();
});
function logInHandler(params) {}
