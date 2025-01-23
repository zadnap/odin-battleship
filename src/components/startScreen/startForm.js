import { gameController, domController } from '@/index.js';
import Player from '@/models/player';

function createStartForm() {
  const startForm = document.createElement('form');
  startForm.className = 'start-form';

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Enter your name';
  nameInput.className = 'name-input';
  startForm.appendChild(nameInput);

  const startButton = document.createElement('button');
  startButton.className = 'start-btn';
  startButton.textContent = 'Start Game';
  startForm.appendChild(startButton);

  const promptWarning = (message) => {
    const exisedWarning = document.querySelector('.warning');
    if (exisedWarning) {
      exisedWarning.textContent = message;
    } else {
      const warning = document.createElement('p');
      warning.className = 'warning';
      warning.textContent = message;
      startForm.insertBefore(warning, startButton);
    }
  };

  startForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      gameController.addPlayer(new Player(nameInput.value));
      gameController.playWithComputer();
      gameController.getCurrentPlayer().getGameboard().autoPlaceShips();
      domController.renderMainScreen();
    } catch (error) {
      promptWarning(error.message);
    }
  });

  return startForm;
}

export default createStartForm;
