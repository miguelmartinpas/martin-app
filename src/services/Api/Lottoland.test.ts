import Lottoland, { HOST, PATH } from './Lottoland';

const mockFech: any = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ foo: 'bar' }),
    })
);

const mockFechWithError: any = jest.fn(() => Promise.reject(new Error('Something bad happened')));

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
            expect(response).toEqual({ success: true, data: { foo: 'bar' } });
        });

        it.each`
            date         | url
            ${'bar'}     | ${`${HOST}${PATH}/bar`}
            ${'foo'}     | ${`${HOST}${PATH}/foo`}
            ${undefined} | ${`${HOST}${PATH}`}
        `('WHEN date is $date THEN should return $url url', async ({ date, url }) => {
            await lottolandService.get(date);
            expect(mockFech).toHaveBeenCalledWith(url);
        });

        it('WHEN call to external API and it fail THEN it should return an error', async () => {
            global.fetch = mockFechWithError;
            const response = await lottolandService.get('foo');
            expect(response).toEqual({ error: true, message: 'Error on fetchData' });
        });
    });
});
