// export const HOST = 'https://martin-proxy.herokuapp.com';
// export const PATH = '/lotto';
export const HOST = 'https://www.lottoland.com';
export const PATH = '/api/drawings/euroJackpot';

class Lottoland {
    private host: string;

    private path: string;

    public constructor() {
        this.host = HOST;
        this.path = '/lotto';
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
        return `https://cors-anywhere.herokuapp.com/${url}`;
    };
}

export default Lottoland;
