import {useEffect, useRef} from "react";
import {CanvasCoordinate} from "../../types";
import {drawChart} from "./canvas.utils";

interface IChart {
    periodToDisplay: CanvasCoordinate[];
}

function Chart({periodToDisplay}: IChart) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (containerRef.current && canvasRef.current) {
            drawChart(containerRef.current, canvasRef.current, periodToDisplay);
        }
    }, [periodToDisplay])

    return (
        <div ref={containerRef} >
            <canvas ref={canvasRef} width={500} height={300}>
                Canvas not supported
            </canvas>
        </div>
    );
}

export default Chart;
