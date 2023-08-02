import {BaseModel} from "./base.model";
import {IBaseRepository} from "../repositories/base.repository.interface";
import {IApiService} from "../api/api.service.interface";

export class TemperatureModel extends BaseModel {
    constructor(dataRepository: IBaseRepository, apiService: IApiService) {
        super(dataRepository, apiService);
        this._url = 'data/temperature.json';
    }
}