function createStartButton() {
  const startButton = document.createElement('button');
  startButton.className = 'start-btn';
  startButton.textContent = 'Start Game';

  return startButton;
}

export default createStartButton;
