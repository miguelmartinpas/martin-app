class Lottoland {
    private host: string;

    private path: string;

    public constructor() {
        this.host = 'https://media.lottoland.com';
        this.path = '/api/drawings/euroJackpot';
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
        return `${this.host}${this.path}${date ? `/${date}` : ''}`;
    }
}

export default Lottoland;
