export const NUM_ITEMS = 10;

class LottoDate {
    private numItems: number;

    public constructor() {
        this.numItems = NUM_ITEMS;
    }

    public getFromToday(): string[] {
        const lastDate = this.getDateLastResult();
        return this.getPreviusResult(lastDate);
    }

    // eslint-disable-next-line class-methods-use-this
    public simpleParserDate(date: string) {
        return `${date.substr(6, 2)}-${date.substr(4, 2)}-${date.substr(0, 4)}`;
    }

    // Get date for last friday from today
    // eslint-disable-next-line class-methods-use-this
    private getDateLastResult() {
        const date = new Date();
        const lastDay = date.getDate() + (6 - date.getDay() - 1) - 7;
        const lastFriday = new Date();
        lastFriday.setDate(lastDay);
        return lastFriday;
    }

    // Get a list of friday dates from "currrentDate"
    private getPreviusResult(currentDate: Date): string[] {
        const results: string[] = [];
        for (let i = 0; i < this.numItems; i += 1) {
            results.push(this.formatDate(currentDate, 'yyyymmdd'));
            currentDate.setDate(currentDate.getDate() - 7);
        }
        return results;
    }

    // Format a Date object
    // eslint-disable-next-line class-methods-use-this
    private formatDate(date: Date, format: string): string {
        const map: { [key: string]: string } = {
            mm: `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}`,
            dd: `${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`,
            yy: `${date.getFullYear().toString().slice(-2)}`,
            yyyy: `${date.getFullYear()}`,
        };

        return format.replace(/mm|dd|yy|yyyy/gi, (matched: string) => map[matched]);
    }
}

export default LottoDate;
