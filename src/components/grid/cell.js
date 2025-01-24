function createCell([x, y], state) {
  const cell = document.createElement('div');
  cell.dataset.x = x;
  cell.dataset.y = y;
  cell.className = `cell ${state}`;

  return cell;
}

export default createCell;
