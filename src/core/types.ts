export type Money = number;

export interface CityState {
  day: number;
  balance: Money;
  population: number;
  satisfaction: number; // 0..100
  taxes: { citizen: number; industry: number };
  loans: Loan | null;
}

export interface BuildingBase {
  id: string;
  type: 'Road' | 'Residential' | 'Industrial' | 'PowerPlant';
  buildCost: Money;
  upkeepPerDay: Money;
  energyUseKW?: number;
}

export interface Residential extends BuildingBase {
  type: 'Residential';
  capacity: number;
}

export interface Industrial extends BuildingBase {
  type: 'Industrial';
  jobs: number;
  productivity: number; // 0..1
}

export interface PowerPlant extends BuildingBase {
  type: 'PowerPlant';
  capacityMW: number;
}

export type Building = Residential | Industrial | PowerPlant | BuildingBase;

export interface EnergyConsumer {
  energyUseKW: number;
}

export interface Loan {
  principal: number;
  rateAPR: number;
  termDays: number;
  paymentPerDay: number;
  outstanding: number;
  nextDue: number;
}
