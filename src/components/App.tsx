import React from 'react';
import { useCityStore } from '../state/store';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const App: React.FC = () => {
  const { state, world, buildMode, setBuildMode, placeBuilding, undo, redo } = useCityStore();
  const lines: JSX.Element[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    lines.push(
      <line key={`h${i}`} x1={0} y1={i * CELL_SIZE} x2={GRID_SIZE * CELL_SIZE} y2={i * CELL_SIZE} />
    );
    lines.push(
      <line key={`v${i}`} x1={i * CELL_SIZE} y1={0} x2={i * CELL_SIZE} y2={GRID_SIZE * CELL_SIZE} />
    );
  }
  const cells: JSX.Element[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const building = world.getBuilding(x, y);
      let fill = 'transparent';
      if (building) {
        switch (building.type) {
          case 'Road':
            fill = '#666';
            break;
          case 'Residential':
            fill = '#4caf50';
            break;
          case 'Industrial':
            fill = '#ffeb3b';
            break;
          case 'PowerPlant':
            fill = '#f44336';
            break;
        }
      }
      cells.push(
        <rect
          key={`${x}-${y}`}
          data-testid={`cell-${x}-${y}`}
          x={x * CELL_SIZE}
          y={y * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={fill}
          stroke="none"
          onClick={() => placeBuilding(x, y)}
        />
      );
    }
  }
  return (
    <div className="app">
      <h1>Sim City MVP</h1>
      <div className="toolbar">
        <button data-testid="tool-road" onClick={() => setBuildMode('Road')} disabled={buildMode === 'Road'}>
          Road
        </button>
        <button
          data-testid="tool-residential"
          onClick={() => setBuildMode('Residential')}
          disabled={buildMode === 'Residential'}
        >
          Residential
        </button>
        <button
          data-testid="tool-industrial"
          onClick={() => setBuildMode('Industrial')}
          disabled={buildMode === 'Industrial'}
        >
          Industrial
        </button>
        <button
          data-testid="tool-power"
          onClick={() => setBuildMode('PowerPlant')}
          disabled={buildMode === 'PowerPlant'}
        >
          PowerPlant
        </button>
        <button data-testid="undo-btn" onClick={undo}>
          Undo
        </button>
        <button data-testid="redo-btn" onClick={redo}>
          Redo
        </button>
      </div>
      <div>Day: {state.day}</div>
      <div>Balance: {state.balance}</div>
      <div>Population: {state.population}</div>
      <svg width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE} className="grid">
        {cells}
        {lines}
      </svg>
    </div>
  );
};
