import './shipInfo.scss';

function createShipInfo(name, length) {
  const shipInfo = document.createElement('p');
  shipInfo.className = 'ship-info';
  shipInfo.textContent = `${name} (${length})`;

  return shipInfo;
}

export default createShipInfo;
