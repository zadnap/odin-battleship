import Player from '@/models/player';

class GameController {
  #players = [];
  #currentPlayerIndex = 0;
  #winner = null;

  startNew() {
    this.#currentPlayerIndex = 0;
    this.#winner = null;
    this.#players.forEach((player) => player.clearBoard());
  }

  refresh() {
    this.#currentPlayerIndex = 0;
    this.#winner = null;
    this.#players = [];
  }

  playWithComputer() {
    this.addPlayer(new Player('Helia', true));
  }

  addPlayer(player) {
    if (this.#players.length === 2)
      throw new Error('Cannot have more than 2 players');
    this.#players.push(player);
  }

  playTurn(x, y) {
    const gameboard = this.getCurrentOpponent().getGameboard();
    const result = gameboard.receiveAttack(x, y);
    if (gameboard.isAllSunk()) {
      this.#winner = this.getCurrentPlayer();
    }
    return result;
  }

  computerPlayTurn() {
    const playerBoard = this.getCurrentPlayer().getGameboard();
    const { x, y } = this.getCurrentOpponent().computerMakeChoice(playerBoard);
    const result = playerBoard.receiveAttack(x, y);
    if (playerBoard.isAllSunk()) {
      this.#winner = this.getCurrentOpponent();
    }
    return result;
  }

  getCurrentPlayer() {
    return this.#players[this.#currentPlayerIndex];
  }

  getCurrentOpponent() {
    return this.#players[1 - this.#currentPlayerIndex];
  }

  getWinner() {
    return this.#winner;
  }
}

export default GameController;
