import create from 'zustand';
import { CityState, BuildingBase, Building } from '../core/types';
import { World } from '../core/world';

interface HistoryEntry {
  x: number;
  y: number;
  prev?: Building;
  next?: Building;
}

interface CityStore {
  state: CityState;
  world: World;
  buildMode: BuildingBase['type'];
  history: HistoryEntry[];
  future: HistoryEntry[];
  setState: (partial: Partial<CityState>) => void;
  setBuildMode: (mode: BuildingBase['type']) => void;
  placeBuilding: (x: number, y: number) => void;
  undo: () => void;
  redo: () => void;
}

const createBuilding = (type: BuildingBase['type'], x: number, y: number): Building => {
  switch (type) {
    case 'Residential':
      return {
        id: `res-${x}-${y}`,
        type: 'Residential',
        buildCost: 0,
        upkeepPerDay: 0,
        energyUseKW: 5,
        capacity: 10
      };
    case 'Industrial':
      return {
        id: `ind-${x}-${y}`,
        type: 'Industrial',
        buildCost: 0,
        upkeepPerDay: 0,
        energyUseKW: 8,
        jobs: 7,
        productivity: 1
      };
    case 'PowerPlant':
      return {
        id: `pow-${x}-${y}`,
        type: 'PowerPlant',
        buildCost: 0,
        upkeepPerDay: 0,
        capacityMW: 1
      };
    default:
      return {
        id: `road-${x}-${y}`,
        type: 'Road',
        buildCost: 0,
        upkeepPerDay: 0
      };
  }
};

export const useCityStore = create<CityStore>((set) => ({
  state: {
    day: 0,
    balance: 0,
    population: 0,
    satisfaction: 50,
    taxes: { citizen: 1, industry: 1 },
    loans: null
  },
  world: new World(),
  buildMode: 'Road',
  history: [],
  future: [],
  setState: (partial) => set((s) => ({ state: { ...s.state, ...partial } })),
  setBuildMode: (mode) => set({ buildMode: mode }),
  placeBuilding: (x, y) =>
    set((s) => {
      const prev = s.world.getBuilding(x, y);
      const next = createBuilding(s.buildMode, x, y);
      s.world.placeBuilding(x, y, next);
      return {
        world: s.world,
        history: [...s.history, { x, y, prev, next }],
        future: []
      };
    }),
  undo: () =>
    set((s) => {
      const history = [...s.history];
      const last = history.pop();
      if (!last) return {};
      if (last.prev) {
        s.world.placeBuilding(last.x, last.y, last.prev);
      } else {
        s.world.removeBuilding(last.x, last.y);
      }
      return { world: s.world, history, future: [...s.future, last] };
    }),
  redo: () =>
    set((s) => {
      const future = [...s.future];
      const next = future.pop();
      if (!next) return {};
      if (next.next) {
        s.world.placeBuilding(next.x, next.y, next.next);
      } else {
        s.world.removeBuilding(next.x, next.y);
      }
      return { world: s.world, history: [...s.history, next], future };
    })
}));
