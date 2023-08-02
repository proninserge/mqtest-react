import {IBaseRepository} from "./base.repository.interface";
import {IDatabaseService} from "../database/database.service.interface";

export abstract class BaseRepository implements IBaseRepository {
    protected _db: Promise<IDatabaseService>;
    protected constructor(protected readonly _databaseService: IDatabaseService) {}

    async checkDatabaseStatus(): Promise<boolean> {
        return (await this._db).exists();
    }

    async create<T>(data: T[]): Promise<T[]> {
        return (await this._db).write(data);
    }

    async get<T>(): Promise<T[]> {
        return (await this._db).getAll();
    }
}