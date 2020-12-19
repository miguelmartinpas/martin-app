import LottoDate, { NUM_ITEMS } from './LottoDate';

describe('LottoDate Service', () => {
    let lottodateService: LottoDate;

    beforeEach(() => {
        lottodateService = new LottoDate();
    });

    describe('LottoDate', () => {
        it('WHEN create a instance of LottoDate service THEN it is defined', () => {
            expect(lottodateService).toBeDefined();
        });

        it('WHEN call to getFromToday THEN it should return number with 8 digit', () => {
            const response = lottodateService.getFromTodayParsed();

            expect(response[0].value).toMatch(/[0-9]{8}/);
            expect(response[0].label).toMatch(/[0-9-]{10}/);
        });

        it(`WHEN call to getFromToday THEN it should return ${NUM_ITEMS} items`, () => {
            const response = lottodateService.getFromTodayParsed();

            expect(response.length).toBe(NUM_ITEMS);
        });
    });
});
