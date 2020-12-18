import LottoDate, { NUM_ITEMS } from './LottoDate';

describe('Lottoland Service', () => {
    let lottodateService: LottoDate;

    beforeEach(() => {
        lottodateService = new LottoDate();
    });

    describe('Rendering', () => {
        it('WHEN create a instance of Lottoland service THEN it is defined', () => {
            expect(lottodateService).toBeDefined();
        });

        it('WHEN call to getFromToday THEN it should return number with 8 digit', () => {
            const response = lottodateService.getFromToday();
            expect(response[0]).toMatch(/[0-9]{8}/);
        });

        it(`WHEN call to getFromToday THEN it should return ${NUM_ITEMS} items`, () => {
            const response = lottodateService.getFromToday();
            expect(response[0]).toMatch(/[0-9]{8}/);
            expect(response.length).toBe(NUM_ITEMS);
        });
    });
});
