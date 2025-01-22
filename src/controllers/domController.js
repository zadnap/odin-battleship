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
    this.#render(createStartScreen());
  }

  async renderMainScreen() {
    await this.#closeStartScreen();
    const secondPlayer = gameController.getPlayers()[1];
    this.renderGameHost(
      `Welcome ${secondPlayer.getName()}! First you need to place your ships`
    );
    this.renderGameboard();
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
}

export default DOMController;
