function modalHandler(modal, buttons) {
	return (event) => {
		if (
			event.target.closest('.modal__close, .annotation__button') ||
			event.target.classList.contains('modal')
		)
			modal.close();
		if (event.target.closest(buttons)) modal.showModal();
	};
}
