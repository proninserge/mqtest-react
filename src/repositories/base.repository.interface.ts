import {ItemData} from "../types";

export interface IBaseRepository {
    checkDatabaseStatus: () => Promise<boolean>;
    create: <T>(data: T[]) => Promise<T[]>;
    get: <T>() => Promise<T[]>;
}