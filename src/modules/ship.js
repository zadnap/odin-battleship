class Ship {
  #length;
  #hit;

  constructor(length) {
    this.#length = length;
    this.#hit = 0;
  }

  getLength() {
    return this.#length;
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
