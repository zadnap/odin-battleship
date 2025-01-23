function createCell(state) {
  const cell = document.createElement('div');
  cell.className = `cell ${state}`;

  return cell;
}

export default createCell;
