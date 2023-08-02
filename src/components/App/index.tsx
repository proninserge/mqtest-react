import {useEffect, useState} from 'react';
import LeftBar from "../LeftBar";
import DataScreen from "../DataScreen";
import Layout from "../Layout";
import {PROPERTY} from "../../constants";
import {TemperatureModel} from "../../models/temperature.model";
import {PrecipitationModel} from "../../models/precipitation.model";
import {IBaseModel} from "../../models/base.model";
import {TemperatureRepository} from "../../repositories/temperature.repository";
import {PrecipitationRepository} from "../../repositories/precipitation.repository";
import {IndexeddbService} from "../../database/indexeddb.service";
import {RetrievedDataProvider} from "../../contexts/useRetrievedData";
import {ApiService} from "../../api/api.service";

const apiService = new ApiService();

const temperatureRepository = new TemperatureRepository(new IndexeddbService());
const precipitationRepository = new PrecipitationRepository(new IndexeddbService());

const temperatureModel = new TemperatureModel(temperatureRepository, apiService);
const precipitationModel = new PrecipitationModel(precipitationRepository, apiService);

function App() {
    const [currentInfo, setCurrentInfo] = useState<PROPERTY>(PROPERTY.TEMPERATURE);

    const [data, setData] = useState<IBaseModel | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        setData(null);
        setIsError(false);
        (async () => {
            if (currentInfo === PROPERTY.TEMPERATURE) {
                const temperatureStorage = await temperatureModel.init();
                if (!temperatureStorage) {
                    setIsError(true);
                } else {
                    setIsError(false);
                    setData(temperatureStorage);
                }
            }

            if (currentInfo === PROPERTY.PRECIPITATION) {
                const precipitationStorage =  await precipitationModel.init();
                if (!precipitationStorage) {
                    setIsError(true);
                } else {
                    setIsError(false);
                    setData(precipitationStorage);
                }
            }
        })();
    }, [currentInfo]);

    return (
        <main>
            <h1>Архив метеослужбы</h1>
            <Layout>
                <LeftBar setCurrentInfo={setCurrentInfo} />
                {isError && <div>Ошибка получения данных...</div>}
                {!data && !isError && <div>Loading...</div>}
                {data && <RetrievedDataProvider data={data}>
                    <DataScreen />
                </RetrievedDataProvider>}
            </Layout>
        </main>
    );
}

export default App;
