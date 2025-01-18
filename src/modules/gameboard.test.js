import Gameboard from './gameboard';
import Ship from './ship';

describe('Initialization', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should initialize with an empty ship list', () => {
    expect(gameboard.getShips()).toEqual([]);
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
    ship = new Ship(3);
  });

  test('should be able to place horizontal ship at specific coordinates', () => {
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.getCell(0, 0)).toEqual(ship);
    expect(gameboard.getCell(0, 1)).toEqual(ship);
    expect(gameboard.getCell(0, 2)).toEqual(ship);
  });

  test('should be able to place vertical ship at specific coordinates', () => {
    gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(gameboard.getCell(0, 0)).toEqual(ship);
    expect(gameboard.getCell(1, 0)).toEqual(ship);
    expect(gameboard.getCell(2, 0)).toEqual(ship);
  });

  test('should not be able to place ship that is not horizontal or vertical', () => {
    expect(() => gameboard.placeShip(ship, [0, 0], 'diagonal')).toThrow(
      'Can only place ship horizontally or vertically'
    );
  });

  test('should not be able to place ship reaching outside the grid', () => {
    expect(() => gameboard.placeShip(ship, [9, 9], 'horizontal')).toThrow(
      'Cannot place ship outside the grid'
    );
    expect(() => gameboard.placeShip(ship, [-1, -1], 'horizontal')).toThrow(
      'Cannot place ship outside the grid'
    );
  });

  test('should not be able to place ship overlapping each other', () => {
    const anotherShip = new Ship(2);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(() => gameboard.placeShip(anotherShip, [0, 1], 'vertical')).toThrow(
      'Cannot place ship overlapping each other'
    );
  });
});

describe('Attack Reception', () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
  });

  test('should register hit on grid', () => {
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
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
    expect(gameboard.receiveAttack(1, 0)).toBe(false);
    expect(gameboard.getShots()[0]).toEqual({
      type: 'miss',
      coordinates: [1, 0],
    });
  });
});

describe('Ship Sunk', () => {
  let gameboard;
  let ship;
  let ship2;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
    ship2 = new Ship(2);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.placeShip(ship2, [1, 0], 'horizontal');
  });

  test('should report when all ships have been sunk', () => {
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    expect(gameboard.isAllSunk()).toBe(false);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(1, 1);
    expect(gameboard.isAllSunk()).toBe(true);
  });
});
