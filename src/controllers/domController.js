/* eslint-disable quotes */
import '@/assets/styles/globals.scss';
import createStartScreen from '@/components/startScreen/startScreen.js';
import createGameHost from '@/components/gameHost/gameHost.js';
import createGameboard from '@/components/gameboard/gameboard.js';
import { gameController } from '@/index.js';

class DOMController {
  #app = document.querySelector('#app');

  #hostMessages = {
    randomization: `Welcome Admiral {playerName}.
      (Press "R" to rearrange ships on grid.
      When you are ready, press "Enter" to start playing)`,
    gameStart: 'All ships are in position! Let the battle begin!',
    awaitOrders: 'Awaiting your orders, Admiral {playerName}.',
    attack: {
      hit: "You fired a shot at {opponentName}'s grid and...hit a ship!",
      miss: "You fired a shot at {opponentName}'s grid and...missed!",
    },
    receiveAttack: {
      hit: '{opponentName} has fired a shot at your grid and...hit one of your ships!',
      miss: '{opponentName} has fired a shot at your grid and...missed!',
    },
    victory:
      "Congratulations, Admiral {playerName}, you've sunk all enemy ships!",
    defeat:
      '{opponentName} has sunk all your ships. Better luck next time, Admiral {playerName}.',
    playAgain: 'Would you like to play again? (Press Y for Yes or N for No)',
  };

  #replacePlaceholders(template, placeholders) {
    return template.replace(
      /{(\w+)}/g,
      (_, key) => placeholders[key] || `{${key}}`
    );
  }

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
    this.#renderGameHost();
    this.#renderGameboard();
    const message = this.#replacePlaceholders(
      this.#hostMessages.randomization,
      { playerName: gameController.getCurrentPlayer().getName() }
    );
    await this.#showGameHostMessage(message);
    this.#listenForRearranging();
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

  #renderGameHost() {
    this.#render(createGameHost());
  }

  async #showGameHostMessage(message, delay = 0) {
    const gameHost = document.querySelector('.game-host');
    gameHost.textContent = '';

    await this.#typeMessage(gameHost, message);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  #typeMessage(element, message, speed = 40) {
    return new Promise((resolve) => {
      let index = 0;

      function typeChar() {
        if (index < message.length) {
          element.textContent += message.charAt(index);
          index++;
          setTimeout(typeChar, speed);
        } else {
          resolve();
        }
      }

      typeChar();
    });
  }

  #renderGameboard() {
    const gameboard = document.querySelector('.gameboard');
    if (gameboard) {
      this.#remove(gameboard);
    }
    this.#render(createGameboard());
  }

  #listenForRearranging() {
    const handleRearranging = (event) => {
      if (event.key === 'r') {
        this.#rearrangeShips();
      } else if (event.key === 'Enter') {
        window.removeEventListener('keydown', handleRearranging);
        this.#startGame();
      }
    };
    window.addEventListener('keydown', handleRearranging);
  }

  #rearrangeShips() {
    gameController.getCurrentPlayer().getGameboard().autoPlaceShips();
    this.#renderGameboard();
  }

  async #startGame() {
    await this.#showGameHostMessage(this.#hostMessages.gameStart, 1000);
    const awaitOrdersMsg = this.#replacePlaceholders(
      this.#hostMessages.awaitOrders,
      { playerName: gameController.getCurrentPlayer().getName() }
    );
    await this.#showGameHostMessage(awaitOrdersMsg, 100);
    this.#listenForAttacks();
  }

  #listenForAttacks() {
    const targetGrid = document.querySelector('.target-board .grid');
    const handleAttacking = async (event) => {
      if (event.target !== targetGrid) {
        const x = Number(event.target.dataset.x);
        const y = Number(event.target.dataset.y);

        if (this.#hasAlreadyAttacked(x, y)) return;
        targetGrid.removeEventListener('click', handleAttacking);

        await this.#humanAttack(x, y);

        if (gameController.getWinner()) {
          this.#endGame();
        }

        await this.#computerAttack(x, y);

        if (gameController.getWinner()) {
          this.#endGame();
        } else {
          this.#listenForAttacks();
        }
      }
    };
    targetGrid.addEventListener('click', handleAttacking);
  }

  async #humanAttack(x, y) {
    const humanResult = gameController.playTurn(x, y);
    let attackMsg;
    if (humanResult) {
      attackMsg = this.#replacePlaceholders(this.#hostMessages.attack.hit, {
        opponentName: gameController.getCurrentOpponent().getName(),
      });
    } else {
      attackMsg = this.#replacePlaceholders(this.#hostMessages.attack.miss, {
        opponentName: gameController.getCurrentOpponent().getName(),
      });
    }
    await this.#showGameHostMessage(attackMsg, 500);
    this.#renderGameboard();
  }

  async #computerAttack(x, y) {
    const computerResult = gameController.computerPlayTurn(x, y);
    let receiveAttackMsg;
    if (computerResult) {
      receiveAttackMsg = this.#replacePlaceholders(
        this.#hostMessages.receiveAttack.hit,
        {
          opponentName: gameController.getCurrentOpponent().getName(),
        }
      );
    } else {
      receiveAttackMsg = this.#replacePlaceholders(
        this.#hostMessages.receiveAttack.miss,
        {
          opponentName: gameController.getCurrentOpponent().getName(),
        }
      );
    }
    await this.#showGameHostMessage(receiveAttackMsg, 500);
    this.#renderGameboard();
  }

  #hasAlreadyAttacked(x, y) {
    const shots = gameController.getCurrentOpponent().getGameboard().getShots();
    return shots.find(
      (shot) => shot.coordinates[0] === x && shot.coordinates[1] === y
    );
  }

  async #endGame() {
    const winner = gameController.getWinner();
    let message;
    if (winner === gameController.getCurrentPlayer()) {
      message = this.#replacePlaceholders(this.#hostMessages.victory, {
        playerName: gameController.getCurrentPlayer().getName(),
      });
    } else {
      message = this.#replacePlaceholders(this.#hostMessages.defeat, {
        opponentName: gameController.getCurrentOpponent().getName(),
        playerName: gameController.getCurrentPlayer().getName(),
      });
    }
    await this.#showGameHostMessage(message, 1000);
    await this.#showGameHostMessage(this.#hostMessages.playAgain, 100);
    this.#listenForRestart();
  }

  #listenForRestart() {
    const handlePlayingAgain = async (event) => {
      if (event.key === 'y') {
        window.removeEventListener('keydown', handlePlayingAgain);
        this.#restartGame();
        const message = this.#replacePlaceholders(
          this.#hostMessages.randomization,
          { playerName: gameController.getCurrentPlayer().getName() }
        );
        await this.#showGameHostMessage(message, 100);
        this.#renderGameboard();
        this.#listenForRearranging();
      } else if (event.key === 'n') {
        window.removeEventListener('keydown', handlePlayingAgain);
        gameController.refresh();
        this.renderStartScreen();
      }
    };
    window.addEventListener('keydown', handlePlayingAgain);
  }

  #restartGame() {
    gameController.startNew();
    gameController.getCurrentPlayer().getGameboard().autoPlaceShips();
    gameController.getCurrentOpponent().getGameboard().autoPlaceShips();
  }
}

export default DOMController;
