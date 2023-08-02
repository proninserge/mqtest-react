import {CanvasCoordinate} from "../../types";
import {INDENT, INDENT_AXIS, MARGIN, STEP_WIDTH} from "../../constants";

export const drawChart = (containerEl: HTMLElement, canvasEl: HTMLCanvasElement, data: CanvasCoordinate[]) => {
    const width =containerEl.clientWidth;
    const height = containerEl.clientHeight;
    const canvas = canvasEl;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    const dataToDisplay = data;

    const yMinValue = getMin(dataToDisplay, function(d: CanvasCoordinate){ return d.y });
    const yMaxValue = getMax(dataToDisplay, function(d: CanvasCoordinate){ return d.y });

    const xAxisLength = width - 2 * MARGIN;
    const yAxisLength = height - 2 * MARGIN;

    const xAxisStart = dataToDisplay[0].x;
    const xAxisEnd = dataToDisplay.at(-1)!.x;
    const yAxisStart = yMinValue;
    const yAxisEnd = yMaxValue;

    //Range per axis
    const rangeValuesX = xAxisEnd - xAxisStart;
    const rangeValuesY = yAxisEnd - yAxisStart;
    //Factors to find value coords per axis
    const factorPositionX = xAxisLength / rangeValuesX;
    const factorPositionY = yAxisLength / rangeValuesY;

    createAxisLine(width, height, MARGIN);
    outputValuesAxis();
    createLineGraph();
    function createAxisLine(width: number, height: number, margin: number) {
        const indentAxis = INDENT_AXIS;

        const xAxisX_1 = margin - indentAxis;
        const xAxisY_1 = margin;
        const xAxisX_2 = xAxisX_1;
        const xAxisY_2 = height - margin;

        const yAxisX_1 = margin;
        const yAxisY_1 = (height - margin) + indentAxis;
        const yAxisX_2 = width - margin;
        const yAxisY_2 = yAxisY_1;

        context!.beginPath();
        context!.moveTo(xAxisX_1, xAxisY_1);
        context!.lineTo(xAxisX_2, xAxisY_2);
        context!.stroke();

        context!.beginPath();
        context!.moveTo(yAxisX_1, yAxisY_1);
        context!.lineTo(yAxisX_2, yAxisY_2);
        context!.stroke();
    }
    function outputValuesAxis() {
        //Amount of steps per axis
        const amountStepsX = Math.round(xAxisLength / STEP_WIDTH);
        const amountStepsY = Math.round(yAxisLength / STEP_WIDTH);
        //Factors to find values per axis
        const factorValueX = rangeValuesX / amountStepsX;
        const factorValueY = rangeValuesY / amountStepsY;


        context!.beginPath();
        context!.font = "10px Arial";
        context!.textAlign="center";
        context!.textBaseline="top";

        for(let i = 0; i < amountStepsX; i++){
            const valueAxisX = Math.round(xAxisStart + i * factorValueX);
            const positionX = scaleX(valueAxisX);
            const positionY = (height - MARGIN + INDENT);
            context!.fillText(String(valueAxisX), positionX, positionY);
        }


        context!.beginPath();
        context!.font = "10px Arial";
        context!.textAlign="end";
        context!.textBaseline="middle";

        for(let i = 0; i < amountStepsY; i++){
            const valueAxisY = Math.round(yAxisStart + i * factorValueY);
            const positionX = MARGIN - INDENT;
            const positionY = scaleY(valueAxisY);
            context!.fillText(String(valueAxisY), positionX, positionY);
        }

    }
    function createLineGraph() {
        for(let i = 0; i < data.length; i++){
            if(i !== data.length - 1) { // if the el isn't last
                const currentX = data[i].x;
                const currentY = data[i].y;
                const nextX = data[i+1].x;
                const nextY = data[i+1].y;

                context!.beginPath();
                context!.moveTo(scaleX(currentX), scaleY(currentY));
                context!.lineTo(scaleX(nextX), scaleY(nextY));
                context!.strokeStyle = data[i].color;
                context!.stroke();
            }
        }
    }

    function scaleX(value: number){
        return ((factorPositionX * value) + MARGIN) - (xAxisStart * factorPositionX);
    }
    function scaleY(value: number){
        return (height - (factorPositionY * value) - MARGIN) + (yAxisStart * factorPositionY);
    }
    function getMin(data: CanvasCoordinate[], callback: (d: CanvasCoordinate) => number){
        const arr = [];
        for(let i in data) { arr.push(callback(data[i])); }
        return Math.min.apply(null, arr);
    }
    function getMax(data: CanvasCoordinate[], callback: (d: CanvasCoordinate) => number){
        const arr = [];
        for(let i in data) { arr.push(callback(data[i])); }
        return Math.max.apply(null, arr);
    }
};
