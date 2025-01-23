import './gameboard.scss';
import { gameController } from '@/index.js';
import createBoard from './board';

function createGameboard() {
  const gameboard = document.createElement('section');
  gameboard.className = 'gameboard';

  const currentPlayer = gameController.getCurrentPlayer();
  gameboard.appendChild(createBoard(currentPlayer));

  const currentOpponent = gameController.getCurrentOpponent();
  gameboard.appendChild(createBoard(currentOpponent));

  return gameboard;
}

export default createGameboard;
