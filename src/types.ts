/** one element in data */
export type ItemData = {
    /** time */
    t: string;
    /** value */
    v: number;
};

/** coordinate to render */
export type CanvasCoordinate = {
    /** year or day */
    x: number;
    /** value of T or P */
    y: number;
    /** color of line */
    color: string;
};
