import { Building } from './types';

export class Economy {
  calculateTaxIncome(population: number, jobsFilled: number, taxes: { citizen: number; industry: number }): number {
    return population * taxes.citizen + jobsFilled * taxes.industry;
  }

  calculateUpkeep(buildings: Building[]): number {
    return buildings.reduce((sum, b) => sum + b.upkeepPerDay, 0);
  }

  applyDay(balance: number, income: number, upkeep: number, loanPayment: number): number {
    return balance + income - upkeep - loanPayment;
  }
}
