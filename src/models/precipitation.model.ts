import {BaseModel} from "./base.model";
import {IBaseRepository} from "../repositories/base.repository.interface";
import {IApiService} from "../api/api.service.interface";

export class PrecipitationModel extends BaseModel {
    constructor(dataRepository: IBaseRepository, apiService: IApiService) {
        super(dataRepository, apiService);
        this._url = 'data/precipitation.json';
    }
}