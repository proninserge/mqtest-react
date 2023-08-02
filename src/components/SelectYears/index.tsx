// import './select-years.css';
import React, {useEffect, useMemo, useState} from "react";
import {getAllYears} from "../../utils";

interface ISelectYears {
    startDate: number;
    endDate: number;

    yearTo: number;
    yearFrom: number;

    setYearFrom: (data: number) => void;
    setYearTo: (data: number) => void;
}

function SelectYears({startDate, endDate, yearTo, yearFrom, setYearTo, setYearFrom}: ISelectYears) {
    const years = useMemo(() => getAllYears(startDate, endDate), [startDate, endDate]);

    const yearFromChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = Number(e.target.value);
        if (year > yearTo) {
            setYearTo(year);
        }
        setYearFrom(year);
    };
    const yearToChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = Number(e.target.value);
        if (yearFrom > year) {
            setYearFrom(year);
        }
        setYearTo(year);
    };

    return (
        <div>
            <select value={yearFrom} onChange={yearFromChangeHandler}>
                {years.map(s => <option value={s} key={s}>{s}</option>)}
            </select>
            <select value={yearTo} onChange={yearToChangeHandler}>
                {years.map(s => <option value={s} key={s}>{s}</option>)}
            </select>
        </div>
    );
}

export default SelectYears;
