import './shipyard.scss';
import createShipInfo from '@/components/shipInfo/shipInfo.js';

function createShipyard(ships) {
  const shipyard = document.createElement('div');
  shipyard.className = 'shipyard';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = 'shipyard';
  shipyard.appendChild(title);

  const yardList = document.createElement('div');
  yardList.className = 'yard-list';
  ships.forEach((ship) => {
    yardList.appendChild(
      createShipInfo(ship.getName(), ship.getLength(), ship.isSunk())
    );
  });
  shipyard.appendChild(yardList);

  return shipyard;
}

export default createShipyard;
