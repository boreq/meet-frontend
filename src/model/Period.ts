export class Time {

    constructor(public hour: number, public minute: number) {
        if (hour < 0 || hour > 23) {
            throw new Error(`invalid hour: ${hour}`);
        }

        if (minute < 0 || minute > 59) {
            throw new Error(`invalid minute: ${minute}`);
        }
    }

    after(time: Time): boolean {
        const a = toMinutes(this);
        const b = toMinutes(time);
        return a > b;
    }

    before(time: Time): boolean {
        const a = toMinutes(this);
        const b = toMinutes(time);
        return a < b;
    }

}

export class Period {

    constructor(public start: Time, public end: Time) {
        if (start.after(end)) {
            throw new Error('start can not occur after end');
        }
    }

    overlaps(other: Period): boolean {
        // this contains other
        if (this.start.before(other.start) && this.end.after(other.end)) {
            return true;
        }

        // other contains this
        if (other.start.before(this.start) && other.end.after(this.end)) {
            return true;
        }

        // this overlaps the left side of other
        if (this.start.before(other.start) && !this.end.before(other.start)) {
            return true;
        }

        // p overlaps the right side of other
        if (this.end.after(other.end) && !this.start.after(other.end)) {
            return true;
        }

        return false;
    }

    contains(time: Time): boolean {
        return this.start.before(time) && this.end.after(time);
    }

    lengthInMinutes(): number {
        return toMinutes(this.end) - toMinutes(this.start);
    }
}


function toMinutes(time: Time): number {
    return time.hour * 60 + time.minute;
}
