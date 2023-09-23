const audio = document.querySelector('audio');
let isPlaying = false;
let currentSongIndex = 0;
let intervalId;
setSong(playlist[currentSongIndex]);
//load metadata
audio.addEventListener('loadedmetadata', setTimeline);
// play next on track end
audio.addEventListener('ended', () => playNext(playlist));
//play-pause
document.addEventListener('click', (event) => {
	if (!event.target.closest('#play-pause')) return;
	playPause(audio);
});
//play next
document.addEventListener('click', (event) => {
	if (!event.target.closest('#next-song')) return;
	playNext(playlist);
});
//play previous
document.addEventListener('click', (event) => {
	if (!event.target.closest('#previous-song')) return;
	playPrevious(playlist);
});
document.addEventListener('input', (event) => {
	if (!event.target.closest('#song-progress')) return;
	console.log('change input');
	jumpTimeline();
});
