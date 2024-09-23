const CELL_ALIVE = true;
const CELL_DEAD = false;

class Cell {
    status = CELL_DEAD;
    constructor(alive) {
        this.status = typeof alive === 'boolean' ? alive : CELL_DEAD;
    }

    kill() {
        this.status = CELL_DEAD;
    }

    born() {
        this.status = CELL_ALIVE;
    }

    isAlive() {
        return this.status === CELL_ALIVE;
    }

    toggle() {
        this.status = !this.status;
    }
}