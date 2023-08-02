import {ItemData} from "../types";
import {IBaseRepository} from "../repositories/base.repository.interface";
import {IApiService} from "../api/api.service.interface";

type TAverage = Record<number, number[]>;

export interface IBaseModel {
    average: TAverage;
    data: ItemData[];
}

export abstract class BaseModel implements IBaseModel {
    private _data: ItemData[];
    private _average: TAverage;
    protected _url: string;

    protected constructor(private readonly _dataRepository: IBaseRepository, private readonly _apiService: IApiService) {}

    async init(){
        const tableExisting = await this._dataRepository.checkDatabaseStatus();
        try {
            if (!tableExisting) {
                const data = await this._apiService.fetchData<ItemData>(this._url);
                const tableData = await this._dataRepository.create(data);
                this._data = tableData;
            } else {
                this._data = await this._dataRepository.get();
            }
            this.getAverage(this._data);
        } catch(e) {
            if (e instanceof Error) console.error(e.message, e.stack);
            return null;
        }
        return this;
    }

    private getAverage<T extends ItemData>(data: T[]): void {
        this._average = data.reduce((acc, item) => {
            const year = new Date(item.t).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(item.v);
            return acc;
        }, {} as TAverage);
    }

    get average(): typeof this._average {
        return this._average;
    }

    get data(): typeof this._data {
        return this._data;
    }
}