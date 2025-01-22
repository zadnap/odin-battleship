import './yard.scss';
import createShip from '@/components/ship/ship.js';
import { gameController } from '@/index.js';

function createShipyard() {
  const shipyard = document.createElement('div');
  shipyard.className = 'yard';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = 'shipyard';
  shipyard.appendChild(title);

  const yardList = document.createElement('div');
  yardList.className = 'yard-list';
  const currentPlayerShips = gameController
    .getCurrentPlayer()
    .getGameboard()
    .getShips();
  currentPlayerShips.forEach((ship) => {
    yardList.appendChild(createShip(ship.getLength()));
  });
  shipyard.appendChild(yardList);

  return shipyard;
}

export default createShipyard;
