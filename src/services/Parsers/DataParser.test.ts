import DataParsers from './DataParsers';

describe('DataParser Service', () => {
    describe('DataParsers', () => {
        it('WHEN import DataParsers service THEN it is defined', () => {
            expect(DataParsers).toBeDefined();
        });
    });

    describe('getDataKeys', () => {
        it('WHEN call getDataKeys THEN it should return a map with 4 elements', () => {
            expect(DataParsers.getDataKeys().length).toBe(4);
        });
    });

    describe('getNormalizeMatch', () => {
        it.each`
            match      | expected
            ${'rank2'} | ${'5 Numbers + 0 Euronumbers'}
            ${'rank5'} | ${'3 Numbers + 2 Euronumbers'}
            ${'rank7'} | ${'2 Numbers + 2 Euronumbers'}
        `('WHEN match is $match THEN expected result should be $expected', ({ match, expected }) => {
            expect(DataParsers.getNormalizeMatch(match)).toBe(expected);
        });
    });

    describe('getParseData', () => {
        it('WHEN parse data with empty odds THEN it should return a empty array', () => {
            const data = {
                last: [
                    {
                        odds: {},
                    },
                ],
            };
            const result = DataParsers.getParseData(data);

            expect(result).toEqual([]);
        });
        it('WHEN parse data with valid odds THEN it should return a 2 items with valid parsed', () => {
            const data = {
                last: [
                    {
                        odds: {
                            rank0: { winners: 1000, prize: 10000000 },
                            rank1: { winners: 200, prize: 20000000 },
                        },
                    },
                ],
            };
            const result = DataParsers.getParseData(data);

            expect(result.length).toBe(2);
            expect(result[0].id).toBe('I');
            expect(result[0].match).toBe('5 Numbers + 2 Euronumbers');
            expect(result[0].prize).toBe('€10,000,000.00');
            expect(result[0].winners).toBe('1,000x');
            expect(result[1].id).toBe('II');
            expect(result[1].match).toBe('5 Numbers + 1 Euronumbers');
            expect(result[1].prize).toBe('€20,000,000.00');
            expect(result[1].winners).toBe('200x');
        });
    });

    describe('getNumberFormat', () => {
        it.each`
            numberToFormat | options                                                             | expected
            ${'100000'}    | ${{}}                                                               | ${'100,000'}
            ${'1'}         | ${{}}                                                               | ${'1'}
            ${'100000000'} | ${{}}                                                               | ${'100,000,000'}
            ${'1000'}      | ${{}}                                                               | ${'1,000'}
            ${'100000'}    | ${{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }} | ${'$100,000.00'}
        `(
            'WHEN numberToFormat is $numberToFormat and options are $options THEN expected result should be $expected',
            ({ numberToFormat, options, expected }) => {
                expect(DataParsers.getNumberFormat(numberToFormat, options)).toBe(expected);
            }
        );
    });

    describe('getCurrency', () => {
        it.each`
            numberToFormat | expected
            ${'100000'}    | ${'€100,000.00'}
            ${'1'}         | ${'€1.00'}
            ${'100000000'} | ${'€100,000,000.00'}
            ${'1000'}      | ${'€1,000.00'}
            ${'100000'}    | ${'€100,000.00'}
        `(
            'WHEN getCurrency is $numberToFormat THEN expected result should be $expected',
            ({ numberToFormat, expected }) => {
                expect(DataParsers.getCurrency(numberToFormat)).toBe(expected);
            }
        );
    });

    describe('getNumberFromRank', () => {
        it.each`
            rank         | expected
            ${'rank0'}   | ${0}
            ${'rank1'}   | ${1}
            ${'rank2'}   | ${2}
            ${'rank22'}  | ${22}
            ${'rank333'} | ${333}
        `('WHEN rank is $rank THEN expected result should be $expected', ({ rank, expected }) => {
            expect(DataParsers.getNumberFromRank(rank)).toBe(expected);
        });
    });

    describe('romanNumeralGenerator', () => {
        it.each`
            number | expected
            ${1}   | ${'I'}
            ${2}   | ${'II'}
            ${4}   | ${'IV'}
            ${6}   | ${'VI'}
            ${8}   | ${'VIII'}
            ${10}  | ${'X'}
            ${12}  | ${'XII'}
            ${15}  | ${'XV'}
        `('WHEN number is $number THEN expected result should be $expected', ({ number, expected }) => {
            expect(DataParsers.romanNumeralGenerator(number)).toBe(expected);
        });
    });
});
