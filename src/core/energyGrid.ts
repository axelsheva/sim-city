import { PowerPlant, EnergyConsumer } from './types';

export class EnergyGrid {
  powerPlants: PowerPlant[] = [];
  consumers: EnergyConsumer[] = [];

  supplyKW(): number {
    return this.powerPlants.reduce((sum, p) => sum + p.capacityMW * 1000, 0);
  }

  demandKW(): number {
    return this.consumers.reduce((sum, c) => sum + c.energyUseKW, 0);
  }

  coverage(): number {
    const demand = this.demandKW();
    if (demand === 0) return 1;
    return Math.min(1, this.supplyKW() / demand);
  }
}
