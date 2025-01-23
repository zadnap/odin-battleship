import createTitle from './title';
import createGrid from '@/components/grid/grid.js';
import createShipyard from '@/components/shipyard/shipyard.js';
import { gameController } from '@/index.js';

function createBoard(player) {
  const currentPlayer = gameController.getCurrentPlayer();
  const board = document.createElement('section');
  board.className = player === currentPlayer ? 'ocean-board' : 'target-board';
  board.appendChild(createTitle(player.getName()));
  board.appendChild(createGrid(player.getGameboardSize()));
  board.appendChild(createShipyard(player.getShips()));

  return board;
}

export default createBoard;
