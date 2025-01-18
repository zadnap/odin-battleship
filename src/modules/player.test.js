import Player from './player';
import Gameboard from './gameboard';

describe('Initialization', () => {
  let player;
  let player2;

  beforeEach(() => {
    player = new Player('Zadnap', true);
    player2 = new Player('Helia');
  });

  test('should initialize with correct name', () => {
    expect(player.getName()).toBe('Zadnap');
    expect(player2.getName()).toBe('Helia');
  });

  test('should initialize with correct type (human or computer)', () => {
    expect(player.isComputer()).toBe(true);
    expect(player2.isComputer()).toBe(false);
  });

  test('should initialize with a gameboard of their own', () => {
    const gameboard = new Gameboard();
    expect(player.getGameboard()).toEqual(gameboard);
  });
});
