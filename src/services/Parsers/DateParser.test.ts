import DateParsers from './DateParsers';

describe('DateParser Service', () => {
    describe('DateParsers', () => {
        it('WHEN import a DateParsers service THEN it is defined', () => {
            expect(DateParsers).toBeDefined();
        });
    });

    describe('simpleParseDate', () => {
        it('WHEN parse "20200412" date THEN it parsed to "12-04-2020"', () => {
            expect(DateParsers.simpleParseDate('20200412')).toBe('12-04-2020');
        });
    });

    describe('parseDate', () => {
        it('WHEN parse ["20200412", "20200523"] date THEN it parsed as label value', () => {
            const result = DateParsers.parseDate(['20200412', '20200523']);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual({ label: '12-04-2020', value: '20200412' });
            expect(result[1]).toEqual({ label: '23-05-2020', value: '20200523' });
        });
    });

    describe('formatDate', () => {
        it('WHEN date is 24 12 2020 with YYYYMMDD format THEN it should return 20201224', () => {
            const result = DateParsers.formatDate(new Date(2020, 11, 24), 'yyyymmdd');
            expect(result).toBe('20201224');
        });

        it.each`
            day   | month | year    | format        | expected
            ${24} | ${11} | ${2020} | ${`yyyymmdd`} | ${'20201224'}
            ${4}  | ${11} | ${2020} | ${`yyyymmdd`} | ${'20201204'}
            ${4}  | ${1}  | ${2020} | ${`yyyymmdd`} | ${'20200204'}
            ${4}  | ${1}  | ${2020} | ${`dd-mm-yy`} | ${'04-02-20'}
        `(
            'WHEN day: $day, month: $month, year: $year and format: $format THEN expected result should be $expected',
            ({ day, month, year, format, expected }) => {
                const result = DateParsers.formatDate(new Date(year, month, day), format);
                expect(result).toBe(expected);
            }
        );
    });
});
