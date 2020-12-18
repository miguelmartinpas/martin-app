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
            response = this.parseSuccessResponse(data);
        } catch (error) {
            response = this.parseErrorResponse(error.message);
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

    private parseErrorResponse(errorMessage: string) {
        return { error: true, message: errorMessage };
    }

    private parseSuccessResponse(data: string) {
        return { success: true, data };
    }

    private getUrl(date: string): string {
        return `${this.host}${this.path}${date ? `/${date}` : ''}`;
    }
}

export default Lottoland;
