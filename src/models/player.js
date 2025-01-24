import Gameboard from './gameboard';

class Player {
  #name;
  #computerized;
  #gameboard;

  constructor(name, computerized = false) {
    this.#name = this.#verifyName(name);
    this.#computerized = computerized;
    this.#gameboard = this.#generateGameboard();
  }

  #verifyName(name) {
    const trimmedName = name.trim();
    const allowCharacters = /^[a-zA-Z0-9]+$/;

    if (trimmedName.length > 15 || trimmedName.length < 3)
      throw new Error('Name length must be between 3 and 15 characters');
    if (!allowCharacters.test(trimmedName))
      throw new Error('Name can only contain letters and numbers');

    return trimmedName;
  }

  #generateGameboard() {
    const gameboard = new Gameboard();
    if (this.isComputer()) gameboard.autoPlaceShips();
    return gameboard;
  }

  getName() {
    return this.#name;
  }

  isComputer() {
    return this.#computerized;
  }

  getGameboard() {
    return this.#gameboard;
  }

  getGameboardGrid() {
    return this.#gameboard.getGrid();
  }

  getShips() {
    return this.#gameboard.getShips();
  }

  isLost() {
    return this.#gameboard.isAllSunk();
  }

  clearBoard() {
    this.#gameboard = this.#generateGameboard();
  }

  computerMakeChoice(opponentBoard) {
    const shots = opponentBoard.getShots();
    const size = opponentBoard.getSize();

    const hits = shots.filter((shot) => shot.type === 'hit');
    const lastHit = hits[hits.length - 1];
    const secondLastHit = hits.length > 1 ? hits[hits.length - 2] : null;

    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    const isValidCoordinate = (x, y) =>
      x >= 0 &&
      x < size &&
      y >= 0 &&
      y < size &&
      !shots.find(
        (shot) => shot.coordinates[0] === x && shot.coordinates[1] === y
      );

    if (lastHit && secondLastHit) {
      const [x1, y1] = lastHit.coordinates;
      const [x2, y2] = secondLastHit.coordinates;

      if (x1 === x2) {
        const possibleY = [Math.min(y1, y2) - 1, Math.max(y1, y2) + 1];
        for (const newY of possibleY) {
          if (isValidCoordinate(x1, newY)) {
            return { x: x1, y: newY };
          }
        }
      } else if (y1 === y2) {
        const possibleX = [Math.min(x1, x2) - 1, Math.max(x1, x2) + 1];
        for (const newX of possibleX) {
          if (isValidCoordinate(newX, y1)) {
            return { x: newX, y: y1 };
          }
        }
      }
    }

    if (lastHit) {
      const [x, y] = lastHit.coordinates;
      for (const { dx, dy } of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (isValidCoordinate(newX, newY)) {
          return { x: newX, y: newY };
        }
      }
    }

    while (true) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);

      if (isValidCoordinate(x, y)) {
        return { x, y };
      }
    }
  }
}

export default Player;
