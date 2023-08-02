import {getData} from "../utils";
import {IApiService} from "./api.service.interface";
export class ApiService implements IApiService {
    private baseUrl: string = '../../';

    fetchData<T>(url: string): Promise<T[]> {
        return getData<T>(`${this.baseUrl}${url}`);
    }
}