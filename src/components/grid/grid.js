import './grid.scss';
import createCell from './cell';

function createGrid(size) {
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < size * size; i++) grid.appendChild(createCell());

  return grid;
}

export default createGrid;
