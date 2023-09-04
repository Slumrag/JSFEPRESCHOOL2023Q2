function modalHandler(modal, buttons) {
	return (event) => {
		if (
			event.target.closest('.modal__close, .annotation__button') ||
			event.target.classList.contains('modal')
		)
			modal.close();
		if (buttons.includes(event.target)) modal.showModal();
	};
}
