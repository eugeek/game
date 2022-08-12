import React from 'react';
import { GameCanvas } from '../components/Game/Canvas/Canvas';

export function Game() {
    return <div>
        <GameCanvas width={400} height={400} />
    </div>;
}