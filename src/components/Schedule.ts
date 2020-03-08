import { Component, Vue } from 'vue-property-decorator';
import { Period, Time } from '@/model/Period';
import { TextService } from '@/services/TextService';


@Component
export default class Schedule extends Vue {

    periods: Period[] = [
        new Period(new Time(8, 0), new Time(23, 0)),
        // {
        //     start: {
        //         hour: 1,
        //         minute: 0,
        //     },
        //     end: {
        //         hour: 2,
        //         minute: 0,
        //     },
        // },
        // {
        //     start: {
        //         hour: 4,
        //         minute: 0,
        //     },
        //     end: {
        //         hour: 8,
        //         minute: 30,
        //     },
        // },
        // {
        //     start: {
        //         hour: 9,
        //         minute: 0,
        //     },
        //     end: {
        //         hour: 23,
        //         minute: 15,
        //     },
        // },
    ];

    private adjusting: Period;
    private adjustingStart: boolean;

    private readonly textService = new TextService();
    private readonly entireDayInMinutes = 24 * 60;
    private readonly step = 10;
    private readonly threshold = 30;

    onMiddleClick(event: MouseEvent): void {
        const time = this.getTime(event);
        const period = this.getPeriod(time);
        this.periods = this.periods.filter(v => v != period);
    }

    onMouseMove(event: MouseEvent): void {
        const time = this.clampToStep(this.getTime(event));
        if (this.adjusting) {
            let newPeriod: Period;

            try {
                if (this.adjustingStart) {
                    newPeriod = new Period(time, this.adjusting.end);
                } else {
                    newPeriod = new Period(this.adjusting.start, time);
                }
            } catch {
                return;
            }

            if (newPeriod.lengthInMinutes() < this.step) {
                return;
            }

            for (const period of this.periods) {
                if (period.overlaps(newPeriod) && period !== this.adjusting) {
                    return;
                }
            }

            this.adjusting.start = newPeriod.start;
            this.adjusting.end = newPeriod.end;
        }
    }

    onMouseDown(event: MouseEvent): void {
        const time = this.getTime(event);
        const target = this.getNode(time);
        if (target) {
            [this.adjusting, this.adjustingStart] = target;
        } else {
            const start = this.clampToStep(time);
            const end = Schedule.toTime(Schedule.toMinutes(start) + 60);
            for (const period of this.periods) {
                if (period.contains(start) || period.contains(end)) {
                    return;
                }
            }

            this.periods.push(new Period(start, end));
        }
    }

    onMouseUp(): void {
        this.adjusting = null;
    }

    onMouseLeave(): void {
        this.adjusting = null;
    }

    formatTime(time: Time): string {
        return this.textService.formatTime(time);
    }

    periodStyle(period: Period): string {
        const startInMinutes = Schedule.toMinutes(period.start);
        const endInMinutes = Schedule.toMinutes(period.end);

        const left = startInMinutes / this.entireDayInMinutes * 100;
        const width = (endInMinutes - startInMinutes) / this.entireDayInMinutes * 100;

        return `left: ${left}%; width: ${width}%;`;
    }

    private getNode(time: Time): [Period, boolean] {
        const start = Schedule.toTime(Schedule.toMinutes(time) - this.threshold);
        const end = Schedule.toTime(Schedule.toMinutes(time) + this.threshold);
        for (const period of this.periods) {
            if (period.start.after(start) && period.start.before(end)) {
                return [period, true];
            }

            if (period.end.after(start) && period.end.before(end)) {
                return [period, false];
            }
        }

        return null;
    }

    private getPeriod(time: Time): Period {
        for (const period of this.periods) {
            if (period.contains(time)) {
                return period;
            }
        }

        return null;
    }

    private getTime(event: MouseEvent): Time {
        const target = event.currentTarget as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const f = Schedule.clamp((event.clientX - rect.left) / rect.width);
        const minutes = f * this.entireDayInMinutes;
        return Schedule.toTime(minutes);
    }

    private clampToStep(time: Time): Time {
        return new Time(time.hour, Math.floor(time.minute / this.step) * this.step);
    }

    private static toTime(minutes: number): Time {
        return new Time(Math.floor(minutes / 60), Math.floor(minutes % 60));
    }

    private static toMinutes(time: Time): number {
        return time.hour * 60 + time.minute;
    }

    private static clamp(value: number): number {
        if (value > 1) {
            return 1;
        }
        if (value < 0) {
            return 0;
        }
        return value;
    }
}
