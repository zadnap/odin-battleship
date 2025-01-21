import './gameHost.scss';

function createGameHost(message) {
  const gameHost = document.createElement('section');
  gameHost.className = 'game-host';
  gameHost.textContent = message;

  return gameHost;
}

export default createGameHost;
