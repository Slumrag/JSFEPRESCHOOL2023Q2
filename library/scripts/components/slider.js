const options = document.querySelector('.options');
const cardSets = [...document.querySelectorAll('.card-set')];
cardSets.forEach((cards) => {
	if (cards.dataset.season !== 'winter') {
		cards.style.transitionDelay = '-250ms';
		cards.classList.add('hidden');
	}
});
document.addEventListener('click', (event) => {
	if (!event.target.closest('.options__radio')) return;
	const season = event.target?.value;
	cardSets.forEach((cards) =>
		cards.dataset.season === season ? showCardSet(cards) : hideCardSet(cards)
	);
});
function showCardSet(cards) {
	cards.style.transitionDelay = '250ms';
	cards.classList.remove('hidden');
}
function hideCardSet(cards) {
	cards.style.transitionDelay = '0ms';
	cards.classList.add('hidden');
}
