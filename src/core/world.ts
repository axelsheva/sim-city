import {
  Building,
  EnergyConsumer,
  PowerPlant,
  Residential,
  Industrial
} from './types';

export class World {
  width: number;
  height: number;
  buildings: Map<string, Building> = new Map();

  constructor(width = 20, height = 20) {
    this.width = width;
    this.height = height;
  }

  coord(x: number, y: number): string {
    return `${x},${y}`;
  }

  placeBuilding(x: number, y: number, building: Building) {
    this.buildings.set(this.coord(x, y), building);
  }

  removeBuilding(x: number, y: number) {
    this.buildings.delete(this.coord(x, y));
  }

  getBuilding(x: number, y: number): Building | undefined {
    return this.buildings.get(this.coord(x, y));
  }

  allBuildings(): Building[] {
    return Array.from(this.buildings.values());
  }

  residentialCapacity(): number {
    return this.allBuildings()
      .filter((b): b is Residential => b.type === 'Residential')
      .reduce((sum, b) => sum + b.capacity, 0);
  }

  totalJobs(): number {
    return this.allBuildings()
      .filter((b): b is Industrial => b.type === 'Industrial')
      .reduce((sum, b) => sum + b.jobs, 0);
  }

  energyConsumers(): EnergyConsumer[] {
    return this.allBuildings()
      .filter((b) => b.energyUseKW !== undefined)
      .map((b) => ({ energyUseKW: b.energyUseKW! }));
  }

  powerPlants(): PowerPlant[] {
    return this.allBuildings().filter((b): b is PowerPlant => b.type === 'PowerPlant') as PowerPlant[];
  }
}
