import '@/assets/styles/globals.scss';
import createStartScreen from '@/components/startScreen/startScreen.js';
import createGameHost from '@/components/gameHost/gameHost.js';
import createGameboard from '@/components/gameboard/gameboard.js';
import { gameController } from '@/index.js';

class DOMController {
  #app = document.querySelector('#app');

  constructor() {}

  #render(content, container = this.#app) {
    container.appendChild(content);
  }

  #remove(content, container = this.#app) {
    container.removeChild(content);
  }

  renderStartScreen() {
    this.#app.innerHTML = '';
    this.#render(createStartScreen());
  }

  async renderMainScreen() {
    await this.#closeStartScreen();
    this.renderGameHost(
      `Welcome Admiral ${gameController.getCurrentPlayer().getName()}.
      Press "R" to rearrange ships on grid.
      When you are ready, press "Enter" to start playing.`
    );
    this.renderGameboard();
    this.#listenToRearranging();
  }

  async #closeStartScreen() {
    const startScreen = document.querySelector('.start-screen');

    await new Promise((resolve) => {
      const handleTransitionEnd = () => {
        resolve();
        startScreen.removeEventListener('transitionend', handleTransitionEnd);
      };
      startScreen.addEventListener('transitionend', handleTransitionEnd);
      startScreen.style.opacity = 0;
    });

    this.#remove(startScreen);
  }

  renderGameHost(message) {
    const gameHost = document.querySelector('.game-host');
    if (gameHost) gameHost.textContent = message;
    else this.#render(createGameHost(message));
  }

  renderGameboard() {
    const gameboard = document.querySelector('.gameboard');
    if (gameboard) this.#remove(gameboard);
    this.#render(createGameboard());
  }

  #listenToRearranging() {
    const handleRearrange = (event) => {
      if (event.key === 'r') {
        gameController.getCurrentPlayer().getGameboard().autoPlaceShips();
        this.renderGameboard();
      } else if (event.key === 'Enter') {
        window.removeEventListener('keydown', handleRearrange);
        this.renderGameHost(
          `Awaiting orders, Admiral ${gameController.getCurrentPlayer().getName()}`
        );
        this.#listenAttacking();
      }
    };
    window.addEventListener('keydown', handleRearrange);
  }

  #listenAttacking() {
    const targetGrid = document.querySelector('.target-board .grid');
    targetGrid.addEventListener('click', (event) => {
      if (event.target !== targetGrid) {
        const x = Number(event.target.dataset.x);
        const y = Number(event.target.dataset.y);

        const shots = gameController
          .getCurrentOpponent()
          .getGameboard()
          .getShots();
        if (
          !shots.find(
            (shot) => shot.coordinates[0] === x && shot.coordinates[1] === y
          )
        ) {
          gameController.playTurn(x, y);
          this.renderGameboard();

          if (gameController.getWinner()) {
            this.renderGameHost(
              `${gameController.getWinner().getName()} has won this game. Would you like to play again? (press "Y" or "N")`
            );
            this.#listenPlayingAgain();
          } else {
            this.#listenAttacking();
          }
        }
      }
    });
  }

  #listenPlayingAgain() {
    const handlePlayingAgain = (event) => {
      if (event.key === 'y') {
        window.removeEventListener('keydown', handlePlayingAgain);
        gameController.startNew();
        gameController.getCurrentPlayer().getGameboard().autoPlaceShips();
        gameController.getCurrentOpponent().getGameboard().autoPlaceShips();
        this.renderGameHost(
          `Welcome Admiral ${gameController.getCurrentPlayer().getName()}.
          Press "R" to rearrange ships on grid.
          When you are ready, press "Enter" to start playing.`
        );
        this.renderGameboard();
        this.#listenToRearranging();
      } else if (event.key === 'n') {
        window.removeEventListener('keydown', handlePlayingAgain);
        gameController.refresh();
        this.renderStartScreen();
      }
    };
    window.addEventListener('keydown', handlePlayingAgain);
  }
}

export default DOMController;
