/**
 * Request for data
 * @param url request
 * @returns data
 */
export async function getData<T>(url: string): Promise<T[]> {
    const res = await fetch(url);

    if (res.ok) {
        return await res.json();
    }

    throw new Error();
};

/**
 * Making an array of all years based on the start and end dates
 * @param yearFrom start date
 * @param yearTo end date
 * @returns array of years
 */
export const getAllYears = (yearFrom: number, yearTo: number): number[] => {
    const length = (yearTo - yearFrom) + 1;
    return Array.from(new Array(length), (_, index) => yearFrom + index);
};

export const getAverageValue = (array: number[]): number => {
    const getSum = array.reduce((acc, item) => {
        acc += item;
        return acc;
    }, 0);
    return Number((getSum / array.length).toFixed(2));
};
