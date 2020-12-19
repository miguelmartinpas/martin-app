import DateParsers from '../Parsers/DateParsers';

export const NUM_ITEMS = 10;

class LottoDate {
    private numItems: number;

    private currentDate: Date;

    public constructor() {
        this.currentDate = new Date();
        this.numItems = NUM_ITEMS;
    }

    public getFromTodayParsed(): any[] {
        const lastDate = this.getDateLastResult();
        return DateParsers.parseDate(this.getPreviusResult(lastDate));
    }

    // Get date for last friday from today
    private getDateLastResult(): Date {
        const lastDay = this.currentDate.getDate() + (6 - this.currentDate.getDay() - 1) - 7;
        const lastFriday = new Date();
        lastFriday.setDate(lastDay);
        return lastFriday;
    }

    // Get a list of friday dates from "currrentDate"
    private getPreviusResult(currentDate: Date): string[] {
        const results: string[] = [];
        for (let i = 0; i < this.numItems; i += 1) {
            results.push(DateParsers.formatDate(currentDate, 'yyyymmdd'));
            currentDate.setDate(currentDate.getDate() - 7);
        }
        return results;
    }
}

export default LottoDate;
