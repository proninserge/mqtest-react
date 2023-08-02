import React from "react";
import { useContext, createContext } from "react";
import {IBaseModel} from "../models/base.model";
import {ItemData} from "../types";

interface IRetrievedDataProvider {
    children: React.ReactNode;
    data: IBaseModel;
}

interface IValue {
    data: IBaseModel;
    startDate: number;
    endDate: number;
}

export const retrievedDataContext = createContext<IValue | null>(null);

const { Provider } = retrievedDataContext;

export function useRetrievedData(): IValue {
    const value = useContext(retrievedDataContext);

    if (!value) throw new Error('Use RetrievedDataProvider');

    return value;
}

export const RetrievedDataProvider = ({ children, data }: IRetrievedDataProvider) => {
    // The full period
    const startDate = new Date(data.data[0].t).getFullYear();
    const endDate = new Date((data.data.at(-1) as ItemData).t).getFullYear();

    const value = {
        data,
        startDate,
        endDate,
    }

    return <Provider value={value}>{children}</Provider>;
};