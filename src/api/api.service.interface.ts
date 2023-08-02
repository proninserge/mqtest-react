import {getData} from "../utils";

export interface IApiService {
    fetchData: <T>(url: string) => Promise<T[]>;
}