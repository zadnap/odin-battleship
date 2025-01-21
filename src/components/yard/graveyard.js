import './yard.scss';
import createShipInfo from '@/components/shipInfo/shipInfo.js';

function createGraveyard() {
  const graveyard = document.createElement('div');
  graveyard.className = 'yard';

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = 'graveyard';
  graveyard.appendChild(title);

  const yardList = document.createElement('div');
  yardList.className = 'yard-list';
  yardList.appendChild(createShipInfo('Cruiser', 2));
  yardList.appendChild(createShipInfo('Submarine', 3));
  graveyard.appendChild(yardList);

  return graveyard;
}

export default createGraveyard;
