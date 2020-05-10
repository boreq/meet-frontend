export class Vector {
    constructor(public x: number, public y: number) {
    }

    distance(other: Vector): number {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2),
        );
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    multiply(v: number): Vector {
        return new Vector(this.x * v, this.y * v);
    }

    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    normalise(): Vector {
        const length = this.distance(new Vector(0, 0));
        if (length === 0) {
            return new Vector(0, 0);
        }
        return new Vector(this.x / length, this.y / length);
    }


}

export class Rectangle {
    constructor(public x: number, public y: number, public width: number, public height: number) {
    }
}
