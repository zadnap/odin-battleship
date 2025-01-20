class GameController {
  #players = [];
  #currentPlayerIndex = 0;
  #winner = null;

  constructor() {}

  startNew() {
    this.#currentPlayerIndex = 0;
    this.#players = [];
    this.#winner = null;
  }

  addPlayer(player) {
    if (this.#players.length === 2)
      throw new Error('Cannot have more than 2 players');
    this.#players.push(player);
  }

  playTurn(x, y) {
    this.#attack(x, y);
    if (this.#isGameOver()) {
      this.#winner = this.#getCurrentPlayer();
    } else {
      this.#switchPlayer();
    }
  }

  #getCurrentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  #attack(x, y) {
    const opponent = this.#getOpponentPlayer();
    const gameboard = opponent.getGameboard();
    gameboard.receiveAttack(x, y);
  }

  #isGameOver() {
    const opponent = this.#getOpponentPlayer();
    const gameboard = opponent.getGameboard();
    return gameboard.isAllSunk();
  }

  #getOpponentPlayer() {
    return this.#players[1 - this.#currentPlayerIndex];
  }

  #switchPlayer() {
    this.#currentPlayerIndex = 1 - this.#currentPlayerIndex;
  }

  getWinner() {
    return this.#winner;
  }
}

export default GameController;
