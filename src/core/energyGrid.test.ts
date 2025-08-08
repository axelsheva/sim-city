import { describe, expect, it } from 'vitest';
import { EnergyGrid, PowerPlant, EnergyConsumer } from './energyGrid';

describe('EnergyGrid', () => {
  it('calculates supply, demand, and coverage', () => {
    const grid = new EnergyGrid();
    grid.powerPlants.push({ id: 'p1', capacityMW: 2, buildCost: 0, upkeepPerDay: 0, type: 'PowerPlant' });
    grid.consumers.push({ energyUseKW: 500 });
    grid.consumers.push({ energyUseKW: 800 });

    expect(grid.supplyKW()).toBe(2000);
    expect(grid.demandKW()).toBe(1300);
    expect(grid.coverage()).toBeCloseTo(2000 / 1300, 5);
  });
});
