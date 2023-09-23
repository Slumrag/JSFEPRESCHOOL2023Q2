function pauseAudio(audio) {
	document.querySelector('#play-pause').classList.remove('controls__play-pause_play');
	document
		.querySelector('.audio-player__thumbnail')
		.classList.remove('audio-player__thumbnail_play');
	audio.pause();
	isPlaying = false;
	clearInterval(intervalId);
}
function playAudio(audio) {
	document.querySelector('#play-pause').classList.add('controls__play-pause_play');
	document
		.querySelector('.audio-player__thumbnail')
		.classList.add('audio-player__thumbnail_play');
	audio.play();
	isPlaying = true;
	let interval = 1000;
	intervalId = setInterval(() => {
		console.log('update');
		updateTimeline();
	}, interval);
}
function playPause(audio) {
	if (isPlaying) {
		pauseAudio(audio);
	} else {
		playAudio(audio);
	}
}
function setSong(song) {
	document.querySelector('.song__artist').textContent = song?.artist;
	document.querySelector('.song__title').textContent = song?.title;
	document.querySelector('.audio-player__thumbnail').src = song?.cover;
	const background = document.querySelector('.audio-player-wrapper__background');
	background.style.backgroundImage = `url(${song?.cover})`;

	const audio = document.querySelector('audio');
	audio.src = song?.src;
	audio.currentTime = 0;
	setTimeline(audio);
	if (isPlaying) playAudio(audio);
}
function playNext(playlist) {
	const nextIndex = (currentSongIndex + 1) % playlist.length;
	clearInterval(intervalId);
	setSong(playlist[nextIndex]);
	currentSongIndex = nextIndex;
}
function playPrevious(playlist) {
	const previousIndex = Math.abs(currentSongIndex - 1) % playlist.length;
	clearInterval(intervalId);
	setSong(playlist[previousIndex]);
	currentSongIndex = previousIndex;
}
