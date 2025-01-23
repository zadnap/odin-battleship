import Gameboard from './gameboard';

class Player {
  #name;
  #computerized;
  #gameboard;

  constructor(name, computerized = false) {
    this.#name = this.#verifyName(name);
    this.#computerized = computerized;
    this.#gameboard = new Gameboard();
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

  getName() {
    return this.#name;
  }

  isComputer() {
    return this.#computerized;
  }

  getGameboard() {
    return this.#gameboard;
  }

  getGameboardSize() {
    return this.#gameboard.getSize();
  }

  getShips() {
    return this.#gameboard.getShips();
  }

  isLost() {
    return this.#gameboard.isAllSunk();
  }
}

export default Player;
