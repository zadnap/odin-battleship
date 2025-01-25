import Gameboard from './gameboard';

describe('Initialization', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should initialize with an empty grid', () => {
    const emptyGrid = [];
    for (let i = 0; i < 10; i++) {
      const row = Array(10).fill(null);
      emptyGrid.push(row);
    }
    expect(gameboard.getGrid()).toEqual(emptyGrid);
  });
});

describe('Ship Placement', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = gameboard.getShips()[0];
  });

  test('should be able to automatically place all the ships on the grid', () => {
    gameboard.autoPlaceShips();
    expect(gameboard.getShips().every((ship) => ship.isPlaced())).toBe(true);
  });

  test('should be able to place horizontal ship at specific coordinates', () => {
    gameboard.placeShip(0, [0, 0], 'horizontal');
    expect(ship.getLength()).toBe(2);
    expect(gameboard.getCell(0, 0)).toEqual(ship);
    expect(gameboard.getCell(0, 1)).toEqual(ship);
  });

  test('should be able to place vertical ship at specific coordinates', () => {
    gameboard.placeShip(0, [0, 0], 'vertical');
    expect(gameboard.getCell(0, 0)).toEqual(ship);
    expect(gameboard.getCell(1, 0)).toEqual(ship);
  });

  test('should not be able to place ship that is not horizontal or vertical', () => {
    expect(() => gameboard.placeShip(0, [0, 0], 'diagonal')).toThrow(
      'Can only place ship horizontally or vertically'
    );
  });

  test('should not be able to place ship that is not inside the ship list', () => {
    expect(() => gameboard.placeShip(-1, [0, 0], 'horizontal')).toThrow(
      'The ship index must be between 0 and 4'
    );
    expect(() => gameboard.placeShip('5', [0, 0], 'horizontal')).toThrow(
      'The ship index must be between 0 and 4'
    );
  });

  test('should not be able to place ship reaching outside the grid', () => {
    expect(() => gameboard.placeShip(0, [9, 9], 'horizontal')).toThrow(
      'Cannot place ship outside the grid'
    );
    expect(() => gameboard.placeShip(0, [-1, -1], 'horizontal')).toThrow(
      'Cannot place ship outside the grid'
    );
  });

  test('should not be able to place ship overlapping each other', () => {
    gameboard.placeShip(0, [0, 0], 'horizontal');
    expect(() => gameboard.placeShip(1, [0, 1], 'vertical')).toThrow(
      'Cannot place ship overlapping each other'
    );
  });
});

describe('Attack Reception', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = gameboard.getShips()[0];
    gameboard.placeShip(0, [0, 0], 'horizontal');
  });

  test('should register hit on grid', () => {
    expect(gameboard.receiveAttack(0, 0)).toEqual({
      type: 'hit',
      sunkShip: null,
    });
    expect(gameboard.getShots()[0]).toEqual({
      type: 'hit',
      coordinates: [0, 0],
    });
  });

  test('should register hit on ship', () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(ship.getHits()).toBe(2);
  });

  test('should register miss on grid', () => {
    expect(gameboard.receiveAttack(1, 0)).toEqual({ type: 'miss' });
    expect(gameboard.getShots()[0]).toEqual({
      type: 'miss',
      coordinates: [1, 0],
    });
  });
});

describe('Ship Sunk', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.placeShip(0, [0, 0], 'horizontal');
    gameboard.placeShip(1, [1, 0], 'horizontal');
    gameboard.placeShip(2, [2, 0], 'horizontal');
    gameboard.placeShip(3, [3, 0], 'horizontal');
    gameboard.placeShip(4, [4, 0], 'horizontal');
  });

  test('should report when all ships have been sunk', () => {
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);
    gameboard.receiveAttack(1, 3);
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(2, 0);
    gameboard.receiveAttack(2, 1);
    gameboard.receiveAttack(2, 2);
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(3, 0);
    gameboard.receiveAttack(3, 1);
    gameboard.receiveAttack(3, 2);
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 4);
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(4, 0);
    gameboard.receiveAttack(4, 1);
    gameboard.receiveAttack(4, 2);
    expect(gameboard.isAllSunk()).toBe(true);
  });
});
