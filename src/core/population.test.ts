import { describe, expect, it } from 'vitest';
import { Population } from './population';

describe('Population', () => {
  it('updates population based on satisfaction and unemployment', () => {
    const pop = new Population();
    const newPop = pop.nextDay({
      population: 10,
      residentialCapacity: 20,
      jobs: 8,
      satisfaction: 80,
      taxCitizen: 5
    });
    expect(newPop).toBe(13);
  });
});
