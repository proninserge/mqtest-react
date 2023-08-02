import './data-screen.css';
import React, {useMemo, useState} from "react";
import SelectYears from "../SelectYears";
import Chart from "../Chart";
import {getAllYears, getAverageValue} from "../../utils";
import {useRetrievedData} from "../../contexts/useRetrievedData";
import {COLOR} from "../../constants";

interface IDataScreen {}

function DataScreen(props: IDataScreen) {
    const {data, startDate, endDate} = useRetrievedData();

    // The dates for controlling the selects
    const [yearFrom, setYearFrom] = useState<number>(startDate);
    const [yearTo, setYearTo] = useState<number>(endDate);

    // The array of years of the actual period
    const years = useMemo(() => getAllYears(yearFrom, yearTo), [yearFrom, yearTo]);

    const periodToDisplay = useMemo(() => {
        // Get all values for one year IF from === to. index+1 is a day
        if (yearFrom === yearTo) {
            const result = data.average[yearFrom].map((item, index) => ({x: index+1, y: item, color: COLOR}));
            return result;
        }
        // Get averages for each year IF the actual period of years exists
        return years.map(year => ({x: year, y: getAverageValue(data.average[year]), color: COLOR}));
    }, [yearFrom, yearTo, data]);

    return (
        <div className='b-data-screen'>
            <SelectYears
                startDate={startDate}
                endDate={endDate}

                yearFrom={yearFrom}
                yearTo={yearTo}

                setYearFrom={setYearFrom}
                setYearTo={setYearTo}
            />
            <Chart periodToDisplay={periodToDisplay} />
        </div>
    );
};

export default DataScreen;
