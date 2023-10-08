import { Game } from './classes/Game.js';

console.log('https://rolling-scopes-school.github.io/slumrag-JSFEPRESCHOOL2023Q2/random-game/');

const canvasMain = document.getElementById('view');

const game = new Game(canvasMain, main);

//main game loop
function main(currentTimeStamp) {
  game.stopMain = requestAnimationFrame(main);

  game.update(currentTimeStamp);
  game.render();
}

main();
