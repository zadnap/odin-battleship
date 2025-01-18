import Gameboard from './gameboard';

class Player {
  #name;
  #computerized;
  #gameboard;

  constructor(name, computerized = false) {
    this.#name = name;
    this.#computerized = computerized;
    this.#gameboard = new Gameboard();
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
}

export default Player;
