import './shipyard.scss';
import createShipInfo from '@/components/shipInfo/shipInfo.js';

function createShipyard(ships) {
  const shipyard = document.createElement('div');
  shipyard.className = 'shipyard';

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
