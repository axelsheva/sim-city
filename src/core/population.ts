export class Population {
  nextDay(params: {
    population: number;
    residentialCapacity: number;
    jobs: number;
    satisfaction: number; // 0..100
    taxCitizen: number;
  }): number {
    const employed = Math.min(params.population, params.jobs);
    const unemployment = params.population - employed;
    const growth = Math.round((params.satisfaction - 50) / 10);
    const loss = Math.round(unemployment / 10) + Math.round(params.taxCitizen / 10);
    const next = params.population + growth - loss;
    return Math.max(0, Math.min(params.residentialCapacity, next));
  }
}
