import { describe, expect, it } from 'vitest';
import { Economy } from './economy';
import { Residential, Industrial } from './types';

describe('Economy', () => {
  it('calculates tax income and updates balance', () => {
    const economy = new Economy();
    const taxes = { citizen: 1, industry: 2 };
    const income = economy.calculateTaxIncome(100, 50, taxes);
    expect(income).toBe(200);

    const upkeep = economy.calculateUpkeep([
      { id: 'r1', type: 'Residential', buildCost: 0, upkeepPerDay: 10, capacity: 10 },
      { id: 'i1', type: 'Industrial', buildCost: 0, upkeepPerDay: 20, jobs: 5, productivity: 1, energyUseKW: 0 }
    ]);
    expect(upkeep).toBe(30);

    const newBalance = economy.applyDay(1000, income, upkeep, 0);
    expect(newBalance).toBe(1170);
  });
});
