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
//mute
document.addEventListener('click', (event) => {
	if (!event.target.closest('#mute')) return;
	document.querySelector('#mute').classList.toggle('volume__mute_enable');
	if (audio.muted) {
		audio.muted = false;
	} else {
		audio.muted = true;
	}
});
//show volume slider
document.addEventListener('mouseover', (event) => {
	if (!event.target.closest('#mute') && !event.target.closest('.volume__range-wrapper')) return;
	document.querySelector('.volume__range-wrapper').classList.add('volume__range_visible');
});
//hide volume slider
document.addEventListener('mouseout', (event) => {
	if (!event.target.closest('.volume__range-wrapper')) return;
	document.querySelector('.volume__range-wrapper').classList.remove('volume__range_visible');
});
//change volume
document.addEventListener('input', (event) => {
	if (!event.target.closest('#song-volume')) return;
	const volumeRange = document.querySelector('#song-volume');
	audio.volume = +volumeRange.value / 100;
});
console.log('https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/audio-player');
