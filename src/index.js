import DOMController from '@/controllers/domController';
import GameController from '@/controllers/gameController';

const gameController = new GameController();
gameController.startNew();
const domController = new DOMController();
domController.renderStartScreen();
domController.renderMusicButton();

export { gameController, domController };
