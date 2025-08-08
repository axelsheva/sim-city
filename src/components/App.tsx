import React from "react";
import { useCityStore } from "../state/store";
import road from "../assets/buildings/road.svg";
import residential from "../assets/buildings/residential.svg";
import industrial from "../assets/buildings/industrial.svg";
import powerplant from "../assets/buildings/powerplant.svg";

const GRID_SIZE = 20;
const CELL_SIZE = 32;

export const App: React.FC = () => {
  const { state, world, buildMode, setBuildMode, placeBuilding, undo, redo } =
    useCityStore();
  const lines: JSX.Element[] = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    lines.push(
      <line
        key={`h${i}`}
        x1={0}
        y1={i * CELL_SIZE}
        x2={GRID_SIZE * CELL_SIZE}
        y2={i * CELL_SIZE}
      />,
    );
    lines.push(
      <line
        key={`v${i}`}
        x1={i * CELL_SIZE}
        y1={0}
        x2={i * CELL_SIZE}
        y2={GRID_SIZE * CELL_SIZE}
      />,
    );
  }
  const SPRITES: Record<
    "Road" | "Residential" | "Industrial" | "PowerPlant",
    string
  > = {
    Road: road,
    Residential: residential,
    Industrial: industrial,
    PowerPlant: powerplant,
  };

  const cells: JSX.Element[] = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const building = world.getBuilding(x, y);
      const sprite = building ? SPRITES[building.type] : undefined;
      cells.push(
        <image
          key={`${x}-${y}`}
          data-testid={`cell-${x}-${y}`}
          x={x * CELL_SIZE}
          y={y * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          href={sprite}
          onClick={() => placeBuilding(x, y)}
          preserveAspectRatio="none"
        />,
      );
    }
  }
  return (
    <div className="app">
      <h1>Sim City MVP</h1>
      <div className="toolbar">
        <button
          data-testid="tool-road"
          onClick={() => setBuildMode("Road")}
          disabled={buildMode === "Road"}
        >
          Road
        </button>
        <button
          data-testid="tool-residential"
          onClick={() => setBuildMode("Residential")}
          disabled={buildMode === "Residential"}
        >
          Residential
        </button>
        <button
          data-testid="tool-industrial"
          onClick={() => setBuildMode("Industrial")}
          disabled={buildMode === "Industrial"}
        >
          Industrial
        </button>
        <button
          data-testid="tool-power"
          onClick={() => setBuildMode("PowerPlant")}
          disabled={buildMode === "PowerPlant"}
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
      <svg
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="grid"
      >
        {cells}
        {lines}
      </svg>
    </div>
  );
};
