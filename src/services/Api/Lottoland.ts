class Lottoland {
    private host: string;

    private path: string;

    public constructor() {
        this.host = '​https://media.lottoland.com';
        this.path = '​/api/drawings/euroJackpot';
    }

    public async get(term: string): Promise<any> {
        const data = await this.getData(term);
        return data;
    }

    private async getData(term: string): Promise<any[]> {
        const response = await fetch(this.getUrl(term));
        const json = await response.json();
        return json.items;
    }

    private getUrl(date: string): string {
        return `${this.host}${this.path}/${date}`;
    }
}

export default Lottoland;
