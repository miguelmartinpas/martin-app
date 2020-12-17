import Lottoland, { HOST, PATH, CORS_ANYWHERE_URL } from './Lottoland';

const mockFech = jest.fn((url) =>
    Promise.resolve({
        json: () => Promise.resolve({ foo: 'bar' }),
    })
) as any;

describe('Lottoland Service', () => {
    let lottolandService: Lottoland;

    beforeEach(() => {
        lottolandService = new Lottoland();
        global.fetch = mockFech;
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('Rendering', () => {
        it('WHEN create a instance of Lottoland service THEN it is defined', () => {
            expect(lottolandService).toBeDefined();
        });

        it('WHEN call to external API THEN it should return a correct value', async () => {
            const response = await lottolandService.get('foo');
            await expect(response).toEqual({ foo: 'bar' });
        });

        it.each`
            date         | url
            ${'bar'}     | ${`${CORS_ANYWHERE_URL}${HOST}${PATH}/bar`}
            ${'foo'}     | ${`${CORS_ANYWHERE_URL}${HOST}${PATH}/foo`}
            ${undefined} | ${`${CORS_ANYWHERE_URL}${HOST}${PATH}`}
        `('WHEN date is $date THEN should return $url url', async ({ date, url }) => {
            const response = await lottolandService.get(date);
            await expect(mockFech).toHaveBeenCalledWith(url);
        });
    });
});
