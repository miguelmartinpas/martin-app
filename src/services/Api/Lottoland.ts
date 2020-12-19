import DataParsers from '../Parsers/DataParsers';

export const HOST = 'https://martin-proxy.herokuapp.com';
export const PATH = '/lotto';

class Lottoland {
    private host: string;

    private path: string;

    public constructor() {
        this.host = HOST;
        this.path = PATH;
    }

    public async get(date: string): Promise<any> {
        let response;
        try {
            const data = await this.fetchData(date);
            response = this.successResponse(data);
        } catch (error) {
            response = this.errorResponse(error.message);
        }
        return response;
    }

    private async fetchData(date: string): Promise<any> {
        try {
            const response = await fetch(this.getUrl(date));
            return response.json();
        } catch (error) {
            throw new Error('Error on fetchData');
        }
    }

    // eslint-disable-next-line class-methods-use-this
    private errorResponse(errorMessage: string) {
        return { error: true, message: errorMessage };
    }

    // eslint-disable-next-line class-methods-use-this
    private successResponse(data: string) {
        return { success: true, data: DataParsers.getParseData(data) };
    }

    private getUrl(date: string): string {
        return `${this.host}${this.path}${date ? `/${date}` : ''}`;
    }
}

export default Lottoland;
