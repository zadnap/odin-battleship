import './grid.scss';
import createCell from './cell';
import { gameController } from '@/index.js';

function createGrid(gameboardGrid) {
  const grid = document.createElement('div');
  grid.className = 'grid';

  const currentPlayerGrid = gameController
    .getCurrentPlayer()
    .getGameboardGrid();

  gameboardGrid.forEach((row, x) => {
    row.forEach((cell, y) => {
      let state = '';
      if (cell) {
        if (cell.type) state = cell.type;
        else if (currentPlayerGrid === gameboardGrid) state = 'has-ship';
      }
      grid.appendChild(createCell([x, y], state));
    });
  });

  return grid;
}

export default createGrid;
