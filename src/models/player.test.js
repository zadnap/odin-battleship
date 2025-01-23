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

  test('should initialize with a randomizedly pre-populated gameboard if their are computerized', () => {
    expect(player.getShips().every((ship) => ship.isPlaced())).toBe(true);
  });
});

describe('Player Name', () => {
  test('should be between 3 and 15 characters', () => {
    expect(() => new Player('Ha')).toThrow(
      'Name length must be between 3 and 15 characters'
    );
    expect(() => new Player('HeliaHeliaHeliaHelia')).toThrow(
      'Name length must be between 3 and 15 characters'
    );
  });

  test('should not contains restricted characters', () => {
    expect(() => new Player('!@#$%^Helia@#~')).toThrow(
      'Name can only contain letters and numbers'
    );
  });
});
