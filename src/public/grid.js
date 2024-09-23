class Grid {
    constructor(cols, rows, cellSize, initiator) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;

        initiator = typeof initiator === 'undefined' ? false : 'createRandomSpace';

        if (initiator !== false) {
            this.cells = this[initiator]();
        }
    }

    cloneSpace() {
        const newGrid = new Grid(this.cols, this.rows, this.cellSize);
        newGrid.setState(this.getState());
        return newGrid;
    }

    createRandomSpace() {
        return new Array(cols).fill(null).map(() => Array.from({length: rows}, function() { return new Cell(Math.random() < 0.1)}));
    }

    createDeadSpace() {
        return new Array(cols).fill(null).map(() => Array.from({length: rows}, function() { return new Cell(false)}));
    }

    setState(cells) {
        this.cells = cells;
    }

    draw() {
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                const x = i * this.cellSize;
                const y = j * this.cellSize;

                stroke('#333');
                if (this.cells[i][j].isAlive()) {

                    fill('white');
                } else {
                    fill('black');
                }

                rect(x, y, this.cellSize, this.cellSize);
            }
        }
    }

    cycle() {
        let newState = this.cloneSpace();

        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {

                const point = new Point(i, j);
                let cell = this.getCell(point)

                const aliveNeigh = this.countAlive(this.neighbors(point));
                if (cell && cell.isAlive()) {

                    // 1 or no DIE
                    if (aliveNeigh <= 1)
                        newState.getCell(point).kill()

                    // 4 or more DIE
                    if (aliveNeigh >= 4)
                        newState.getCell(point).kill()

                    // 2 or 3 SURVIVE
                } else {

                    // 3 neigh become ALIVE
                    if (aliveNeigh === 3)
                        newState.getCell(point).born();
                }

            }
        }
        this.cells = newState.cells;

        this.draw();
    }

    getState() {
        return this.cells;
    }

    valid(point) {
        return point.x >= 0 && point.x < this.rows &&
            point.y >= 0 && point.y < this.cols;
    }

    neighbors(point) {
        return point.neighbors().filter((point) => this.valid(point));
    }

    countAlive(points) {
        return points.filter((point) => this.getCell(point).isAlive()).length;
    }

    mousePressed(mouseX, mouseY) {
        // Check if the click is within this grid's bounds
        if (mouseX >= mouseX <= this.cols * this.cellSize
            && mouseY <= this.rows * this.cellSize) {
            // Calculate the cell indices
            const point = this.fromSpaceToGrid(mouseX, mouseY);

            this.getCell(point).toggle();

            return true; // Indicate that the click was handled
        }

        return false; // Click was not within this grid
    }

    fromSpaceToGrid(x, y) {
        return new Point(
            Math.floor((x) / this.cellSize),
            Math.floor((y) / this.cellSize)
        )
    }

    getCell(point) {
        return this.cells[point.x][point.y];
    }

    toggleCell(i, j) {
        if (i >= 0 && i < this.cols && j >= 0 && j < this.rows) {
            // If the grid is 'treadling' and the cell is about to be set to true (black),
            // clear all other cells in the same row.
            if (this.type === 'treadling' && !this.cells[i][j]) {
                // Clear the entire row
                for (let col = 0; col < this.cols; col++) {
                    this.cells[col][j] = false; // Set all cells in this row to false (white)
                }
            }

            // Toggle the target cell
            this.cells[i][j] = !this.cells[i][j];
        }
    }
}
