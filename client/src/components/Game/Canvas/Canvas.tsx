import React, { RefObject, useEffect, useRef, useState } from 'react';

interface ICanvasProps {
    width: number
    height: number
}

export function GameCanvas({ height, width }: ICanvasProps) {
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();
    const gameCanvasRef: RefObject<HTMLCanvasElement> = useRef(null);
    useEffect(() => {
        setCanvas(gameCanvasRef.current);
        if (!canvas) return;
        setContext(canvas.getContext('2d'));
    }, []);

    return <div>
        <canvas ref={gameCanvasRef} height={height} width={width} />
    </div>;
}