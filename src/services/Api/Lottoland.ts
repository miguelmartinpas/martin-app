export const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';
export const HOST = 'https://www.lottoland.com';
export const PATH = '/api/drawings/euroJackpot';

class Lottoland {
    private host: string;

    private path: string;

    public constructor() {
        this.host = HOST;
        this.path = PATH;
    }

    public async get(date: string): Promise<any> {
        const data = await this.getData(date);
        return data;
    }

    private async getData(date: string): Promise<any> {
        const response = await fetch(this.getUrl(date));
        return response.json();
    }

    private getUrl(date: string): string {
        return this.corsAnywhere(`${this.host}${this.path}${date ? `/${date}` : ''}`);
    }

    private corsAnywhere = (url: string) => {
        return `${CORS_ANYWHERE_URL}${url}`;
    };
}

export default Lottoland;
