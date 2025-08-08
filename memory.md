# Memory

## Constants and Config
- Grid size: 20 x 20.
- Building types: Road, Residential (R), Industrial (I), PowerPlant.
- Dark theme CSS variables: `--bg-900`, `--bg-800`, `--fg-100`, `--accent`, `--grid-line`, `--danger`, `--success`.
- Tax rates range: 0 to 20% for citizens and industry.
- Simulation tick: 1 day per tick (configurable).

## Formulas
- `supplyKW = sum(power.capacityMW) * 1000`
- `demandKW = sum(R.energyUseKW + I.energyUseKW)`
- `coverage = clamp(supplyKW / demandKW, 0, 1)`
- `productivityI = coverage`
- `taxIncome = population * taxCitizen + totalJobsFilled * taxIndustry`
- `upkeep = sum(building.upkeepPerDay)`
- `balance' = balance + taxIncome - upkeep - loanPayment`
- `population' = clamp(population + f(satisfaction) - g(unemployment, highTaxes), 0, residentialCapacity)`
- `Loan`: `paymentPerDay` (annuity) for principal, rateAPR, termDays.
