import create from 'zustand';
import { CityState, BuildingBase } from '../core/types';
import { World } from '../core/world';

interface CityStore {
  state: CityState;
  world: World;
  setState: (partial: Partial<CityState>) => void;
  placeRoad: (x: number, y: number) => void;
}

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
  setState: (partial) => set((s) => ({ state: { ...s.state, ...partial } })),
  placeRoad: (x, y) =>
    set((s) => {
      const road: BuildingBase = {
        id: `road-${x}-${y}`,
        type: 'Road',
        buildCost: 0,
        upkeepPerDay: 0
      };
      s.world.placeBuilding(x, y, road);
      return { world: s.world };
    })
}));
