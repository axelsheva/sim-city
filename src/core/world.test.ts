import { describe, it, expect } from 'vitest';
import { World } from './world';
import { Residential, Industrial, PowerPlant } from './types';

describe('World', () => {
  it('places buildings and aggregates stats', () => {
    const world = new World();
    const r: Residential = {
      id: 'r1',
      type: 'Residential',
      buildCost: 0,
      upkeepPerDay: 0,
      energyUseKW: 5,
      capacity: 10
    };
    const i: Industrial = {
      id: 'i1',
      type: 'Industrial',
      buildCost: 0,
      upkeepPerDay: 0,
      energyUseKW: 8,
      jobs: 7,
      productivity: 1
    };
    const p: PowerPlant = {
      id: 'p1',
      type: 'PowerPlant',
      buildCost: 0,
      upkeepPerDay: 0,
      capacityMW: 1
    };

    world.placeBuilding(0, 0, r);
    world.placeBuilding(1, 0, i);
    world.placeBuilding(2, 0, p);

    expect(world.getBuilding(0, 0)).toBe(r);
    expect(world.residentialCapacity()).toBe(10);
    expect(world.totalJobs()).toBe(7);
    expect(world.energyConsumers()).toEqual([{ energyUseKW: 5 }, { energyUseKW: 8 }]);
    expect(world.powerPlants()).toEqual([p]);
  });
});
