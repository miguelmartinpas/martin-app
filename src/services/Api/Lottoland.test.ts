import Lottoland from './Lottoland';

describe('Lottoland Service', () => {
    describe('Rendering', () => {
        it('WHEN create a instance of Lottoland service THEN it is defined', () => {
            const lottolandService = new Lottoland();
            expect(lottolandService).toBeDefined();
        });
    });
});
