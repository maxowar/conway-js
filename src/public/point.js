
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y}})`
    }

    up() {
        return new Point(this.x, this.y - 1);
    }


    down() {
        return new Point(this.x, this.y + 1);
    }


    left() {
        return new Point(this.x - 1, this.y);
    }


    right() {
        return new Point(this.x + 1, this.y);
    }

    neighbors() {
        return new Array(
            this.up().left(),
            this.up(),
            this.up().right(),
            this.left(),
            this.right(),
            this.down().left(),
            this.down(),
            this.down().right()
        );
    }
}