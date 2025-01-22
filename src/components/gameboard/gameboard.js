import './gameboard.scss';
import createTitle from './title';
import createGrid from '@/components/grid/grid.js';
import createShipyard from '@/components/shipyard/shipyard.js';
import { gameController } from '@/index.js';

function createGameboard() {
  const gameboard = document.createElement('section');
  gameboard.className = 'gameboard';

  const oceanBoard = document.createElement('section');
  oceanBoard.className = 'ocean-board';
  oceanBoard.appendChild(
    createTitle(gameController.getCurrentPlayer().getName())
  );
  oceanBoard.appendChild(createGrid(10));
  const currentPlayerShips = gameController
    .getCurrentPlayer()
    .getGameboard()
    .getShips();
  oceanBoard.appendChild(createShipyard(currentPlayerShips));
  gameboard.appendChild(oceanBoard);

  const targetBoard = document.createElement('section');
  targetBoard.className = 'target-board';
  targetBoard.appendChild(
    createTitle(gameController.getCurrentOpponent().getName())
  );
  targetBoard.appendChild(createGrid(10));
  const currentOpponentShips = gameController
    .getCurrentOpponent()
    .getGameboard()
    .getShips();
  targetBoard.appendChild(createShipyard(currentOpponentShips));
  gameboard.appendChild(targetBoard);

  return gameboard;
}

export default createGameboard;
