import { Game } from './classes/Game.js';

console.log('https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/random-game/');

const canvasMain = document.getElementById('view');
const playPauseButton = document.getElementById('play-pause');

const restartButton = document.getElementById('restart');
const game = new Game(canvasMain, playPauseButton, restartButton, main);

//main game loop
function main(currentTimeStamp) {
  Game.stopMain = requestAnimationFrame(main);

  game.update(currentTimeStamp);
  game.render();
}

main();
