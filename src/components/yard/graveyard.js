import './yard.scss';
import createShipInfo from '@/components/shipInfo/shipInfo.js';
import { gameController } from '@/index.js';

function createGraveyard() {
  const graveyard = document.createElement('div');
  graveyard.className = 'yard';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = 'graveyard';
  graveyard.appendChild(title);

  const yardList = document.createElement('div');
  yardList.className = 'yard-list';
  const currentOpponentShips = gameController
    .getCurrentOpponent()
    .getGameboard()
    .getShips();
  currentOpponentShips.forEach((ship) => {
    yardList.appendChild(
      createShipInfo(ship.getName(), ship.getLength(), ship.isSunk())
    );
  });
  graveyard.appendChild(yardList);

  return graveyard;
}

export default createGraveyard;
