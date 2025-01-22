import './shipInfo.scss';

function createShipInfo(name, length, isSunk) {
  const shipInfo = document.createElement('p');
  shipInfo.className = 'ship-info';
  if (isSunk) shipInfo.classList.add('sunk');
  shipInfo.textContent = `${name} (${length})`;

  return shipInfo;
}

export default createShipInfo;
