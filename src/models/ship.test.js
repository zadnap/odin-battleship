import Ship from './ship';

describe('Initialization', () => {
  let ship;
  let ship2;

  beforeEach(() => {
    ship = new Ship('Submarine', 3);
    ship2 = new Ship('Battleship', 4);
  });

  test('should initialize with correct length', () => {
    expect(ship.getLength()).toBe(3);
    expect(ship2.getLength()).toBe(4);
  });

  test('should initialize with correct name', () => {
    expect(ship.getName()).toBe('Submarine');
    expect(ship2.getName()).toBe('Battleship');
  });

  test('should not be placed on grid initially', () => {
    expect(ship.isPlaced()).toBe(false);
  });

  test('should initialize with 0 hit', () => {
    expect(ship.getHits()).toBe(0);
    expect(ship2.getHits()).toBe(0);
  });

  test('should not be sunk initially', () => {
    expect(ship.isSunk()).toBe(false);
    expect(ship2.isSunk()).toBe(false);
  });
});

describe('Placement', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship('Submarine', 3);
  });

  test('should change the placed state when placing on grid', () => {
    expect(ship.isPlaced()).toBe(false);
    ship.togglePlacement();
    expect(ship.isPlaced()).toBe(true);
  });
});

describe('Hit', () => {
  let ship;
  let ship2;

  beforeEach(() => {
    ship = new Ship('Submarine', 3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship2 = new Ship('Battleship', 4);
    ship2.hit();
    ship2.hit();
    ship2.hit();
    ship2.hit();
  });

  test('should sink the ship if hit reaches ship length', () => {
    expect(ship.isSunk()).toBe(true);
    expect(ship2.isSunk()).toBe(true);
  });

  test('should not exceed ship length', () => {
    ship.hit();
    expect(ship.getHits()).toBe(3);
    ship2.hit();
    expect(ship2.getHits()).toBe(4);
  });
});
