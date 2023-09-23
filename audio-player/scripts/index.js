const audio = document.querySelector('audio');
let isPlaying = false;
let currentSongIndex = 0;
setSong(playlist[currentSongIndex]);
document.addEventListener('click', (event) => {
	if (!event.target.closest('#play-pause')) return;
	// console.log(event.target);
	playPause(audio);
});
document.addEventListener('click', (event) => {
	if (!event.target.closest('#next-song')) return;
	playNext(playlist);
});
document.addEventListener('click', (event) => {
	if (!event.target.closest('#previous-song')) return;
	playPrevious(playlist);
});
