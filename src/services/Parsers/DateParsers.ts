class DateParsers {
    public static parseDate(listOfDates: string[]): any[] {
        return listOfDates.map((date: string) => ({
            value: date,
            label: DateParsers.simpleParseDate(date),
        }));
    }

    public static simpleParseDate(date: string): string {
        return `${date.substr(6, 2)}-${date.substr(4, 2)}-${date.substr(0, 4)}`;
    }

    // Format a Date object
    public static formatDate(date: Date, format: string): string {
        const map: { [key: string]: string } = {
            mm: `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}`,
            dd: `${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`,
            yy: `${date.getFullYear().toString().slice(-2)}`,
            yyyy: `${date.getFullYear()}`,
        };

        return format.replace(/mm|dd|yy|yyyy/gi, (matched: string) => map[matched]);
    }
}

export default DateParsers;
