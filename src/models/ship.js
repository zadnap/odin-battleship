class Ship {
  #name;
  #length;
  #hit;
  #placed;

  constructor(name, length) {
    this.#name = name;
    this.#length = length;
    this.#placed = false;
    this.#hit = 0;
  }

  getName() {
    return this.#name;
  }

  getLength() {
    return this.#length;
  }

  isPlaced() {
    return this.#placed;
  }

  placed() {
    this.#placed = true;
  }

  unPlaced() {
    this.#placed = false;
  }

  getHits() {
    return this.#hit;
  }

  isSunk() {
    return this.#hit === this.#length;
  }

  hit() {
    if (this.#hit < this.#length) this.#hit++;
  }
}

export default Ship;
