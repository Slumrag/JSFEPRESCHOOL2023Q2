import { Game } from './classes/Game.js';

console.log('https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/random-game/');

const canvasMain = document.getElementById('view');
const playPauseButton = document.getElementById('play-pause');
const game = new Game(canvasMain, playPauseButton, main);

//main game loop
function main(tFrame) {
  Game.stopMain = requestAnimationFrame(main);

  game.update(tFrame);
  game.render();
}

main();
