class DataParsers {
    private static keys: any[] = ['Tier', 'Match', 'Winners', 'Ammount'];

    private static matchMap: any = {
        rank0: '5 Numbers + 2 Euronumbers',
        rank1: '5 Numbers + 1 Euronumbers',
        rank2: '5 Numbers + 0 Euronumbers',
        rank3: '4 Numbers + 2 Euronumbers',
        rank4: '4 Numbers + 1 Euronumbers',
        rank5: '3 Numbers + 2 Euronumbers',
        rank6: '4 Numbers + 0 Euronumbers',
        rank7: '2 Numbers + 2 Euronumbers',
        rank8: '3 Numbers + 1 Euronumbers',
        rank9: '3 Numbers + 0 Euronumbers',
        rank10: '1 Numbers + 2 Euronumbers',
        rank11: '2 Numbers + 1 Euronumbers',
        rank12: '2 Numbers + 0 Euronumbers',
    };

    public static getDataKeys(): any[] {
        return DataParsers.keys;
    }

    public static getParseData(data: any): any {
        const { odds }: any = data?.last[0];
        return Object.keys(odds)
            .sort((rank: any, nextRank: any) =>
                DataParsers.getNumberFromRank(rank) >= DataParsers.getNumberFromRank(nextRank) ? 1 : -1
            )
            .map((rank: string) => {
                const { winners, prize } = odds[rank];
                const id = DataParsers.romanNumeralGenerator(DataParsers.getNumberFromRank(rank) + 1);
                return {
                    id,
                    match: DataParsers.getNormalizeMatch(rank),
                    winners: `${DataParsers.getNumberFormat(winners)}x`,
                    prize: DataParsers.getCurrency(prize),
                };
            });
    }

    public static getNormalizeMatch(match: string): string {
        return DataParsers.matchMap[match];
    }

    public static getNumberFormat(numberToFormat: number, options: any = {}): string {
        const formatter = new Intl.NumberFormat('en-US', options);

        return formatter.format(numberToFormat);
    }

    public static getCurrency(numberToFormat: number): string {
        return DataParsers.getNumberFormat(numberToFormat, {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
        });
    }

    public static getNumberFromRank(rank: string): number {
        return Number(rank.replace('rank', ''));
    }

    public static romanNumeralGenerator(number: number): string {
        let numberToParsed: number = number;
        let romanNumber = '';
        romanNumber += 'X'.repeat(numberToParsed / 10);
        numberToParsed %= 10;
        romanNumber += 'IX'.repeat(numberToParsed / 9);
        numberToParsed %= 9;
        romanNumber += 'V'.repeat(numberToParsed / 5);
        numberToParsed %= 5;
        romanNumber += 'IV'.repeat(numberToParsed / 4);
        numberToParsed %= 4;
        romanNumber += 'I'.repeat(numberToParsed);

        return romanNumber;
    }
}

export default DataParsers;
