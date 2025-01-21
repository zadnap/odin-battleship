import '@/assets/styles/globals.scss';
import createStartScreen from '@/components/startScreen/startScreen.js';
import createGameHost from '@/components/gameHost/gameHost.js';

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
    this.renderGameHost();
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

  renderGameHost() {
    this.#render(createGameHost('Welcome player Zadnap'));
  }

  renderGameboard() {}
}

export default DOMController;
