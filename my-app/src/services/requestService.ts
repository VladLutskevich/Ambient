import globalAxios, { AxiosInstance } from 'axios';

export interface CarData {
    id: number;
    number: string;
}

export class RequestService {
    private axios: AxiosInstance;
  
    constructor() {
      this.axios = globalAxios.create({ baseURL: `http://83.220.174.66/web/` });
    }
  
    async getCars() {
      const result = await this.axios.get<CarData[]>(`cars`);
      return result.data;
    }
}