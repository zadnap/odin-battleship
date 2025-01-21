import './ship.scss';
import createShipCell from './shipCell';

function createShip(length) {
  const ship = document.createElement('div');
  ship.className = 'ship';
  for (let i = 0; i < length; i++) ship.appendChild(createShipCell());

  return ship;
}

export default createShip;
