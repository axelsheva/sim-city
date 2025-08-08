import { describe, expect, it } from 'vitest';
import { Loan } from './loan';

describe('Loan', () => {
  it('computes daily payment and reduces outstanding', () => {
    const loan = new Loan(1000, 0.1, 10);
    expect(loan.paymentPerDay).toBeCloseTo(100.1507, 4);
    loan.processDay();
    expect(loan.outstanding).toBeLessThan(1000);
  });
});
