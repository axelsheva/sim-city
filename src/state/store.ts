import create from 'zustand';
import { CityState } from '../core/types';

interface CityStore {
  state: CityState;
  setState: (partial: Partial<CityState>) => void;
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
  setState: (partial) => set((s) => ({ state: { ...s.state, ...partial } }))
}));
