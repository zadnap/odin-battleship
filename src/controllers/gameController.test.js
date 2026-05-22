import GameController from './gameController';

let mockPlayer1, mockPlayer2, mockGameboard1, mockGameboard2, controller;

beforeEach(() => {
  mockGameboard1 = {
    receiveAttack: jest.fn(),
    isAllSunk: jest.fn().mockReturnValue(false),
  };
  mockGameboard2 = {
    receiveAttack: jest.fn(),
    isAllSunk: jest.fn().mockReturnValue(false),
  };

  mockPlayer1 = {
    getGameboard: jest.fn().mockReturnValue(mockGameboard1),
    clearBoard: jest.fn(),
  };
  mockPlayer2 = {
    getGameboard: jest.fn().mockReturnValue(mockGameboard2),
    clearBoard: jest.fn(),
  };

  controller = new GameController();
});

describe('Player Handling', () => {
  test('should add a computerized player as a default', () => {
    controller.playWithComputer();
    expect(controller.getCurrentPlayer().isComputer()).toBe(true);
  });

  test('should initialize with no winner', () => {
    expect(controller.getWinner()).toBe(null);
  });

  test('should not be able to have more than 2 players', () => {
    controller.addPlayer(mockPlayer1);
    controller.addPlayer(mockPlayer2);
    expect(() => controller.addPlayer({})).toThrow(
      'Cannot have more than 2 players'
    );
  });
});

describe('Gameplay', () => {
  test('should start a fresh game with no winner and clear board boards', () => {
    controller.addPlayer(mockPlayer1);
    controller.addPlayer(mockPlayer2);

    controller.playTurn(0, 0);
    controller.startNew();

    expect(controller.getWinner()).toBe(null);
    expect(() => controller.addPlayer({})).toThrow(
      'Cannot have more than 2 players'
    );
  });

  // eslint-disable-next-line quotes
  test("should register attack on opponent's grid during playTurn", () => {
    controller.addPlayer(mockPlayer1);
    controller.addPlayer(mockPlayer2);

    controller.playTurn(2, 3);

    expect(mockGameboard2.receiveAttack).toHaveBeenCalledWith(2, 3);
    expect(mockGameboard1.receiveAttack).not.toHaveBeenCalled();
  });

  test('should switch players after a turn', () => {
    mockPlayer2.computerMakeChoice = jest.fn().mockReturnValue({ x: 0, y: 2 });
    controller.addPlayer(mockPlayer1);
    controller.addPlayer(mockPlayer2);

    controller.playTurn(1, 1);
    controller.computerPlayTurn();

    expect(mockGameboard1.receiveAttack).toHaveBeenCalledWith(0, 2);
    expect(mockGameboard2.receiveAttack).toHaveBeenCalledWith(1, 1);
  });

  test('should determine a winner if all opponent ships are sunk', () => {
    controller.addPlayer(mockPlayer1);
    controller.addPlayer(mockPlayer2);

    mockGameboard2.isAllSunk.mockReturnValue(true);

    controller.playTurn(4, 4);

    expect(controller.getWinner()).toBe(mockPlayer1);
  });
});
