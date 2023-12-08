function setTimeline() {
	const audio = document.querySelector('audio');
	const progress = document.querySelector('#song-progress');
	const duration = document.querySelector('.timeline__duration');
	const currentTime = document.querySelector('.timeline__current');
	duration.textContent = formatSeconds(audio.duration);
	progress.max = audio.duration;
	progress.value = 0;
	currentTime.textContent = '0:00';
}
function updateTimeline() {
	const currentTime = document.querySelector('.timeline__current');
	const progress = document.querySelector('#song-progress');
	currentTime.textContent = formatSeconds(+progress.value);
	// console.log(audio.currentTime);
	progress.value = +progress.value + 1;
}
function jumpTimeline() {
	const currentTime = document.querySelector('.timeline__current');
	const progress = document.querySelector('#song-progress');
	currentTime.textContent = formatSeconds(+progress.value);
	audio.currentTime = +progress.value;
}
function formatSeconds(time) {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
// document.addEventListener('click', (event) => {
// 	if (!event.target.closest('#song-progress')) return;
// 	setTimeline(audio);
// });
