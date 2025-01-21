import './yard.scss';
import createShip from '@/components/ship/ship.js';

function createShipyard() {
  const shipyard = document.createElement('div');
  shipyard.className = 'yard';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = 'shipyard';
  shipyard.appendChild(title);

  const yardList = document.createElement('div');
  yardList.className = 'yard-list';
  yardList.appendChild(createShip(2));
  yardList.appendChild(createShip(3));
  shipyard.appendChild(yardList);

  return shipyard;
}

export default createShipyard;
