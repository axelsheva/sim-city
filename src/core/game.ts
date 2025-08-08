import { CityState } from './types';
import { World } from './world';
import { Economy } from './economy';
import { Population } from './population';
import { EnergyGrid } from './energyGrid';

export class Game {
  state: CityState;
  world: World;
  economy = new Economy();
  population = new Population();

  constructor(state: CityState, world = new World()) {
    this.state = state;
    this.world = world;
  }

  tick() {
    const grid = new EnergyGrid();
    grid.powerPlants = this.world.powerPlants();
    grid.consumers = this.world.energyConsumers();
    const coverage = grid.coverage();

    const jobs = this.world.totalJobs();
    const employed = Math.min(this.state.population, jobs);
    const effectiveJobs = employed * coverage;
    const taxIncome = this.economy.calculateTaxIncome(this.state.population, effectiveJobs, this.state.taxes);
    const upkeep = this.economy.calculateUpkeep(this.world.allBuildings());
    const loanPayment = this.state.loans ? this.state.loans.paymentPerDay : 0;
    const newBalance = this.economy.applyDay(this.state.balance, taxIncome, upkeep, loanPayment);

    const newPopulation = this.population.nextDay({
      population: this.state.population,
      residentialCapacity: this.world.residentialCapacity(),
      jobs,
      satisfaction: this.state.satisfaction * coverage,
      taxCitizen: this.state.taxes.citizen
    });

    this.state = {
      ...this.state,
      day: this.state.day + 1,
      balance: newBalance,
      population: newPopulation
    };
  }
}
