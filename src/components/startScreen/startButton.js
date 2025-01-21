import DOMController from '@/controllers/domController';

function createStartButton() {
  const domController = new DOMController();

  const startButton = document.createElement('button');
  startButton.className = 'start-btn';
  startButton.textContent = 'Start Game';
  startButton.addEventListener('click', () => {
    domController.renderMainScreen();
  });

  return startButton;
}

export default createStartButton;
