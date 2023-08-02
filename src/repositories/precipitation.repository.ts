import {PROPERTY} from "../constants";
import {BaseRepository} from "./base.repository";
import {IDatabaseService} from "../database/database.service.interface";

export class PrecipitationRepository extends BaseRepository {
    constructor(service: IDatabaseService) {
        super(service)
        this._db = this._databaseService.open(PROPERTY.PRECIPITATION);
    }
}