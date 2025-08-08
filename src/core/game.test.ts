import { describe, expect, it } from 'vitest';
import { Game } from './game';
import { World } from './world';
import { Building } from './types';

const initialState = {
  day: 0,
  balance: 1000,
  population: 10,
  satisfaction: 70,
  taxes: { citizen: 1, industry: 1 },
  loans: null as any
};

describe('Game', () => {
  it('advances one day and updates balance and population', () => {
    const world = new World(1, 1);
    world.buildings.set('0,0', { id: 'r1', type: 'Residential', buildCost: 0, upkeepPerDay: 0, capacity: 20, energyUseKW: 100 } as Building);
    const game = new Game(initialState, world);
    game.tick();
    expect(game.state.day).toBe(1);
    expect(game.state.balance).not.toBe(initialState.balance);
    expect(game.state.population).not.toBe(initialState.population);
  });

  it('reduces industrial tax income when energy is insufficient', () => {
    const world = new World();
    world.placeBuilding(0, 0, {
      id: 'r',
      type: 'Residential',
      buildCost: 0,
      upkeepPerDay: 0,
      capacity: 20,
      energyUseKW: 1000
    });
    world.placeBuilding(1, 0, {
      id: 'i',
      type: 'Industrial',
      buildCost: 0,
      upkeepPerDay: 0,
      jobs: 10,
      productivity: 1,
      energyUseKW: 1000
    });
    world.placeBuilding(2, 0, {
      id: 'p',
      type: 'PowerPlant',
      buildCost: 0,
      upkeepPerDay: 0,
      capacityMW: 1
    });
    const game = new Game({ ...initialState, balance: 0, population: 10 }, world);
    game.tick();
    expect(game.state.balance).toBe(15);
  });
});
