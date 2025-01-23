import Ship from '@/models/ship';

class Gameboard {
  #ships;
  #grid;
  #size;
  #shots;

  constructor() {
    this.#size = 10;
    this.#ships = this.#generateShips();
    this.#grid = this.#generateGrid();
    this.#shots = [];
  }

  #generateShips() {
    return [
      new Ship('Cruiser', 2),
      new Ship('Battleship', 4),
      new Ship('Submarine', 3),
      new Ship('Aircraft Carrier', 5),
      new Ship('Destroyer', 3),
    ];
  }

  #generateGrid() {
    const grid = [];
    for (let i = 0; i < this.#size; i++) {
      const row = Array(this.#size).fill(null);
      grid.push(row);
    }
    return grid;
  }

  getShips() {
    return this.#ships;
  }

  getSize() {
    return this.#size;
  }

  getGrid() {
    return this.#grid;
  }

  getCell(x, y) {
    if (!this.#isInsideGrid(x, y))
      throw new Error('Cannot touch outside the grid');
    return this.#grid[x][y];
  }

  autoPlaceShips() {
    this.#ships.forEach((ship, index) => {
      while (!ship.isPlaced()) {
        const x = Math.floor(Math.random() * this.#size);
        const y = Math.floor(Math.random() * this.#size);
        const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';

        try {
          this.placeShip(index, [x, y], orientation);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          continue;
        }
      }
    });
  }

  placeShip(shipIndex, [x, y], orientation) {
    if (!this.#isInsideShips(shipIndex))
      throw new Error('The ship index must be between 0 and 4');

    const ship = this.#ships[shipIndex];

    if (orientation === 'horizontal') {
      for (let i = y; i < y + ship.getLength(); i++) {
        if (!this.#isInsideGrid(x, i))
          throw new Error('Cannot place ship outside the grid');
        if (!this.#isAvailableCell(x, i))
          throw new Error('Cannot place ship overlapping each other');
      }
      for (let i = y; i < y + ship.getLength(); i++) {
        this.#grid[x][i] = ship;
        ship.placed();
      }
    } else if (orientation === 'vertical') {
      for (let i = x; i < x + ship.getLength(); i++) {
        if (!this.#isInsideGrid(i, y))
          throw new Error('Cannot place ship outside the grid');
        if (!this.#isAvailableCell(i, y))
          throw new Error('Cannot place ship overlapping each other');
      }
      for (let i = x; i < x + ship.getLength(); i++) {
        this.#grid[i][y] = ship;
        ship.placed();
      }
    } else {
      throw new Error('Can only place ship horizontally or vertically');
    }
  }

  #isInsideShips(index) {
    if (index < this.#ships.length && index >= 0) return true;
    return false;
  }

  #isInsideGrid(x, y) {
    if (x < this.#size && x >= 0 && y < this.#size && y >= 0) return true;
    return false;
  }

  #isAvailableCell(x, y) {
    if (this.getCell(x, y)) return false;
    return true;
  }

  receiveAttack(x, y) {
    if (!this.getCell(x, y)) {
      this.#registerMissedShot(x, y);
      return false;
    }

    const ship = this.getCell(x, y);
    ship.hit();
    this.#registerHitShot(x, y);
    return true;
  }

  getShots() {
    return this.#shots;
  }

  #registerHitShot(x, y) {
    this.#shots.push({
      type: 'hit',
      coordinates: [x, y],
    });
  }

  #registerMissedShot(x, y) {
    this.#shots.push({
      type: 'miss',
      coordinates: [x, y],
    });
  }

  isAllSunk() {
    return this.#ships.every((ship) => ship.isSunk());
  }
}

export default Gameboard;
