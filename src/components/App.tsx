import React from 'react';
import { useCityStore } from '../state/store';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

export const App: React.FC = () => {
  const { state } = useCityStore();
  const lines: JSX.Element[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    lines.push(
      <line key={`h${i}`} x1={0} y1={i * CELL_SIZE} x2={GRID_SIZE * CELL_SIZE} y2={i * CELL_SIZE} />
    );
    lines.push(
      <line key={`v${i}`} x1={i * CELL_SIZE} y1={0} x2={i * CELL_SIZE} y2={GRID_SIZE * CELL_SIZE} />
    );
  }
  return (
    <div className="app">
      <h1>Sim City MVP</h1>
      <div>Day: {state.day}</div>
      <div>Balance: {state.balance}</div>
      <div>Population: {state.population}</div>
      <svg width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE} className="grid">
        {lines}
      </svg>
    </div>
  );
};
